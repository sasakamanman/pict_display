<template>
  <span>
    <base-button :message="'削除 > ' + id" @clicked="onClicked" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from "../BaseComponents/BaseButton.vue"

export default defineComponent({
  name: "RemoveButton",
  components: { BaseButton },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  emits: ["clicked"],
  setup(props, { emit }) {
    const onClicked = () => {
        emit("clicked", props.id)
    }

    return {
        onClicked
    }
  }

})
</script>
