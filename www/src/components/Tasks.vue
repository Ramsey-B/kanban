<template>
  <div class="tasks">
    <div class="task">
      <h4 class="task-description">{{task.description}}</h4>
      <div>
        <div class="comment" v-for='(comment, index) in task.comments'>
          <p class='task-comment'>{{comment}}
            <a @click='deleteComment(index)'>
              <font-awesome-icon class="delete" :icon="icon[1]" />
            </a>
          </p>
        </div>
        <a id="addComment" @click="addCommentToggle" v-if="!commentToggle">
          <font-awesome-icon :icon="icon[0]" />
        </a>
        <form v-on:submit.prevent="addComment(task)" v-if="commentToggle">
          <input type="text" v-model="comment" placeholder="commetz">
          <button id="newComment" class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
        </form>
      </div>
    </div>
    <button class="btn btn-primary btn-info my-btn" @click="removeTask(task)">Iz completez</button>
    <button class="btn btn-primary btn-warning my-btn" @click="toggleEdit(task)">edit</button>
    <form v-on:submit.prevent="editTask" v-if="editToggle">
      <input type="text" v-model="edit.description" placeholder="dezcrypton">
      <button class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
    </form>
    <v-tour name="taskTour" :steps="steps">
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
                <button @click="addCommentToggle" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 3">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip Tour</button>
                <button @click="addComment" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 4">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">End Tour</button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
  import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

  export default {
    name: 'Tasks',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    mounted() {
      if (this.$store.state.demo) {
          this.$tours['taskTour'].start()
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
        },
        showComments: false,
        commentToggle: false,
        comment: '',
        steps: [
          {
            target: '.tasks',  // We're using document.querySelector() under the hood
            content: `This is where the tasks appear`
          },
          {
            target: '.tasks',  // We're using document.querySelector() under the hood
            content: `Tasks can be dragged to other lists, and drag to different orders in lists.`
          },
          {
            target: '#addComment',  // We're using document.querySelector() under the hood
            content: `Here you can add comments to a task!`
          },
          {
            target: '#newComment',
            content: `Fill out the form to add a comment!`
          },
          {
            target: '.tasks',  // We're using document.querySelector() under the hood
            content: `Thanks for checking out our project! if you'd like explore more, you are more than welcome, but if you want your changes saved you must register a new account!`
          }
        ]
      }
    },
    computed: {
      tasks() {
        return this.$store.state.activeList.tasks
      },
      icon() {
        return [faPlusCircle, faTimes]
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
      },
      addCommentToggle() {
        this.commentToggle = !this.commentToggle
        if (this.$store.state.demo) {
          this.$tours['taskTour'].nextStep()
        }
      },
      addComment(task) {
        task.comments.push(this.comment)
        this.$store.dispatch('editTask', this.task)
        this.comment = ''
        this.commentToggle = !this.commentToggle
        if (this.$store.state.demo) {
          this.$tours['taskTour'].nextStep()
        }
      },
      deleteComment(index) {
        this.task.comments.splice(index, 1)
        this.$store.dispatch('editTask', this.task)
      }
    }
  }

</script>

<style>
  .task {
    display: block;
    background-color: #7dc383;
  }

  .my-btn {
    border-radius: 15px;
    margin: 2vh
  }

  .task-description {
    border-bottom: 2px solid;
  }

  .delete {
    color: red;
  }

  .comment {
    margin: 1vh 2vh 1vh 2vh;
    background: #6a9c78
  }
</style>