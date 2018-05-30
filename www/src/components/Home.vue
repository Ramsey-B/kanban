<template>
  <div class="">
    <boards></boards>
  </div>
</template>

<script>
  import router from '../router'
  import boards from './Boards'
  export default {
    components: {
      boards
    },
    name: 'Home',
    mounted(){
      if(!this.$store.state.user){
        router.push({name: 'User'})
      }
    },
    data() {
      return {

      }
    },
    computed: {},
    methods: {}
  }

</script>

<style>


</style>
