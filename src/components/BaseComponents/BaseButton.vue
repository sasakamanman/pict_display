<template>
    <input type="button" :value="message" @click="onClicked">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },
  emits: ["clicked"],
  setup(props, { emit }) {
    const onClicked = () => {
            emit("clicked")
        }

        return {
            onClicked
        }
  }
})
</script>
