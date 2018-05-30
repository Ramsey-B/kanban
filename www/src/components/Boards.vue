<template>
  <div class="boards">
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{ name: 'Lists', params: { id: board._id }}">
        <h2>{{board.title}}</h2>
        <h4>description: {{board.description}}</h4>
        <h5>lists: {{board.lists.length}}</h5>
        <h6>author: {{board.author}}</h6>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Boards',
    mounted() {
      this.$store.dispatch('getBoards')
    },
    data() {
      return {

      }
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {}
  }

</script>

<style>
</style>