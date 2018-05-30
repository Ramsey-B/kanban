<template>
  <div class="tasks">
    {{tasks}}
  </div>
</template>

<script>
  export default {
    name: 'Tasks',
    mounted() {
      this.$store.dispatch('selectList', this.$route.params.listId)
    },
    data() {
      return {

      }
    },
    computed: {
      tasks() {
        return this.$store.state.activeList.tasks
      }
    },
    methods: {}
  }

</script>

<style>


</style>
