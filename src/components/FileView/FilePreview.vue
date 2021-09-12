<template>
  <div class="image-box">
    <img :src="file" :style="{height: height, width: width}">
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { ImageSize } from '@/interface/ImageSize'

export default defineComponent({
  props: {
    imageSize: {
      type: Object as PropType<ImageSize>,
      require: true
    }
  },
  async setup(props) {
    let file = await window.fileApi.getPreviewFile()

    let height = computed(() => {
      return props.imageSize?.y.toString() + 'px'
    })
    let width = computed(() => {
      return props.imageSize?.x.toString() + 'px'
    })

    return {
      file,
      height,
      width
      }
  },
})
</script>

<style lang="scss">
    html,body {
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  div {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .image-box {
    display: block;
    padding: auto;
  }
</style>