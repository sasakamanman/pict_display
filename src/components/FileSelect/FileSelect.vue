<template>
  <div>
    <div v-for="file in fileNameList" :key="file.id">
      <file-name :fileName="file.fileName"/><remove-button /><br/>
    </div>
    <div>
      <select-button />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { FileDTO } from '@/model/dto/File'
import FileName from './FileName.vue'
import RemoveButton from './RemoveButton.vue'
import SelectButton from './SelectButton.vue'

export default defineComponent({
  name: "FileSelect",
  components: { SelectButton, RemoveButton, FileName },
  setup() {
    let isOpened = false
    const fileNameList:FileDTO[] = [
      {id: 0, fileName: 'あいう.png', filePath: 'c:\\あいう.png'},
      {id: 1, fileName: 'かきく.png', filePath: 'c:\\かきく.png'}
    ]

    onMounted(() => {
      console.log('test')
      window.apiFile
    })

    return {
      isOpened,
      fileNameList
    }
  }
})
</script>

<style lang="scss">
  span { 
    padding: 5px
  }

  div { 
    padding: 5px
  }

</style>
