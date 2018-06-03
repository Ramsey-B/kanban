<template>
  <div class="boards">
    <button @click="toggleAdd">Adz Bordz</button>
    <form v-if="toggleBoard" v-on:submit.prevent="addBoard">
      <input type="text" class="input" name=text placeholder="Title" id="b-title" v-model="board.title">
      <input type="text" class="input" name=text placeholder="Dezcrypton" id="b-title" v-model="board.description">
      <button type="submit">Zummitz</button>
    </form>
    <div class="row d-flex justify-content-center">
      <div class="col-md-3 col-sm-12 card d-flex justify-content-around board" v-for="board in boards" :key="board._id">
        <board :board="board"></board>
      </div>
    </div>
  </div>
</template>

<script>
  import board from './Board'
  import router from '../router'
  export default {
    name: 'Boards',
    components: {
      board
    },
    mounted() {
      this.$store.dispatch('getBoards')
      if(!this.$store.state.user._id){
        router.push({name: 'User'})
      }
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
  .board {
    background-color: #333399;
    margin: 3vh;
    color: white;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px #14143b;
  }
</style>