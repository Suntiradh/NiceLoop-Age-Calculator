<template>
<div id="login">
  <form @submit.prevent="login">
    <h2>Login</h2>
    <input type="email" placeholder="Email address..." v-model="email" />
    <input type="password" placeholder="password..." v-model="password" />
    <button type="submit">Login</button>
  </form>
</div>
</template>

<script>
import firebase from "firebase";

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
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('Successfully logged in');
        this.$router.push('/member');
      })
      .catch(error => {
        alert(error.message);
      });
  },
},
};
</script>

<style>
</style>