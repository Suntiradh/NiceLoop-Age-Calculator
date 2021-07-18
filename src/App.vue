<template>
  <div id="nav">
    <CalculateAge />
  </div>
</template>
<script>
import CalculateAge from "./components/CalculateAge.vue";

export default {
  name: "App",
  components: {
    CalculateAge,
  },
};
</script>


<style>
#app {
  text-align: center;
  color: #2c3e50;
  width: 70%;
  margin: 0 auto;
}


</style>
