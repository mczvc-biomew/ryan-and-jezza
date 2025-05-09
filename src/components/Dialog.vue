<template>
  <dialog class="dialog" ref="dialogEl">
    <div class="dialog-widget-content">
      <a role="button" aria-label="Close (Esc)" tabindex="0"
      class="dialog-close-button dialog-lightbox-close-button"
      href="#" @click.prevent="emits('close')">
        <i class="eicon-close"></i>
      </a>
      <slot name="dialog-header">
        <div class="dialog-header">
        </div>
      </slot>
      <div class="dialog-message dialog-lightbox-message animated" ref="dialogMessage">
        <slot name="default">
        </slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">

const emits = defineEmits(['close']);

const dialogEl = ref<HTMLElement>();
const dialogMessage = ref<HTMLElement>();

defineExpose({
  'dialog': dialogEl
});

onMounted( () => {
  dialogMessage.value!.classList.add('zoom-in');
});
</script>