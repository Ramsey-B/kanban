<template>
  <div class="add-list">
    <button @click="toggleAdd">Adz Liz</button>
    <div v-if="toggleList">
      <form v-on:submit.prevent="addList">
        <input type="text" v-model="list.title" placeholder="List title" required>
        <input type="text" v-model="list.description" placeholder="description">
        <button type="submit">Zummitz</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddList',
    data() {
      return {
        toggleList: false,
        list: {
          title: '',
          description: ''
        }
      }
    },
    computed: {},
    methods: {
      toggleAdd() {
        this.toggleList = !this.toggleList
      },
      addList() {
        var newList = this.list
        this.$store.dispatch('addList', newList)
        this.list.title = ''
        this.list.description = ''
      }
    }
  }

</script>

<style>


</style>
