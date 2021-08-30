<template>
    <base-button :message="'ファイル選択'" @clicked="onClicked" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BaseButton from "../BaseComponents/BaseButton.vue"

export default defineComponent({
  components: { BaseButton },
  name: "SelectButton",
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
