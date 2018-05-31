<template>
  <div class="add-list">
    <button @click="toggleAdd">Add Lists</button>
    <div v-if="toggleList">
      <form v-on:submit.prevent="addList">
        <input type="text" v-model="list.title">
        <input type="text" v-model="list.description">
        <button type="submit">Submit</button>
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
        this.$store.dispatch('addList', this.list)
      }
    }
  }

</script>

<style>


</style>
