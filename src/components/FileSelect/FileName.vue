<template>
  <span>
    {{ fileName }}
  </span>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    props: {
        fileName: {
            type: String,
            required: true
        }
    }
})
</script>

