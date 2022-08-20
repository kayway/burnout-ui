<template>
  <div class="flame-bar">
    <video id="flame" src="../assets/green-flame.webm" muted autoplay></video>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import frameData from "@/assets/frame-information.json";

const boost = ref(100);
const boostRate = ref(0);

function searchFrames(key) {
  let low = 0;
  let high = frameData.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (frameData[mid].boost == key) {
      return frameData[mid];
    } else if (frameData[mid].boost < key) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return 0;
}
function flameLooper() {
  let tempBoost = boostRate.value < 0 ? boost.value * -1 : boost.value;
  let video = document.getElementById("flame");
  let boostData = searchFrames(tempBoost)
  tempBoost = boostRate.value < 0 ? boost.value * -1 : boost.value;
  boostData = searchFrames(tempBoost);
  if (video.currentTime >= boostData.end) {
    if (boostRate.value == 0) {
      if (boost.value == 0) {
        video.pause();
      } else {
        video.currentTime = boostData.start;
        if(video.paused)
          video.play();
      }
    }
  }
}
onMounted (() => {
  window.addEventListener("message", (event) => {
    console.log("flame says hi")
    const item = event.data;
    if (item.type == "boostRate") {
      console.log(`boostRate: ${item.amount}`);
      boostRate.value = item.amount;
    } else if (item.type == "boost") {
      boost.value = item.amount;
    }
  });
  setInterval(function () { boost.value = Math.min(Math.max(boost.value + boostRate.value, 0), 100);}, 1000);
  setInterval(flameLooper(), 100);
});

</script>

<style scoped>
.flame-bar {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 25%;
  height: 10%;
  background-image: url("../assets/tire-mark.png");
  background-size: 55% 50%;
  background-repeat: no-repeat;
  background-position: 30% 50%;
}
#flame {
  height: 200%;
  position: relative;
  right: 16%;
  bottom: 55%;
}
</style>
