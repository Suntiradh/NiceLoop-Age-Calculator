<template>
  <div id="member">
    <calculate-age v-if="this.$store.state.user !== null"/>
  </div>
</template>

<script>
import CalculateAge from "../components/CalculateAge.vue";

export default {
  name: "Member",
  components: { CalculateAge },
};

</script>

<style>
</style>