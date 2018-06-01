<template>
  <div class="tasks">
    <p>{{task.description}}</p>
    <p>{{task.comment}}</p>
    <button @click="commentToggle">Add</button>
    <form v-on:submit.prevent="addComment" v-if="toggleComment">
      <input type="text" v-model="comment">
      <button type="submit">submit</button>
    </form>
    <button @click="removeTask(task)">Iz completez</button>
    <button @click="toggleEdit(task)">edit</button>
    <form v-on:submit.prevent="editTask" v-if="editToggle">
      <input type="text" v-model="edit.description">
      <input type="text" v-model="edit.comment">
      <button type="submit">submit</button>
    </form>
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
        toggleComment: false,
        editToggle: false,
        edit: {
          description: '',
          comment: '',
          listId: '',
          _id: ''
        }
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
      },
      toggleEdit(task) {
        this.edit.description = task.description
        this.edit.comment = task.comment
        this.edit._id = task._id
        debugger
        this.edit.listId = task.listId
        this.editToggle = !this.editToggle
      },
      editTask() {
        this.$store.dispatch('editTask', this.edit)
        this.editToggle = !this.editToggle
      }
    }
  }

</script>

<style>
</style>