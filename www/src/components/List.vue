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
    <draggable :id="list._id" class="dragArea" v-model="tasks" :options="{draggable: '.task-item', group: 'tasks'}" :move="onMove">
      <div v-for="task in tasks" class="task-item">
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
        set: function () {
          var task = {
          startList: this.dragStartListId,
          endList: this.dragEndListId,
          task: this.draggedTask
        }
        this.$store.dispatch('moveTask', task)
        this.dragEndListId = ''
        this.draggedTask = null
        this.dragStartListId = ''
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
      onMove(e, o) {
        if (!this.draggedTask) {
          this.draggedTask = e.draggedContext.element;
        }
        if (!e.relatedContext || !e.relatedContext.element) {
          if (e.to.id != e.from.id) {
            if (!this.dragStartListId)
              this.dragStartListId = e.from.id;
            e.draggedContext.element.listId = e.to.id
            this.dragEndListId = e.to.id;
          }
        } else {
          if (!this.dragStartListId)
            this.dragStartListId = e.draggedContext.element.listId;
          e.draggedContext.element.listId = e.relatedContext.element.listId
          this.dragEndListId = e.relatedContext.element.listId
        }
      },
      moveTask() {
        
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
    min-height: 3vh
  }
</style>