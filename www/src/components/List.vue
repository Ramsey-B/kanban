<template>
  <div>
    <h2>{{list.title}}</h2>
    <h4>description: {{list.description}}</h4>
    <h6>author: {{list.author}}</h6>
    <button class="btn btn-primary btn-success" @click="taskToggle">Adz Tazk</button>
    <form v-on:submit.prevent="addTask(list._id)" v-if="toggleTask">
      <input type="text" v-model="task.description" placeholder="dezcrypton">
      <input type="text" v-model="task.comment" placeholder="comment">
      <button class="btn btn-primary btn-success" type="submit">Zummitz</button>
    </form>
    <h5>Tasks</h5>
    <draggable :id="list._id" class="dragArea" v-model="tasks" :options="{draggable: '.task-item', group: 'tasks'}">
      <div v-for="task in tasks" class="task-item">
        <tasks :task="task"></tasks>
      </div>
    </draggable>
    <button class="btn btn-primary btn-info" @click='removeList(list._id)'>All donez</button>
    <button class="btn btn-primary btn-warning" @click="toggleEdit(list)">edit</button>
    <form v-on:submit.prevent="editList" v-if="editToggle">
      <input type="text" v-model="edit.title" placeholder="title">
      <input type="text" v-model="edit.description" placeholder="dezcrypton">
      <button class="btn btn-primary btn-success" type="submit">Zummitz</button>
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
        dragStartListId: '',
        dragEndListId: '',
        draggedTask: null
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
        get: function () {
          return this.$store.state.activeBoard.lists[this.index].tasks
        },
        set: function (tasks) {
          var newTasks = tasks.map(task => {
            return task.listId = this.list._id
          })
          this.list.tasks = tasks
          var list = this.list
          this.$store.dispatch('editList', list)
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
      }
    }
  }

</script>

<style>
  .list {
    background-color: #6a9c78;
    margin: 3vh;
    color: #fff1bc;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 5px #fff1bc;
  }

  .dragArea {
    min-height: 3vh
  }
</style>