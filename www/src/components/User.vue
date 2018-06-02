<template>
  <div class="user">
    <div class="login" v-if="showLogin">
      <h1>Loginz</h1>
      <form v-on:submit.prevent="login" class="form">
        <input class="input" type="email" name="email" placeholder=" email" id="email" v-model="user.email">
        <input class="input" type="password" name="password" placeholder=" password" id="name" v-model="user.password">
        <button type="submit">Loginz</button>
      </form>
      <br>
      <div>
      <img src="../assets/2bhu43.jpg" class="cat-login">
      </div>
      <br>
      <p class="user">Not a uzer ?
        <em @click="toggle">Regizer</em>
      </p>
    </div>
    <div class="register" v-if="!showLogin">
      <h1>Regizer</h1>
      <form v-on:submit.prevent="register">
        <input class="input" type="email" name="email" placeholder=" email" id="email" v-model="user.email">
        <input class="input" type="text" name="name" placeholder=" Name" id="name" v-model="user.displayName">
        <input class="input" type="password" name="password" placeholder=" password" id="name" v-model="user.password">
        <button type="submit">Regizer</button>
      </form>
      <p>Alredy uzer?
        <em @click="toggle">Loginz</em>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mounted(){
      this.$store.dispatch('authenticate')
    },
    data() {
      return {
        user: {
          email: '',
          displayName: '',
          password: ''
        }, 
        showLogin: true
      }
    },
    computed: {},
    methods: {
      login() {
        this.$store.dispatch('login', this.user)
      },
      register() {
        this.$store.dispatch('register', this.user)
      },
      toggle() {
        this.showLogin = !this.showLogin
      }
    }
  }

</script>

<style>
.cat-login{
  border-radius: 2rem;
  box-shadow: 5px 5px #fff1bc;
}

</style>
