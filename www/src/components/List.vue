<template>
  <div>
    <h2 class="list-title">{{list.title}}</h2>
    <h4>description: {{list.description}}</h4>
    <h6>author: {{list.author}}</h6>
    <button class="btn btn-primary btn-success my-btn" id="addTask" @click="taskToggle">Adz Tazk</button>
    <form v-on:submit.prevent="addTask(list._id)" v-if="toggleTask">
      <input type="text" v-model="task.description" placeholder="dezcrypton">
      <button id="submitTask" class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
    </form>
    <h5>Taskz</h5>
    <draggable :id="list._id" class="dragArea" v-model="tasks" :options="{draggable: '.task-item', group: 'tasks'}">
      <div v-for="task in tasks" class="task-item">
        <tasks :task="task"></tasks>
      </div>
    </draggable>
    <button id="removeList" class="btn btn-primary btn-info my-btn" @click='removeList(list._id)'>All donez</button>
    <button id="editList" class="btn btn-primary btn-warning my-btn" @click="toggleEdit(list)">edit</button>
    <form v-on:submit.prevent="editList" v-if="editToggle">
      <input type="text" v-model="edit.title" placeholder="title">
      <input type="text" v-model="edit.description" placeholder="dezcrypton">
      <button class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
    </form>
    <v-tour name="listTour" :steps="steps">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step v-if="tour.currentStep === index" v-for="(step, index) of tour.steps" :key="index" :step="step" :previous-step="tour.previousStep"
            :next-step="tour.nextStep" :stop="tour.stop" :isFirst="tour.isFirst" :isLast="tour.isLast">
            <template v-if="tour.currentStep === 0">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip Tour</button>
                <button @click="tour.nextStep" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 1">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip Tour</button>
                <button @click="tour.nextStep" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 2">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip Tour</button>
                <button @click="taskToggle" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 3">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip Tour</button>
                <button @click="tour.stop" class="btn btn-primary">Next step</button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
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
        draggedTask: null,
        steps: [
          {
            target: '#editList',  // We're using document.querySelector() under the hood
            content: `This button displays a form so you can edit a list`
          },
          {
            target: '#removeList',  // We're using document.querySelector() under the hood
            content: `You can click here to remove a list`
          },
          {
            target: '#addTask',  // We're using document.querySelector() under the hood
            content: `click this button to display the add task form!`
          },
          {
            target: '#submitTask',  // We're using document.querySelector() under the hood
            content: `fill out the form to submit a new task!`
          },
        ]
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
        if (this.$store.state.demo) {
          this.$tours['listTour'].nextStep()
        }
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
        if (this.$store.state.demo) {
          this.$tours['listTour'].stop()
        }
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
    min-height: 3vh;
    background-color: #8aae92;
    margin: 3vh;
    color: #fff1bc;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 5px #446e5c;
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