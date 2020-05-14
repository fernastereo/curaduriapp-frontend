<template>
  <div id="app"> 
    <b-container class="container mt-4">
      <b-row class="logo">
        <b-col><b-img :src=this.logo fluid alt="Responsive image"></b-img></b-col>
      </b-row>
    </b-container>
    <b-container class="container">
      <b-row>
        <b-col>
          <FormSolicitud :curaduria_id="curaduria_id"></FormSolicitud>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import FormSolicitud from './components/FormSolicitud';

export default {
  
  name: 'App',
  data(){
    return {
      curaduria_id: 0,
      logo: '',
    }
  },
  props: {
  },
  beforeMount(){
    const urlParams = new URLSearchParams(window.location.search);
    this.curaduria_id = urlParams.get('id');
  },
  mounted() {
    this.getCuraduria(this.curaduria_id);
  },
  components: {
    FormSolicitud,
  },
  methods: {
    getCuraduria(idCuraduria){
      axios
        .get(`${this.$api_host}/api/curadurias/${idCuraduria}`)
        .then((response) => {          
          this.logo = `${this.$api_host}/storage/` + response.data.logo;
        }
      )
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo {
  text-align: center;
}
</style>
