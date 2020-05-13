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
          <FormSolicitud></FormSolicitud>
        </b-col>
      </b-row>
    </b-container>
    
    <!-- <HelloWorld msg="hola"></HelloWorld> -->
  </div>
</template>

<script>
import axios from 'axios';
import FormSolicitud from './components/FormSolicitud';

export default {
  
  name: 'App',
  data(){
    return {
      logo: '',
      titulo: '',
      form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
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
    FormSolicitud,
  },
  methods: {
    getCuraduria(idCuraduria){
      axios
        .get(`${this.$api_host}/api/curadurias/${idCuraduria}`)
        .then((response) => {
          console.log(response.data);
          this.logo = `${this.$api_host}/storage/` + response.data.logo;
          this.titulo = response.data.curador;
        }
      )
    },
    onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
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
