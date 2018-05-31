<template>
  <div class="list">
    <h2>{{list.title}}</h2>
    <h4>description: {{list.description}}</h4>
    <h6>author: {{list.author}}</h6>
    <button @click="taskToggle">Add Task</button>
    <form v-on:submit.prevent="addTask(list._id)" v-if="toggleTask">
      <input type="text" v-model="task.description">
      <input type="text" v-model="task.comment">
      <button type="submit">submit</button>
    </form>
    <h5>Tasks</h5>
    <div v-for="task in list.tasks" :key="task._id">
      <p>{{task.description}}</p>
    </div>
    <button @click='removeList(list._id)'>All donez</button>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: {
      list: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        toggleTask: false,
        task: {
          comment: '',
          description: ''
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.activeBoard.lists
      },
      activeBoard() {
        return this.$store.state.activeBoard
      }
    },
    methods: {
      taskToggle() {
        this.toggleTask = !this.toggleTask
      },
      addTask(id) {
        this.task['listId'] = id
        var newTask = {
          comment: this.task.comment,
          description: this.task.description,
          listId: id
        }
        this.$store.dispatch('addTask', newTask)
        this.task.description = ''
        this.task.comment = ''
        this.task.listId = ''
        this.toggleTask = !this.toggleTask
      },
      removeList(id){

      } 
    }
  }

</script>

<style>
</style>