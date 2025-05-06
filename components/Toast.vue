<script setup lang="ts">
import { ToastAction, ToastClose, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui'
</script>

<template>
  <ToastProvider>
    <ToastRoot>
      <ToastTitle />
      <ToastDescription />
      <ToastAction />
      <ToastClose />
    </ToastRoot>

    <ToastViewport />
  </ToastProvider>
</template>