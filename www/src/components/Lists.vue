<template>
  <div class="lists">
    <h2>{{activeBoard.title}}</h2>
    <addList></addList>
    <div v-for="list in lists" :key="list._id">
      <list :list="list"></list>
    </div>
  </div>
</template>

<script>
  import addList from './AddList'
  import list from './List'
  export default {
    name: 'Lists',
    components: {
      addList,
      list
    },
    mounted() {
      this.$store.dispatch('selectBoard', this.$route.params.id)
    },
    data() {
      return {
      }
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.activeBoard.lists
      }
    },
    methods: {
    }
  }

</script>

<style>
</style>