<template>
  <div class="tasks">
    <p>{{task.description}}</p>
    <button @click="commentToggle">Add</button>
    <form v-on:submit.prevent="addComment" v-if="toggleComment">
      <input type="text" v-model="comment">
      <button type="submit">submit</button>
    </form>
    <button @click="removeTask(task)">Iz completez</button>
  </div>
</template>

<script>
  export default {
    name: 'Tasks',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
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
      },
      removeTask(task) {
        this.$store.dispatch('deleteTask', task)
      }
    }
  }

</script>

<style>
</style>