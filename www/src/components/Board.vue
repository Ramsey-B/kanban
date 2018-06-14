<template>
  <div id="boards">
    <router-link :to="{ name: 'Lists', params: { id: board._id }}">
      <h2 class="board-title">{{board.title}}</h2>
      <h4>description: {{board.description}}</h4>
      <h5>lists: {{board.lists.length}}</h5>
      <h6>author: {{board.author}}</h6>
    </router-link>
    <button id="removeBoard" class="btn btn-primary btn-danger my-btn" @click="removeBoard(board._id)">Deletz itz</button>
    <button id="editBoard" class="btn btn-primary btn-warning my-btn" @click="toggleEdit(board)">edit</button>
    <form v-if='editBoard' v-on:submit.prevent="changeBoard">
      <input type="text" v-model="edit.title" placeholder="title">
      <input type="text" v-model="edit.description" placeholder="dezcrypton">
      <button class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
    </form>
    <v-tour name="boardTour" :steps="steps">
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
                <button @click="tour.stop" class="btn btn-danger">Skip tour</button>
                <button @click="tour.nextStep" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 2">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip Tour</button>
                <button @click="tour.nextStep" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 3">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip tour</button>
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
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

  export default {
    name: 'Board',
    props: {
      board: {
        type: Object,
        required: true
      }
    },
    components: {
      FontAwesomeIcon
    },
    mounted() {
      if (this.$store.state.demo) {
        this.$tours['boardTour'].start()
      }
    },
    data() {
      return {
        editBoard: false,
        edit: {
          title: '',
          description: '',
          _id: ''
        },
        steps: [
          {
            target: '#boards',  // We're using document.querySelector() under the hood
            content: `This is where your boards will appear!`
          },
          {
            target: '#editBoard',
            content: 'This button displays a form to edit a board.'
          },
          {
            target: '#removeBoard',
            content: 'This button will delete a board.'
          },
          {
            target: '.board-title',
            content: 'Now click the text to get the full board view!'
          }
        ]
      }
    },
    computed: {},
    methods: {
      removeBoard(id) {
        this.$store.dispatch('deleteBoard', id)
      },
      toggleEdit(board) {
        this.edit.title = board.title
        this.edit.description = board.description
        this.edit._id = board._id
        this.editBoard = !this.editBoard
      },
      changeBoard() {
        this.$store.dispatch('editBoard', this.edit)
        this.edit = !this.edit
      }
    }
  }
</script>

<style>
  .my-btn {
    border-radius: 15px;
    margin: 2vh
  }

  .board-title {
    border-bottom: 2px solid;
  }

  a {
    color: #fff1bc;
  }
</style>