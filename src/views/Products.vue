<template>
  <div class="products">
    <div class="container">
        <div class="intro h-100">
          <div class="row h-100 justify-content-cneter align-items-center">
            <div class="col-md-6 ml-3">
              <h3>Products Page</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tempore dolores maiores assumenda vel excepturi nesciunt voluptate dignissimos esse ullam.</p>
            </div>
            <div class="col-md-5">
              <img src="/images/svg/products.svg" class="img-fluid" alt="">
            </div>
          </div>
        </div>
    
      <div class="product-test">
        

        <hr>
        <h3 class="d-inline-block">Products List</h3>
        <div @click="addNew" class="btn btn-primary float-right">Add Product</div>
        <!--table-->
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(product, idx) in products" :key="idx">
                <td>{{product.name}}</td>
                <td>{{product.price}}</td>
                <td>
                  <button class="btn btn-warning" role="button" @click="editProduct(product)">Edit</button>&nbsp;
                  <button class="btn btn-danger" role="button" @click="deleteProduct(product)">Delete</button>
                </td>
              </tr>
            </tbody>
        </table>
        <!--table ends-->

      </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel" v-if="modal == 'new'">Add Product</h5>
              <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                      <!-- <textarea name="description" v-model="product.description" class="form-control" placeholder="Product Description" cols="30"></textarea> -->
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" v-model="tag" placeholder="Product tags" class="form-control">
                      
                      <div class="d-flex">
                        <p v-for="(tag, idx) in product.tags" :key="idx">
                            <span class="p-1">{{tag}}</span>
                        </p>
                      </div>
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, idx) in product.images" :key="idx">
                              <div class="image-wrapp">
                                <img :src="image" width="80px">
                                <span class="delete-img" @click="deleteImage(image, index)"><i class="fas fa-trash-alt"></i></span>
                              </div>
                          </div>
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save Product</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>
    <!-- Modal Ends -->
  </div>
</template>

<script>
import { fireb, db } from '../firebase';
import { VueEditor } from "vue2-editor";

export default {
  name: 'Products',
  
  components: {
    VueEditor
  },

  props: {
    msg: String
  },
  data(){
    return{
      products: [],
      product:{
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      },
      activeItem: null,
      modal: null,
      tag: null,
    }
  },
  
  firestore(){
    return{
      products: db.collection('products'),
    }
  },
  
  methods: {
    
    deleteImage(img, index){
      let image = fireb.storage().refFromURL(img);
      this.product.images.splice(index, 1);

      image.delete().then(()=>{
        console.log('image deleted');
      }).catch((error)=>{
        console.log('error occured')
      });
    },
    
    addTag(){
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    
    uploadImage(e){ //e for event
      if(e.target.files[0]){
        let file = e.target.files[0];
        var storageRef = fireb.storage().ref('products/'+ Math.random() + '_'  + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', (snapshot)=>{
        
          }, (error)=> {
            // Handle unsuccessful uploads
          }, ()=> {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
              this.product.images.push(downloadURL);
              console.log('File available at', downloadURL);
            });
        });
      }
    },
    
    reset(){
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      }
    },
    
    addNew(){
      this.modal = 'new';
      this.reset();
      $('#product').modal('show');
    },

    updateProduct(){
      this.$firestore.products.doc(this.product.id).update(this.product);
      $('#product').modal('hide');
      Toast.fire({
            icon: 'success',
            title: 'Updated successfully'
          })
    },
    
    editProduct(product){
      this.modal = 'edit';
      this.product = product;
      $('#product').modal('show');
    },
    
    deleteProduct(doc){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete();
          Toast.fire({
            icon: 'success',
            title: 'Product deleted successfully'
          })
        }
      })
    },
    
    readData(){
      
    },
    
    addProduct(){
      this.$firestore.products.add(this.product);
      $('#product').modal('hide');
      Toast.fire({
            icon: 'success',
            title: 'Product Added successfully'
          })
    },
    
  },
  created(){
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .image-wrapp{
    position: relative;
  }
  .image-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
    color: red;
  }
  .image-wrapp span.delete-img:hover{
    cursor: pointer;
  }
</style>
