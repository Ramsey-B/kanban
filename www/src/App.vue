<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav class="navbar navbar-light top-header">
      <div>
        <img height="100" src="./assets/nyancatballoon.gif">
        <router-link @click.native="toggleTour" :to="{ name: 'Home'}" class="navbar-brand">
          <a>Hom</a>
        </router-link>
      </div>
      <div class="d-flex justify-content-center">
        <h1>KanzBanz</h1>
      </div>
      <div class="d-flex justify-content-end">
        <div class="d-flex flex-column">
          <button class="btn btn-success" @click="startDemo" v-if="!user._id">Demo</button>
          <a class="navbar-brand" @click="login" v-if="!(user._id)">Zign In/Loginz</a>
        </div>
        <div v-if="user._id" class="d-flex flex-column">
          <img height="50
            " src="./assets/Pikanyan.gif">
          <a class="navbar-brand">Uzer: {{user.displayName}}</a>
          <a class="navbar-brand" @click="signOut">Zign out</a>
        </div>
      </div>
    </nav>
    <router-view/>
    <div class="row">
      <div class="col-12 footer">
        <h4 id="created" class="mt-2">Created by </h4>
        <div class="d-flex flex-row justify-content-center">
          <div class="mr-2">
            <h4>Madelline Butcher </h4>
            <div class="d-flex flex-row justify-content-center">
              <a href="https://github.com/madellinebutcher" target="_blank"><h4 class="mr-1"><font-awesome-icon :icon="icon[0]" /></h4></a>
              <a href="http://linkedin.com/in/madelline-butcher-062a2b149" target="_blank"><h4 class="mr-1"><font-awesome-icon :icon="icon[1]" /></h4></a>
            </div>
          </div>
          <h4> & </h4>
          <div class="ml-2 mr-5">
            <h4>Ramsey Bland</h4>
            <div class="d-flex flex-row justify-content-center">
              <a href="https://ramsey-b.github.io/" target="_blank"><h4 class="mr-1"><font-awesome-icon :icon="icon[0]" /></h4></a>
              <a href="https://www.linkedin.com/in/ramsey-b/" target="_blank"><h4 class="mr-1"><font-awesome-icon :icon="icon[1]" /></h4></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
  import githubSquare from '@fortawesome/fontawesome-free-brands/faGithubSquare'
  import linkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'

  export default {
    name: 'App',
    computed: {
      user() {
        return this.$store.state.user
      },
      icon() {
        return [githubSquare, linkedin]
      }
    },
    created() {
      window.addEventListener('beforeunload', () => {
        if (this.$store.state.user.email == 'demo@demo.com') {
          this.$store.dispatch('endDemo')
        }
      })
    },
    components: {
      FontAwesomeIcon
    },    
    methods: {
      login() {
        this.$router.push({ name: 'User' })
      },
      signOut() {
        if (this.$store.state.user.email = 'demo@demo.com') {
          this.$store.dispatch('endDemo')
        }
        this.$store.dispatch('signOut')
      },
      startDemo() {
        this.$store.dispatch('startDemo')
      },
      toggleTour() {
        if (this.$store.state.demo) {
          this.$store.dispatch('toggleDemo')
        }
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Chewy', cursive;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
    text-align: center;
    color: #fff1bc;
    /* background-color: #446e5c;
    background-size: cover; */
    padding: 0;
    margin: 0;

    top: 0;
    left: 0;

    max-width: 100%;
    max-height: 100%;

    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /* margin-top: 60px; */
  }
  .footer {
    background:  #8aae92;
    float: bottom;
  }
  #created {
    margin: auto
  }
</style>