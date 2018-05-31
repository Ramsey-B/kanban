<template>
  <div class="tasks">
    <div v-for="task in tasks" :key="task._id">
      <p>{{task.description}}
        <button @click="commentToggle">Add</button>
      </p>
      <form v-on:submit.prevent="addComment" v-if="toggleComment">
        <input type="text" v-model="comment">
        <button type="submit">submit</button>
      </form>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'Tasks',
    data() {
      return {
        toggleComment: false
      }
    },
    computed: {
      tasks() {
        return this.$store.state.activeList.tasks
      }
    },
    methods: {
      commentToggle() {
        this.toggleComment = !this.toggleComment
      }
    }
  }

</script>

<style>
</style>