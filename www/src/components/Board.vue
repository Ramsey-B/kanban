<template>
  <div>
    <router-link :to="{ name: 'Lists', params: { id: board._id }}">
      <h2>{{board.title}}</h2>
      <h4>description: {{board.description}}</h4>
      <h5>lists: {{board.lists.length}}</h5>
      <h6>author: {{board.author}}</h6>
    </router-link>
    <button @click="removeBoard(board._id)">Detlz itz</button>
    <button @click="toggleEdit(board)">edit</button>
    <form v-if='editBoard' v-on:submit.prevent="changeBoard">
      <input type="text" v-model="edit.title">
      <input type="text" v-model="edit.description">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Board',
    props: {
      board: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editBoard: false,
        edit: {
          title: '',
          description: '',
          _id: ''
        }
      }
    },
    computed: {},
    methods: {
      removeBoard(id) {
        this.$store.dispatch('deleteBoard', id)
      },
      toggleEdit(board) {
        this.edit.title = board.title
        this.edit.description = board.description
        this.edit._id = board._id
        this.editBoard = !this.editBoard
      },
      changeBoard() {   
        this.$store.dispatch('editBoard', this.edit)
        this.edit = !this.edit
      }
    }
  }
</script>

<style>
</style>