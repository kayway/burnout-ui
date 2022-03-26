<template>
    <div class="stunt-bar">
        <h3>Hello 3</h3>
        <div class="flame-bar">
            <img src = "../assets/green-flame.gif"/>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const boost = ref(100)
const boostListener = ref(null)
//const pointListener = ref(null)
onMounted(() => {
    boostListener.value = window.addEventListener('boostUI', (event) => {
      if (event.type == "boost"){
        boost.value = event.data
      }
    })
    /* pointListener.value = window.addEventListener('message', (event) => {
      if (event.type == "points")
      {
         boost.value += event.data
      }
    }) */
})
onUnmounted(() => {
    window.removeEventListener('message', boostListener)
    //window.removeEventListener('message', pointListener)
    })
</script>

<style scoped>
    .stunt-bar {
        position: fixed;
        bottom: 10px;
        left: 10px;
        width: 25%;
        height: 10%;
        background-image: url("../assets/tire-mark.png");
        background-size: 70%;
        background-repeat: no-repeat;
        background-position: left;  
    }
    .flame-bar{
        width: v-bind('boost + "%"'); /*var(--barWidth); value decreases as boost decreases.*/
        height: 100%;
        position: relative;
        /* top: -65%; */
        /* left: -2%; */
        overflow: hidden;
        margin: 0%;
        transition: width 2s;
    }
    .flame-bar img {
        /* display: block; */
        position: relative;
        width: v-bind('100 + (100 - boost) + "%"'); /*var(--imgWidth); Value increases as boost decreases.*/
        height: 200%;
        top: -54%;
        left: -2%;
        /* margin-right: 90%; */
        transition: width 2s;
    }

</style>