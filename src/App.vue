<template>
  <div id="app">
    <upload></upload>
  </div>
</template>

<script>
import Upload from './components/Upload'

export default {
  name: 'app',
  components: {
    Upload
  }
}
</script>

<style lang="stylus">
body
  font-family 'Open Sans', sans-serif
</style>
