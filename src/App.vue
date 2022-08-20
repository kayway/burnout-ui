<template>
  <router-view>
    <h1>Lets Go</h1>
    <StuntUI v-show="showDrivingUI"/>
  </router-view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import StuntUI from "@/views/StuntUI.vue";

const showDrivingUI = ref(false);
const vehicleListener = ref(null);
const newCar = ref(false);
const car = ref("");
onMounted(() => {
  console.log("hello");
  vehicleListener.value = window.addEventListener("message", (event) => {
    console.log("nui says hi1");
    const item = event.data;
    if (item.type == "enabledrivingUI") {
      console.log("nui says hi");
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
  window.removeEventListener("message", vehicleListener.value);
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
