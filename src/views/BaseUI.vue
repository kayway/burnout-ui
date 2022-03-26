<template>
  <div class="base-ui"  v-show="showDrivingUI">
    <h2>Hello 2</h2>
    <StuntBar />
  </div>
  
</template>
<script setup>
import StuntBar from "@/components/StuntBar.vue";
import { onMounted, onUnmounted, ref } from 'vue'
const showDrivingUI = ref(false)
const vehicleListener = ref(null)
//const pointListener = ref(null)
onMounted(() => {
    vehicleListener.value = window.addEventListener('drivingUI', (event) => {
      if (event.type == "open-drivingUI"){
        showDrivingUI.value = event.data  
      }
    })
})
onUnmounted(() => {
    window.removeEventListener('message', vehicleListener)
    })
</script>
