<template>
  <router-view>
    <StuntUI v-show="showDrivingUI" />
  </router-view>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import StuntUI from "@/views/StuntUI.vue";
const showDrivingUI = ref(false);
const vehicleListener = ref(null);
const newCar = ref(false);
const car = ref("");
onMounted(() => {
  vehicleListener.value = window.addEventListener("message", (event) => {
    const item = event.data;
    if (item.type == "enabledrivingUI") {
      showDrivingUI.value = item.enable;
      if (item.car != car.value) {
        newCar.value = true;
        car.value = item.car;
      } else {
        newCar.value = false;
      }
    }
  });
});
onUnmounted(() => {
  window.removeEventListener("message", vehicleListener);
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
