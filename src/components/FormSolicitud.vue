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
                v-model="form.licencia_id"
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

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
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
export default {
  name: 'App',
  data(){
    return {
      form: {
          objeto_id: null,
          licenciaanterior: '',
          vigencialicencia: '',
          licencia_id: null,
          modalidad_id: null,
          solidentificacion : '',
          solnombre: '',
          soltelefono: '',
          solemail: '',
          descripcion: '',
          anexos  : []
        },
      objetos: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      licencias: [],
      modalidads: [],
      show: true
    }
  },
  props: {
  },
  mounted() {
  },
  components: {
  },
  methods: {
    getObjetoLicencias(){

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
.label {
  font-size: 0.9em;
}
</style>
