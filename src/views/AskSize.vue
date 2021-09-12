<template>
  <Suspense>
    <template #default>
      <file-preview class="preview" :imageSize="imageSize"/>
    </template>
    <template #fallback>
      Now Loading...
    </template>
    <template #error>
      Error!
    </template>
  </Suspense>
  <br/>
  <div class="sub-item">
    <input type="checkbox" :checked="keepAspectRatio" @change="toggleKeepAspectRatio">
    縦横比を維持する<br/>
    x: <input type="number" :value="imageSize.x" @change="changeWidth">&nbsp;
    y: <input type="number" :value="imageSize.y" @change="changeHeight">&nbsp;
    <base-button message="サイズ決定" @clicked="onClick" />
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import FilePreview from '@/components/FileView/FilePreview.vue'
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ImageSize } from '@/interface/ImageSize'

export default defineComponent({
  components: { BaseButton, FilePreview },
  name: "AskFileSize",
  setup() {
    const onClick = () => {
      window.fileApi.sendFileSize(Number(id), imageSize.x, imageSize.y)
    }

    const { id, x, y } = useRoute().query

    const originalImageSize: ImageSize = {x: Number(x), y: Number(y)}

    const originalRatio = originalImageSize.y / originalImageSize.x

    const imageSize = reactive<ImageSize>({x: originalImageSize.x, y: originalImageSize.y})

    const keepAspectRatio = ref(true)

    const changeWidth = (evt: any) => {
      imageSize.x = Number(evt.target.value)
      if (keepAspectRatio.value) {
        imageSize.y = Math.round(imageSize.x * originalRatio)
      }
    }

    const changeHeight = (evt: any) => {
      imageSize.y = Number(evt.target.value)
      if (keepAspectRatio.value) {
        imageSize.x = Math.round(imageSize.y / originalRatio)
      }
    }

    const toggleKeepAspectRatio = (evt: any) => {
      keepAspectRatio.value = evt.target.checked
      if (keepAspectRatio.value) {
        imageSize.y = Math.round(imageSize.x * originalRatio)
      }
    }

    return {
      onClick,
      id,
      imageSize,
      keepAspectRatio,
      changeWidth,
      changeHeight,
      toggleKeepAspectRatio
    }
  },
})
</script>

<style lang="scss" scoped>
  .preview {
    height: 90%;
    width: 100%;
    overflow: scroll;
  }

  .sub-item {
    margin: 10;
  }
</style>