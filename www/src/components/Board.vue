<template>
  <div>
    <router-link :to="{ name: 'Lists', params: { id: board._id }}">
      <h2 class="board-title">{{board.title}}</h2>
      <h4>description: {{board.description}}</h4>
      <h5>lists: {{board.lists.length}}</h5>
      <h6>author: {{board.author}}</h6>
    </router-link>
    <button class="btn btn-danger my-btn" @click="removeBoard(board._id)">Deletz itz</button>
    <a class="edit" @click="toggleEdit(board)" style="color: #5cb85c"><font-awesome-icon icon="edit"/></a>
    <form v-if='editBoard' v-on:submit.prevent="changeBoard">
      <input type="text" v-model="edit.title" placeholder="title">
      <input type="text" v-model="edit.description" placeholder="description">
      <button class="btn btn-primary my-btn" type="submit">Zummitz</button>
    </form>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

  export default {
    name: 'Board',
    props: {
      board: {
        type: Object,
        required: true
      }
    },
    components: {
      FontAwesomeIcon
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
  .my-btn {
    border-radius: 15px;
    margin: 2vh
  }
  .board-title {
    border-bottom: 2px solid;
  }
</style>