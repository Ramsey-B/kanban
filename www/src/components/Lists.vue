<template>
  <div class="lists">
    <h2 v-if="activeBoard._id">{{activeBoard.title}}</h2>
    <img height="150" src="../assets/nyancatr.gif">
    <addList></addList>
    <div class="row d-flex justify-content-center">
      <draggable v-model="lists" class="d-flex flex-row">
      <div v-if="activeBoard._id" v-for="(list, index) in lists" class="col-md-4 d-flex justify-content-around card list" :key="list._id">
        <list :list="list" :index="index"></list>
      </div>
      </draggable>
      <img height="100" src="../assets/pusheenramen.gif">
      <img height="100" src="../assets/pusheencheetos.gif">
      <img height="100" src="../assets/pusheencookie.gif">
      <img height="100" src="../assets/pusheenicecream.gif">
      <img height="100" src="../assets/pusheenpizza.gif">
      <img height="100" src="../assets/pusheensushi.gif">
      <img height="100" src="../assets/pikapusheen.gif">
      <img height="100" src="../assets/pusheendragon.gif">
      <img height="100" src="../assets/pusheencatniss.gif">
      <img height="100" src="../assets/pusheenhp.gif">
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