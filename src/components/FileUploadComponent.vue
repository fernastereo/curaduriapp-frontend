<template>
  <div>
    <div class="custom-file">
      <input type="file" class="custom-file-input " id="files" ref="files" 
              multiple v-on:change="handleFileUploads()">
      <label class="custom-file-label" for="customFile">Seleccione los anexos a enviar...</label>
    </div>
    <div v-if="files.length > 0" class="mt-4 label">
      <!-- <ul>
      <span v-if="files.length > 0">Archivos Seleccionados</span>
        <li v-for="file in files" :key="file.index">
          {{ file.name }}
        </li>
      </ul> -->
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">File</th>
            <th scope="col">Size</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.index">
            <th scope="row">{{ file.index }}</th>
            <td>{{ file.name }}</td>
            <td>{{ file.size }}</td>
            <td><progress max="100" :value.prop="uploadPercentage"></progress></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {
      files: [],
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