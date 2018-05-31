<template>
  <div class="boards">
    <button @click="toggleAdd">Adz Bordz</button>
    <form v-if="toggleBoard" v-on:submit.prevent="addBoard">
      <input type="text" v-model="board.title">
      <input type="text" v-model="board.description">
      <button type="submit">Submit</button>
    </form>
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
        toggleBoard: false,
        board: {
          title: '',
          description: ''
        }
      }
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      toggleAdd() {
        this.toggleBoard = !this.toggleBoard
      },
      addBoard() {
        var newBoard = {
          title: this.board.title,
          description: this.board.description
        }
        this.$store.dispatch('addBoard', newBoard)
        this.board.title = ''
        this.board.description = ''
        this.toggleBoard = !this.toggleBoard
      }
    }
  }

</script>

<style>
</style>