<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Our Products List</h1>
          
            <!--For Row containing all card-->
            <div class="row">
                <!--Card 1-->
                <div class="col-md-4" v-for="(product, idx) in products" :key="idx">
                    <div class="card product-item">
                        <!--Card image-->
                        <carousel :perPage="1">
                            <slide v-for="(img, index) in product.images" :key="index">
                                <div class="view view-cascade overlay text-center"> 
                                    <img class="card-img-top" :src="img" alt=""> 
                                    <a>
                                        <div class="mask rgba-white-slight"></div>
                                    </a> 
                                </div>
                            </slide>
                        </carousel>
                        
                        <!--Card Body-->
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <h5 class="card-price">{{ product.price | currency('₹') }}</h5>
                            </div>
                            <add-to-cart 
                                :image="getImage(product.images)"
                                :p-id="product.id"
                                :price="product.price" 
                                :name="product.name">
                            </add-to-cart>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import {db} from '../firebase';

export default {
  name: 'products-list',
  
  props: {
    msg: String
  },

  data(){
      return{
          products: [],
      }
  }, 
  
  methods: {
      getImage(images){
        return images[0];
      }
  },

  firestore(){
      return{
          products: db.collection('products'),
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products{
    margin-top: 7rem;
    background: #f2f2f2;
    padding-bottom: 3rem;
}

.card-img-top {
    width: 90%;
    height: 250px
}

.view {
    background-color: #dfe6e0;
    padding: 10px;
    margin: 20px
}

.card {
    width: 95%;
    padding: 0px;
    margin-left: 2%
}
</style>