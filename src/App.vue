<template>
  <div id="app">    
    <b-container class="bv-example-row">
      <b-row>
        <b-col><b-img :src=this.logo fluid alt="Responsive image"></b-img></b-col>
        <b-col></b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container>
    <p>{{ this.titulo }}</p>
    
    <!-- <HelloWorld msg="hola"></HelloWorld> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import MyComponent from './components/MyComponent.vue';

export default {
  name: 'App',
  data(){
    return {
      logo: '',
      titulo: '',
    }
  },
  props: {
  },
  mounted() {
    // this.logo = "xxxxx";
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    this.getCuraduria(id);
  },
  components: {
    // HelloWorld,
    // MyComponent
  },
  methods: {
    getCuraduria(idCuraduria){
      this.$http.get(`http://curaduriapp.test/api/curadurias/${idCuraduria}`)
        .then((response) => {
          console.log(response.data);
          this.logo = 'http://curaduriapp.test/storage/' + response.data.logo;
          this.titulo = response.data.curador;
        }
      )
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
