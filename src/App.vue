<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/member">Members</router-link> |
    <span v-if="!this.$store.state.user">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
    </span>
    <button class="bg-red-200 border-2 border-solid rounded-xl border-red-400 p-1" v-if="this.$store.state.user" @click="logout">Logout</button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      this.$store.dispatch("userSignOut");
    },
  },
};
</script>

<style>
body {
  @apply bg-gradient-to-r from-yellow-100 to-gray-300;
}
#app {
  @apply font-sans antialiased grayscale text-center text-gray-700;
}

#nav {
  @apply p-8;
}

#nav a {
  @apply font-bold text-gray-700;
}

#nav a.router-link-exact-active {
  @apply text-green-500;
}
</style>
