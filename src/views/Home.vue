<template>
  <div class="home">
    <file-select />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileSelect from "@/components/FileSelect/FileSelect.vue";

export default defineComponent({
  name: "Home",
  components: {
    FileSelect,
  },
});
</script>
