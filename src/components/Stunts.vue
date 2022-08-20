<template></template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const stunts = ref(new Map());
const toast = useToast();

function updateStunts() {
  stunts.value.forEach(function (value, key) {
    stunts.value.set(key, ++value);
    toast.update(key, { content: key + value });
  });
}
setInterval(function () {
  Math.max(0, Math.min((boost.value += boostRate.value), 100));
}, 1000);
window.addEventListener("message", (event) => {
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
</script>
