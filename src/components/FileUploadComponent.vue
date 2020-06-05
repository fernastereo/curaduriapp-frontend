<template>
  <div>
    <div class="custom-file">
      <input type="file" class="custom-file-input" id="files" ref="files" multiple :disabled="isBusy"
              v-on:change="handleFileUploads()">
      <label class="custom-file-label" for="customFile">Seleccione los anexos a enviar...</label>
    </div>
    <div v-if="items.length > 0" class="mt-4 label">
      <b-table small striped hover :busy="isBusy" :items="items" :fields="fields" responsive>
        <template v-slot:cell(name)="data">
          <span v-html="data.value"></span>
        </template>
        <template v-slot:cell(progress)="row">
          <b-progress :value="row.item.progress" :max="100" show-progress></b-progress>
        </template>
        <template v-slot:cell(actions)="row">
          <b-button size="sm" variant="danger" @click="deletefile(row.item, row.index)" class="mr-1">
            <b-icon-x-square></b-icon-x-square>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data(){
    return {
      files: [],
      items: [],
      fields: [
          { key: 'name', label: 'Archivo', 'class': 'file-column' },
          { key: 'size', label: 'Tamaño', 'class': 'size-column' },
          { key: 'progress', label: '', 'class': 'progress-column' },
          { key: 'status', label: '', 'class': 'status-column' },
          { key: 'actions', label: '', 'class': 'action-column' },
        ],
      folder: '',
      isBusy: false,
    }
  },
  props: {
    curaduria_id: String,
  },
  mounted() {
    this.folder = this.setFolderId();
  },
  components: {
  },
  methods: {
    handleFileUploads(){
      this.isBusy = true;
      this.files = this.$refs.files.files;
      Array
        .from(Array(this.files.length).keys())
        .map(x => {
          let itemFile = {
            'name': this.files[x].name,
            'size': `${this.roundToTwo(this.files[x].size / 1000000)}M`,
            'progress': '0',
            'status': 'Cargando...',
            'loaded': false,
            'path': '',
          }
          this.items.push(itemFile);

          const config = {
            onUploadProgress: function(progressEvent) {
              itemFile.progress = Math.round((progressEvent.loaded * 90) / progressEvent.total)
              console.log(itemFile.progress)
            }
          }
          let formData = new FormData();
          formData.append('archivo', this.files[x]);
          formData.append('folder', this.folder);
          formData.append('id', this.curaduria_id);

          axios.post(`${this.$api_host}/api/solicituds/upload`, formData, config)
            .then(res => {
              itemFile.name = '<strong><span style="color:blue">' + this.files[x].name + '</span></strong>';
              itemFile.progress = 100;
              itemFile.status = 'Cargado';
              itemFile.loaded = true;
              itemFile.path = res.data.path;
              console.log(res);
              this.isBusy = false;
            })
            .catch(err => {
              itemFile.status = 'Error al cargar';
              this.isBusy = false;
              console.log(err);
            })
        });
      // this.$emit('selectedFiles', this.files);
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
    },
    deletefile(item, index) {
      this.items.splice(index, 1);
    },
  },
}
</script>

<style>
.label {
  font-size: 0.9em;
}
.file-column{
  max-width: 180px;
}
.size-column{
  max-width: 30px;
}
.progress-column{
  max-width: 60px;
}
.action-column{
  max-width: 15px;
}
.status-column{
  max-width: 25px;
}
</style>