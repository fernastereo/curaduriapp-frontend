<template>
  <div>
    
    <b-card title="Solicitud de Radicación de Proyectos" header-tag="header" footer-tag="footer">
      <template v-slot:header>
        <span class="float-right">Descargue aqui el <b-link href="#foo">Formulario Unico de Radicación</b-link></span>
      </template>
        
      <div>
        
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-row class="my-2" align-v="baseline">
            <b-col sm="2">
              <label for="objeto_id" class="label">Objeto del Trámite:</label>
            </b-col>
            <b-col sm="4">
              <b-form-select
                id="objeto_id"
                v-model="form.objeto_id"
                :options="objetos"
                required
                size="sm"
              ></b-form-select>
            </b-col>
            <b-col sm="2">
              <label for="licenciaanterior" class="label">Licencia Anterior:</label>
            </b-col>
            <b-col sm="1">
              <b-form-input
                id="licenciaanterior"
                v-model="form.licenciaanterior"
                type="email"
                required
                size="sm"
              ></b-form-input>
            </b-col>
            <b-col sm="1">
              <label for="vigencialicencia" class="label">Año:</label>
            </b-col>
            <b-col sm="1">
              <b-form-input
                id="vigencialicencia"
                v-model="form.vigencialicencia"
                type="text"
                required
                size="sm"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2" align-v="baseline">
            <b-col sm="2">
              <label for="licencia_id" class="label">Trámite:</label>
            </b-col>
            <b-col sm="4">
              <b-form-select
                id="licencia_id"
                v-model="licencia_id"
                :options="licencias"
                required
                size="sm"
              ></b-form-select>
            </b-col>
            <b-col sm="2">
              <label for="modalidad_id" class="label">Modalidad:</label>
            </b-col>
            <b-col sm="4">
              <b-form-select
                id="modalidad_id"
                v-model="form.modalidad_id"
                :options="modalidads"
                required
                size="sm"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-2" align-v="baseline">
            <b-col sm="2">
              <label for="solidentificacion" class="label">Identificación:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input
                id="solidentificacion"
                v-model="form.solidentificacion"
                required
                size="sm"
              ></b-form-input>
            </b-col>
            <b-col sm="2">
              <label for="solnombre" class="label">Nombre:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input
                id="solnombre"
                v-model="form.solnombre"
                required
                size="sm"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2" align-v="baseline">
            <b-col sm="2">
              <label for="soltelefono" class="label">Teléfono:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input
                id="soltelefono"
                v-model="form.soltelefono"
                required
                size="sm"
              ></b-form-input>
            </b-col>
            <b-col sm="2">
              <label for="solemail" class="label">E-mail:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input
                id="solemail"
                v-model="form.solemail"
                type="email"
                required
                size="sm"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="2">
              <label for="descripcion" class="label">Descripción:</label>
            </b-col>
            <b-col sm="10">
              <b-form-textarea
                id="descripcion"
                v-model="form.descripcion"
                placeholder="Descripción de su proyecto..."
                rows="3"
                max-rows="6"
                size="sm"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="12">
              <b-form-file
                multiple 
                v-model="form.anexos"
                :state="Boolean(form.anexos)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-col>
          </b-row>
          <div class="d-flex flex-row-reverse mt-5">
            <b-button type="reset" variant="danger">Cancelar</b-button>
            <b-button type="submit" variant="primary" class="mr-5">Enviar</b-button>
          </div>
        </b-form> 
      </div>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
      
      <template v-slot:footer>
        <em>Footer Slot</em>
      </template>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return {
      form: {
          objeto_id: null,
          licenciaanterior: '',
          vigencialicencia: '',
          modalidad_id: null,
          solidentificacion : '',
          solnombre: '',
          soltelefono: '',
          solemail: '',
          descripcion: '',
          anexos  : []
        },
      objetos: [{ text: '-- Seleccione --', value: null } ], //, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      licencias: [{ text: '-- Seleccione --', value: null } ],
      modalidads: [{ text: '-- Seleccione --', value: null } ],
      show: true
    }
  },
  props: {
  },
  mounted() {
    this.getObjetoLicencias();
    this.getLicencias();
  },
  components: {
  },
  methods: {
    getObjetoLicencias(){
      axios
        .get(`${this.$api_host}/api/objetolicencias`)
        .then((response) => {
          const objetos = response.data;
          objetos.forEach((objeto) => {
            this.objetos.push({ text: objeto.nombre, value: objeto.id });
          });
        })
    },
    getLicencias(){
      axios
        .get(`${this.$api_host}/api/licencias`)
        .then((response) => {
          const licencias = response.data;
          licencias.forEach((licencia) => {
            this.licencias.push({ text: licencia.nombre, value: licencia.id });
          });
        })
    },
    getModalidads(idLicencia){
      this.modalidads = [{ text: '-- Seleccione --', value: null } ];
      axios
        .get(`${this.$api_host}/api/licencias/${idLicencia}/modalidads`)
        .then((response) => {
          const modalidads = response.data;
          modalidads.forEach((modalidad) => {
            this.modalidads.push({ text: modalidad.nombre, value: modalidad.id });
          });
        })
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
  },
  computed: {
    licencia_id: {
      get() {
        return console.log('GET');
      },
      set(value) {
        return this.getModalidads(value);
      }
    }
  }
}
</script>

<style>
.label {
  font-size: 0.9em;
}
</style>
