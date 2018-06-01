<template>
  <div>
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
    <draggable :move="onMove">
      <div v-for="task in tasks">
        <tasks :task="task"></tasks>
      </div>
    </draggable>
    <button @click='removeList(list._id)'>All donez</button>
    <button @click="toggleEdit(list)">edit</button>
    <form v-on:submit.prevent="editList" v-if="editToggle">
      <input type="text" v-model="edit.title">
      <input type="text" v-model="edit.description">
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
  import tasks from './Tasks'
  import draggable from 'vuedraggable'
  export default {
    name: 'List',
    components: {
      tasks,
      draggable
    },
    props: {
      list: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        toggleTask: false,
        editToggle: false,
        task: {
          comment: '',
          description: ''
        },
        edit: {
          title: '',
          description: '',
          _id: ''
        },
        draggedTask: ''
      }
    },
    computed: {
      lists() {
        return this.$store.state.activeBoard.lists
      },
      activeBoard() {
        return this.$store.state.activeBoard
      },
      tasks: {
        get: function() {
          return this.$store.state.activeBoard.lists[this.index].tasks
        },
        set: function() {

        }
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
      removeList(id) {
        this.$store.dispatch('deleteList', id)
      },
      toggleEdit(list) {
        this.edit.title = list.title
        this.edit.description = list.description
        this.edit._id = list._id
        this.editToggle = !this.editToggle
      },
      editList() {
        this.$store.dispatch('editList', this.edit)
        this.editToggle = !this.editToggle
      },
      onMove(e, o){
        if (!this.draggedTask) {
					this.draggedTask = e.draggedContext.element;
				}
      },
      onEnd() {
        debugger
      }
    }
  }

</script>

<style>
  .list {
    background-color: #333399;
    margin: 3vh;
    color: white;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px #14143b;
  }
</style>