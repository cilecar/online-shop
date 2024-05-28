<template>
    <div>
      <h1>Protected Page</h1>
      <p v-if="user">Welcome, {{ user.name }}</p>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters(['getUser']),
      user() {
        return this.getUser
      }
    }
  }
  </script>
  