<template>
  <div class="lists">
    <h2 v-if="activeBoard._id" class="board-title">{{activeBoard.title}}</h2>
    <addList></addList>
    <div class="row d-flex justify-content-center">
      <draggable v-model="lists" class="d-flex flex-row">
      <div v-if="activeBoard._id" v-for="(list, index) in lists" class="col-md-4 d-flex justify-content-around card list" :key="list._id">
        <list :list="list" :index="index"></list>
      </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import addList from './AddList'
  import draggable from 'vuedraggable'
  import list from './List'
  import router from '../router'
  export default {
    name: 'Lists',
    components: {
      addList,
      list,
      draggable,
      router
    },
    mounted() {
      this.$store.dispatch('selectBoard', this.$route.params.id)
      if(!this.$store.state.user._id){
        router.push({name: 'User'})
      }
    },
    data() {
      return {
      }
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      },
      lists: {
        get: function() {
          return this.$store.state.activeBoard.lists
        },
        set: function(lists) {
          this.editBoard(lists)
        }
      }
    },
    methods: {
      editBoard(lists) {
        this.activeBoard.lists = lists
        var board = this.activeBoard
        this.$store.dispatch('editBoard', board)
      }
    }
  }

</script>

<style>
  .board-title {
    display: inline;
    border-bottom: 2px solid;
  }
</style>