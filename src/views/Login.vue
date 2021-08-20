<template>
<div id="login">
  <form @submit.prevent="login">
    <h2>Login</h2>
    <input class="w-full rounded-lg p-1 m-2" type="email" placeholder="Email address..." v-model="email" />
    <input class="w-full rounded-lg p-1 m-2" type="password" placeholder="password..." v-model="password" />
    <button class="border-2 border-solid rounded-xl border-green-400 bg-green-100 p-1" type="submit">Login</button>
  </form>
</div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
  login() {
    this.$store.dispatch('userLogin', {
      email: this.email,
      password: this.password
    })
  },
},
};
</script>

<style>
</style>