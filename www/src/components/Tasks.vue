<template>
  <div class="tasks">
    <div class="task">
      <a @click="toggleComments">
        <h4 class="task-description">{{task.description}}</h4>
      </a>
      <div v-if="showComments">
        <div class="comment">
          <p class='task-comment' v-for='(comment, index) in task.comments'>{{comment}}  
            <a @click='deleteComment(index)'>
              <font-awesome-icon class="delete" :icon="icon[1]" />
            </a>
          </p>
        </div>
        <a @click="addCommentToggle" v-if="!commentToggle">
          <font-awesome-icon :icon="icon[0]" />
        </a>
        <form v-on:submit.prevent="addComment(task)" v-if="commentToggle">
          <input type="text" v-model="comment" placeholder="commetz">
          <button class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
        </form>
      </div>
    </div>
    <button class="btn btn-primary btn-info my-btn" @click="removeTask(task)">Iz completez</button>
    <button class="btn btn-primary btn-warning my-btn" @click="toggleEdit(task)">edit</button>
    <form v-on:submit.prevent="editTask" v-if="editToggle">
      <input type="text" v-model="edit.description" placeholder="dezcrypton">
      <button class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
    </form>
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
        comment: ''
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
      toggleComments() {
        this.showComments = !this.showComments
      },
      addCommentToggle() {
        this.commentToggle = !this.commentToggle
      },
      addComment(task) {
        task.comments.push(this.comment)
        this.$store.dispatch('editTask', this.task)
        this.comment = ''
        this.commentToggle = !this.commentToggle
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
    margin: 2vh;
    background: #6a9c78
  }
</style>