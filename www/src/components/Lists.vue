<template>
  <div class="lists">
    <div v-for="list in lists" :key="list._id">
      <router-link :to="{ name: 'Tasks', params: { listId: list._id }}">
        <h2>{{list.title}}</h2>
        <h4>description: {{list.description}}</h4>
        <h5>tasks: {{list.tasks.length}}</h5>
        <h6>author: {{list.author}}</h6>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Lists',
    mounted() {
      this.$store.dispatch('selectBoard', this.$route.params.id)
    },
    data() {
      return {
      }
    },
    computed: {
      lists() {
        return this.$store.state.activeBoard.lists
      }
    },
    methods: {}
  }

</script>

<style>
</style>