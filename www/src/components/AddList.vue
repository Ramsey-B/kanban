<template>
  <div class="add-list">
    <button id="addList" class="btn btn-primary btn-success my-btn" @click="toggleAdd">Adz Liz</button>
    <div v-if="toggleList">
      <form v-on:submit.prevent="addList">
        <input type="text" v-model="list.title" placeholder="Liz Title" required>
        <input type="text" v-model="list.description" placeholder="Dezcrypton">
        <button id="newList" class="btn btn-primary btn-success my-btn" type="submit">Zummitz</button>
      </form>
    </div>
    <v-tour name="addListTour" :steps="steps">
        <template slot-scope="tour">
            <transition name="fade">
              <v-step v-if="tour.currentStep === index" v-for="(step, index) of tour.steps" :key="index" :step="step" :previous-step="tour.previousStep"
                :next-step="tour.nextStep" :stop="tour.stop" :isFirst="tour.isFirst" :isLast="tour.isLast">
                <template v-if="tour.currentStep === 0">
                  <div slot="actions">
                    <button @click="tour.stop" class="btn btn-primary">Skip Tour</button>
                    <button @click="toggleAdd()" class="btn btn-primary">Next step</button>
                  </div>
                </template>
                <template v-if="tour.currentStep === 1">
                    <div slot="actions">
                      <button @click="tour.stop" class="btn btn-primary">Skip Tour</button>
                      <button @click="addList" class="btn btn-primary">Next step</button>
                    </div>
                  </template>
              </v-step>
            </transition>
          </template>
    </v-tour>
  </div>
</template>

<script>
  export default {
    name: 'AddList',
    mounted() {
      if (this.$store.state.demo) {
        this.$tours['addListTour'].start()
      }
    },
    data() {
      return {
        toggleList: false,
        list: {
          title: '',
          description: ''
        },
        steps: [
          {
            target: '#addList',  // We're using document.querySelector() under the hood
            content: `This is just like before, let's add a list!`,
            params: {
              placement: 'top'
            }
          },
          {
            target: '#newList',  // We're using document.querySelector() under the hood
            content: `Fill out the form, only the title is required`,
            params: {
              placement: 'right'
            }
          }
        ]
      }
    },
    computed: {},
    methods: {
      toggleAdd() {
        this.toggleList = !this.toggleList
        if (this.$store.state.demo) {
          this.$tours['addListTour'].nextStep()
        }
      },
      addList() {
        if (this.$store.state.demo) {
          this.$tours['listsTour'].start()
          this.$tours['addListTour'].stop()
        }
        var newList = {
          title: this.list.title,
          description: this.list.description
        }
        this.$store.dispatch('addList', newList)
        this.list.title = ''
        this.list.description = ''
      }
    }
  }

</script>

<style>
  .my-btn {
    border-radius: 15px;
    margin: 2vh
  }
  .addListTour {
    background: red;
  }
</style>