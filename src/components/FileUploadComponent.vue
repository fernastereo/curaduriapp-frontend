<template>
  <div>
    <div class="custom-file">
      <input type="file" class="custom-file-input " id="files" ref="files" multiple v-on:change="handleFileUploads()">
      <label class="custom-file-label" for="customFile">Seleccione los anexos a enviar...</label>
    </div>
    <div class="mt-4 label">
      <span v-if="files.length > 0">Archivos Seleccionados</span>
      <ul>
        <li v-for="file in files" :key="file.index">
          {{ file.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {
      files: '',
    }
  },
  props: {
  },
  mounted() {
    
  },
  components: {
  },
  methods: {
    handleFileUploads(){
      this.files = this.$refs.files.files;
      this.$emit('selectedFiles', this.files);
    },
  },
}
</script>

<style>
.label {
  font-size: 0.9em;
}
</style>