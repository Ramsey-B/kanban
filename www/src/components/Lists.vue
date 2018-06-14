<template>
  <div class="lists">
    <img height="125" src="../assets/nyancatr.gif">
    <h2 v-if="activeBoard._id">{{activeBoard.title}}</h2>
    <addList></addList>
    <div>
      <draggable v-model="lists" class="row d-flex justify-content-center" id="list">
        <div v-if="activeBoard._id" v-for="(list, index) in lists" class="col-3 d-flex justify-content-around card list" :key="list._id">
          <list :list="list" :index="index"></list>
        </div>
      </draggable>
      <img height="100" src="../assets/pusheenramen.gif">
      <img height="100" src="../assets/pusheencheetos.gif">
      <img height="100" src="../assets/pusheencookie.gif">
      <img height="100" src="../assets/pusheenicecream.gif">
      <img height="100" src="../assets/pusheenpizza.gif">
      <img height="100" src="../assets/pusheensushi.gif">
      <img height="100" src="../assets/pikapusheen.gif">
      <img height="100" src="../assets/pusheendragon.gif">
      <img height="100" src="../assets/pusheencatniss.gif">
      <img height="100" src="../assets/pusheenhp.gif">
    </div>
    <v-tour name="listsTour" :steps="steps">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step v-if="tour.currentStep === index" v-for="(step, index) of tour.steps" :key="index" :step="step" :previous-step="tour.previousStep"
            :next-step="tour.nextStep" :stop="tour.stop" :isFirst="tour.isFirst" :isLast="tour.isLast">
            <template v-if="tour.currentStep === 0">
              <div slot="actions">
                <button @click="tour.stop" class="btn btn-danger">Dismiss</button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
  import addList from './AddList'
  import draggable from 'vuedraggable'
  import list from './List'
  import router from '../router'

  export default {
    name: 'Lists',
    components: {
      addList,
      list,
      draggable,
      router
    },
    mounted() {
      this.$store.dispatch('selectBoard', this.$route.params.id)
      if (!this.$store.state.user._id && !this.$store.state.demo) {
        router.push({ name: 'User' })
      } else if (this.$store.state.demo) {
        this.$tours['addListTour'].start()
      }
    },
    data() {
      return {
        steps: [
          {
            target: '#list',  // We're using document.querySelector() under the hood
            content: `Great! now we have a new list! Try dragging the list around now (you will need multiple lists to do this.).`,
            params: {
              placement: 'top'
            }
          },
        ]
      }
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      },
      lists: {
        get: function () {
          return this.$store.state.activeBoard.lists
        },
        set: function (lists) {
          if (this.$store.state.demo) {
            this.$tours['listTour'].start()
            this.$tours['listsTour'].stop()
          }
          this.editBoard(lists)
        }
      }
    },
    methods: {
      editBoard(lists) {
        this.activeBoard.lists = lists
        var board = this.activeBoard
        this.$store.dispatch('editBoard', board)
      }
    }
  }

</script>

<style>
  .board-title {
    display: inline;
    border-bottom: 2px solid;
  }
</style>