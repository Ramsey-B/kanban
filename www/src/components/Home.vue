<template>
  <div class="">

  </div>
</template>

<script>
  export default {
    name: '',
    mounted(){
      if(!this.$store.state.user._id){
        router.push({name: 'login'})
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
