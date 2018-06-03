<template>
  <div class="tasks">
    <div class="task">
      <h4 class="task-description">{{task.description}}</h4>
      <p class='task-comment'>{{task.comment}}</p>
    </div>
    <button class="btn btn-danger my-btn" @click="removeTask(task)">Iz completez</button>
    <a class="edit" @click="toggleEdit(task)" style="color: #5cb85c">
        <font-awesome-icon icon="edit" />
    </a>
    <form v-on:submit.prevent="editTask" v-if="editToggle">
      <input type="text" v-model="edit.description" placeholder="description">
      <input type="text" v-model="edit.comment" placeholder="comment">
      <button class="btn btn-primary my-btn" type="submit">Zummitz</button>
    </form>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

  export default {
    name: 'Tasks',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    components: {
      FontAwesomeIcon
    },
    data() {
      return {
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
      removeTask(task) {
        this.$store.dispatch('deleteTask', task)
      },
      toggleEdit(task) {
        this.edit.description = task.description
        this.edit.comment = task.comment
        this.edit._id = task._id
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
  .task {
    display: block;
  }

  .task:hover .task-comment {
    display: block;
  }

  .task-comment {
    display: none;
  }
  .my-btn {
    border-radius: 15px;
    margin: 2vh
  }
  .task-description {
    border-bottom: 2px solid;
  }
</style>