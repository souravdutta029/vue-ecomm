<template>
  <div class="home">
    <Navbar></Navbar>
    <Hero></Hero>
    <products-list></products-list>

      <!-- Learn More About Us -->
      <div class="container h-100">
          <div class="row p-5 h-100 justify-content-center align-items-center">
            <div class="col-md-6">
              <img src="/images/svg/product.svg" alt="" width="400">
            </div>
            <div class="col-md-6">
              <h3>Learn More About us</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
              </p>
              <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
            </div>
          </div>
      </div>
        <!-- Learn More About Us ends -->
        <login></login>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Products from "@/sections/Products.vue";
import Login from "@/components/Login.vue";

export default {
  name: 'Home',
  components: {
    Hero, Products, Login,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>

