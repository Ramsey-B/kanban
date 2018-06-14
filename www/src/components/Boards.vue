<template>
  <div class="boards">
    <div>
      <img height="250" src="../assets/2bjin2.jpg" class="addboardpic">
    </div>
    <button id="addBoard" class="btn btn-primary btn-success my-btn" @click="toggleAdd">Adz Bordz</button>
    <form v-if="toggleBoard" v-on:submit.prevent="addBoard" id="boardForm">
      <input type="text" class="input" name=text placeholder="Title" id="b-title" v-model="board.title">
      <input type="text" class="input" name=text placeholder="Dezcrypton" id="b-title" v-model="board.description">
      <button class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
    </form>
    <div class="row d-flex justify-content-center">
      <div class="col-md-3 col-sm-12 card d-flex justify-content-around board" id="boards" v-for="board in boards" :key="board._id">
        <board :board="board" class="clickBoard"></board>
      </div>
    </div>
    <v-tour name="boardsTour" :steps="steps">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step v-if="tour.currentStep === index" v-for="(step, index) of tour.steps" :key="index" :step="step" :previous-step="tour.previousStep"
            :next-step="tour.nextStep" :stop="tour.stop" :isFirst="tour.isFirst" :isLast="tour.isLast">
            <template v-if="tour.currentStep === 0">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Skip Tour</button>
                <button @click="toggleAdd()" class="btn btn-primary">Next step</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 1">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">end tour</button>
                <button @click="addBoard" class="btn btn-primary">Next step</button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
  import board from './Board'
  import router from '../router'

  export default {
    name: 'Boards',
    components: {
      board
    },
    mounted() {
      if (!this.$store.state.user._id && !this.$store.state.demo) {
        router.push({ name: 'User' })
      } else if (this.$store.state.demo) {
        this.$tours['boardsTour'].start()
      }
      this.$store.dispatch('getBoards')
    },
    data() {
      return {
        toggleBoard: false,
        board: {
          title: '',
          description: ''
        },
        steps: [
          {
            target: '#addBoard',  // We're using document.querySelector() under the hood
            content: `To get started, we need to create some boards! Click the "Adz Bordz" button to continue!`
          },
          {
            target: '#boardForm',
            content: 'Great! Fill out the fields to start your first board!'
          }
        ]
      }
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      toggleAdd() {
        this.toggleBoard = !this.toggleBoard
        if (this.$store.state.demo) {
          this.$tours['boardsTour'].nextStep()
        }
      },
      addBoard() {
        var newBoard = {
          title: this.board.title,
          description: this.board.description
        }
        this.$store.dispatch('addBoard', newBoard)
        this.board.title = ''
        this.board.description = ''
        this.toggleBoard = !this.toggleBoard
        if (this.$store.state.demo) {
          this.$tours['boardsTour'].stop()
        }
      }
    }
  }

</script>

<style>
  .board {
    background-color: #6a9c78;
    margin: 3vh;
    color: #fff1bc;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 5px #fff1bc;
  }

  .addboardpic {
    border-radius: 2rem;
    box-shadow: 5px 5px #fff1bc;
  }

  .my-btn {
    border-radius: 15px;
    margin: 2vh
  }
</style>