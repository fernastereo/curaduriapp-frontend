<template>
  <div id="app"> 
    <NavBar></NavBar>   
    <b-container class="container mt-4">
      <b-row>
        <b-col cols="3"><b-img :src=this.logo fluid alt="Responsive image"></b-img></b-col>
        <b-col><h1 class="title">Solicitud de Radicación de Proyectos</h1></b-col>
      </b-row>
    </b-container>
    <b-container class="container">

    </b-container>
    <!-- <HelloWorld msg="hola"></HelloWorld> -->
  </div>
</template>

<script>
import NavBar from './components/NavBar';
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
    NavBar,
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
}
.title {
  font-size: 1.7rem;
  font-weight: 500;
  text-align: left;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
