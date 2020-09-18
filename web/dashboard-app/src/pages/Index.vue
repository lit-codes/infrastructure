<template>
  <q-page class=" content-start q-pa-md">
    <q-card
      v-if="question"
      class="q-ma-xs q-card"
    >
      <div class="q-pa-md">
        <p class="text-h6">
          {{question.q}}
        </p>
        <p class="q-pl-md text-subtitle1">
          - {{question.desc}}
        </p>
      </div>
    </q-card>

    <Q1 v-if="question.component === 'Q1'"/>
  </q-page>
</template>

<script>
import Q1 from '../components/Questions/Q1'

export default {
  name: 'PageIndex',
  components: {
    Q1
  },
  mounted () {
    this.$store.dispatch('cube/authenticate')
  },
  computed: {
    question () {
      return this.$store.state.question.question
    }
  }
}
</script>
