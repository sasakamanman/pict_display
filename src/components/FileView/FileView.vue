<template>
  <div>
    <img :src="fileName">
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  name: "FileView",
  async setup() {
    let fileName = await window.fileApi.getFile()
    return {
      fileName
    }
  }
})
</script>


<style lang="scss">
  html,body,div {
    padding: 0;
    height: 100%;
    margin: 0;
  }

  img {
    -webkit-app-region: drag;
    max-height: 100%;
    max-width: 100%;
  }

</style>