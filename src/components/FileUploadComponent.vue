<template>
  <div>
    <div class="custom-file">
      <input type="file" class="custom-file-input" id="files" ref="files" multiple
              v-on:change="handleFileUploads()">
      <label class="custom-file-label" for="customFile">Seleccione los anexos a enviar...</label>
    </div>
    <div v-if="items.length > 0" class="mt-4 label">
      <b-table striped hover :busy="isBusy" :items="items" :fields="fields" fixed>
      </b-table>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {
      files: [],
      items: [],
      fields: [
          { key: 'name', label: 'Archivo' },
          { key: 'size', label: 'Tamaño' },
        ],
      folder: '',
    }
  },
  props: {
    curaduria_id: String,
    isBusy: Boolean
  },
  mounted() {
    this.folder = this.setFolderId();
  },
  components: {
  },
  methods: {
    handleFileUploads(){
      this.files = this.$refs.files.files;
      Array
          .from(Array(this.files.length).keys())
          .map(x => {
            let itemFile = {
              'name': this.files[x].name,
              'size': `${this.roundToTwo(this.files[x].size / 1000000)}M`,
            }
            
            this.items.push(itemFile);
          });
      this.$emit('selectedFiles', this.files);
    },
    setFolderId(){
      let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    roundToTwo(num) {    
      return +(Math.round(num + "e+2")  + "e-2");
    }
  },
}
</script>

<style>
.label {
  font-size: 0.9em;
}
</style>