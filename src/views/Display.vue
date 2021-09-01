<template>
  <Suspense>
    <template #default>
      <file-view />
    </template>
    <template #fallback>
      Now Loading...
    </template>
    <template #error>
      Error!
    </template>
  </Suspense>
</template>

<script lang="ts">
import FileView from '@/components/FileView/FileView.vue'
import { defineComponent} from 'vue'

export default defineComponent({
  components: { FileView },
  name: "Display"
})
</script>
