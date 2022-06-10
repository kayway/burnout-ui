<template></template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";
import frameData from "@/assets/frame-information.json";
const stunts = ref(new Map());
const toast = useToast();
const stuntListener = ref(null);
const stuntInterval = ref(null);
function updateStunts() {
  stunts.value.forEach(function (value, key) {
    stunts.value.set(key, ++value);
    toast.update(key, { content: key + value });
  });
}

onMounted(() => {
  setInterval(function () {
    Math.max(0, Math.min((boost.value += boostRate.value), 100));
  }, 1000);
  stuntListener.value = window.addEventListener("message", (event) => {
    const item = event.data;
    if (item.type == "stunt") {
      if (item.enabled) {
        toast.success(item.stunt, {
          id: item.stunt,
          timeout: false,
          toastClassName: "stuntToast",
        });
        stunts.value.set(item.stunt, 0);
      } else if (!item.enabled) {
        stunts.value.delete(item.stunt);
        toast.dismiss(item.stunt);
      }
    }
  });
});
onUnmounted(() => {
  clearInterval(stuntInterval.value);
  window.removeEventListener("message", stuntListener);
});
</script>
