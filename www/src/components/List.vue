<template>
  <div>
    <h2 class="list-title">{{list.title}}</h2>
    <h4>description: {{list.description}}</h4>
    <h6>author: {{list.author}}</h6>
    <div class="tasks-box">
      <button class="btn btn-primary my-btn" @click="taskToggle">Adz Tazk</button>
      <form v-on:submit.prevent="addTask(list._id)" v-if="toggleTask">
        <input type="text" v-model="task.description" placeholder="description">
        <input type="text" v-model="task.comment" placeholder="comment">
        <button class="btn btn-primary my-btn" type="submit">Zummitz</button>
      </form>
      <h5>Tasks</h5>
      <draggable :id="list._id" class="dragArea" v-model="tasks" :options="{draggable: '.task-item', group: 'tasks'}">
        <div v-for="task in tasks" class="task-item">
          <tasks :task="task"></tasks>
        </div>
      </draggable>
    </div>
    <button class="btn btn-danger my-btn" @click='removeList(list._id)'>All donez</button>
    <a class="edit" @click="toggleEdit(list)" style="color: #5cb85c">
      <font-awesome-icon icon="edit" />
    </a>
    <form v-on:submit.prevent="editList" v-if="editToggle">
      <input type="text" v-model="edit.title" placeholder="title">
      <input type="text" v-model="edit.description" placeholder="description">
      <button class="btn btn-primary my-btn" type="submit">Zummitz</button>
    </form>
  </div>
</template>

<script>
  import tasks from './Tasks'
  import draggable from 'vuedraggable'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

  export default {
    name: 'List',
    components: {
      tasks,
      draggable,
      FontAwesomeIcon
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
    background-color: #333399;
    margin: 3vh;
    color: white;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px #14143b;
  }

  .dragArea {
    min-height: 3vh;
    background-color: #336699;
    margin: 3vh;
    color: white;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px #14143b;
  }

  .my-btn {
    border-radius: 15px;
    margin: 2vh
  }

  .tasks-box {
    background-color: #993333;
    margin: 3vh;
    color: white;
    border: 1px solid;
  }
  .list-title {
    border-bottom: 2px solid;
  }
</style>