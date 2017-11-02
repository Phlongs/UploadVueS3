<template>
  <div>
    <h1>Upload directly to AWS S3</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone" id="dropzone" v-on:vdropzone-sending="sendingEvent" :awss3="awss3" v-on:vdropzone-s3-upload-error="s3UploadError" v-on:vdropzone-s3-upload-success="s3UploadSuccess" :options="dropzoneOptions">
    </vue-dropzone>
    <hr>
    <button @click="uploadFiles">Upload Files</button>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'

var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  signatureVersion: 'v4',
});

AWS.config.update({accessKeyId: '', secretAccessKey:
''});

AWS.config.region = 'us-east-2';

  const url = s3.getSignedUrl('putObject', {
    Bucket: '',
    Key: '',
    Expires: 10
  });

  console.log(url)



export default {
  data() {


    return {

      signurl: '"' + url + '"',
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        autoProcessQueue: false
      },
      awss3: {
        signingURL: ''
      }
    }
  },
  methods: {
    sendingEvent(file, xhr, formData) {
      formData.append('paramName', 'some value or other');
    },
    s3UploadError(err) {
      console.log(err)
    },
    s3UploadSuccess(loc) {
      console.log(loc)
    },
    uploadFiles() {
        this.$refs.myVueDropzone.setAWSSigningURL(this.signurl);
        this.$refs.myVueDropzone.processQueue();
    }
  },
  components: {
    vue2Dropzone
  }
}
</script>
<style>
input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
label {
  font-weight: bold;
}
.note {
  color: red;
}
</style>
