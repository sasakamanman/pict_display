<template>
  <div>
    <img :src="file">
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  name: "FileView",
  async setup() {
    let file = await window.fileApi.getFile()
    return {
      file
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
    height: 100%;
    width: 100%;
  }

</style>