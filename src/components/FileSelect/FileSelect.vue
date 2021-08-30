<template>
  <div>
    <div v-for="file in fileNameList" :key="file.id">
      <file-name :fileName="file.fileName"/><remove-button :id="file.id" @clicked="deleteFile" /><br/>
    </div>
    <div>
      <select-button @clicked="selectFile"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { FileDTO } from '@/model/dto/File'
import FileName from './FileName.vue'
import RemoveButton from './RemoveButton.vue'
import SelectButton from './SelectButton.vue'

export default defineComponent({
  name: "FileSelect",
  components: { SelectButton, RemoveButton, FileName },
  setup() {
    let isOpened = false
    let fileNameList:Ref<FileDTO[]> = ref([])

    onMounted(() => {
      window.fileApi.recieveFileList((recievedFileNameList: FileDTO[]) => {
        fileNameList.value = recievedFileNameList
      })

      window.fileApi.completeLoading()
    })

    const selectFile = async () => {
      window.fileApi.selectFile()
    }

    const deleteFile = async (id: number) => {
      window.fileApi.deleteFile(id)
    }

    return {
      isOpened,
      fileNameList,
      selectFile,
      deleteFile
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
