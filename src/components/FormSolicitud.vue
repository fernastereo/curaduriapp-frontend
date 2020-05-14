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
              <label for="objetolicencia_id" class="label">Objeto del Trámite:</label>
            </b-col>
            <b-col sm="4">
              <b-form-select
                id="objetolicencia_id"
                v-model="form.objetolicencia_id"
                :options="objetos"
                required
                size="sm"
              ></b-form-select>
            </b-col>
            <b-col sm="2">
              <label for="licenciaanteriornumero" class="label">Licencia Anterior:</label>
            </b-col>
            <b-col sm="1">
              <b-form-input
                id="licenciaanteriornumero"
                v-model="form.licenciaanteriornumero"
                type="text"
                size="sm"
              ></b-form-input>
            </b-col>
            <b-col sm="1">
              <label for="licenciaanteriorvigencia" class="label">Año:</label>
            </b-col>
            <b-col sm="1">
              <b-form-input
                id="licenciaanteriorvigencia"
                v-model="form.licenciaanteriorvigencia"
                type="number"
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
                type="text"
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
                type="text"
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
                type="text"
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
              <FileUploadComponent
                v-on:selectedFiles="getSelectedFiles($event)"
              ></FileUploadComponent>
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
        <ul>
          <li v-for="anexo in anexos" :key="anexo.index">
            {{ anexo.name }}
          </li>
        </ul>
      </b-card>
      
      <template v-slot:footer>
        <em>Footer Slot</em>
      </template>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import FileUploadComponent from './FileUploadComponent';

export default {
  data(){
    return {
      form: {
          curaduria_id: null,
          objetolicencia_id: null,
          licenciaanteriornumero: '',
          licenciaanteriorvigencia: '',
          modalidad_id: null,
          solidentificacion : '',
          solnombre: '',
          soltelefono: '',
          solemail: '',
          descripcion: '',
        },
      anexos: [],
      objetos: [{ text: '-- Seleccione --', value: null } ],
      licencias: [{ text: '-- Seleccione --', value: null } ],
      modalidads: [{ text: '-- Seleccione --', value: null } ],
      show: true
    }
  },
  props: {
    curaduria_id: String,
  },
  mounted() {
    this.getObjetoLicencias();
    this.getLicencias();
    console.log(this.curaduria_id);
    this.form.curaduria_id = this.curaduria_id;
  },
  components: {
    FileUploadComponent,
  },
  methods: {
    getSelectedFiles(files) {
      this.anexos = files;
      // console.log('Rcibido en el form:');
      // console.log(this.anexos);
    },
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
        //Hasta ahora guarda los datos pero no recibe los archivos 
        //y por consiguiente no hay nada para subir al bucket
        const formData = new FormData();
        
        formData.append('curaduria_id', this.form.curaduria_id);
        formData.append('objetolicencia_id', this.form.objetolicencia_id);
        formData.append('licenciaanteriornumero', this.form.licenciaanteriornumero);
        formData.append('licenciaanteriorvigencia', this.form.licenciaanteriorvigencia);
        formData.append('modalidad_id', this.form.modalidad_id);
        formData.append('solidentificacion', this.form.solidentificacion);
        formData.append('solnombre', this.form.solnombre);
        formData.append('soltelefono', this.form.soltelefono);
        formData.append('solemail', this.form.solemail);
        formData.append('descripcion', this.form.descripcion);
        
        Array
          .from(Array(this.anexos.length).keys())
          .map(x => {
            formData.append('anexos[]', this.anexos[x]);
          });
        
        // Para verificar si el formData si tiene algo
        // for (var key of formData.entries()) {
        //   console.log(key[0] + ', ' + key[1])
        // }

        axios
          .post(`${this.$api_host}/api/solicituds`, formData)
          .then((response) => {
            console.log(response);
          }).catch((response) => {
            console.log(response);
          });
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
