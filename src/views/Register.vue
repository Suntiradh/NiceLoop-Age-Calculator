<template>
  <div id="register">
    <form @submit.prevent="register">
      <h2>Register</h2>
      <input class="w-full rounded-lg p-1 m-2" type="email" placeholder="Email address..." v-model="email" />
      <input class="w-full rounded-lg p-1 m-2" type="password" placeholder="password..." v-model="password" />
      <button class="border-2 border-solid rounded-xl border-blue-400 bg-blue-100 p-1" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Successfully registered! Please login.");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style>
</style>