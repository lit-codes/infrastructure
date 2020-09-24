<template>
  <q-select
    v-model="question"
    dark
    dense
    standout
    style="min-width: 300px"
    label="Ratings of teachers over time"
    class="q-ml-md"
    use-input
    hide-selected
    input-debounce="300"
    :options="options"
    dropdown-icon="search"
    option-label="q"
    @filter="filterFn"
    @filter-abort="abortFilterFn"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import Questions from '../../constants/questions'
export default {
  data () {
    return {
      model: null,
      options: []
    }
  },
  computed: {
    question: {
      set (val) {
        return this.$store.commit('question/setQuestion', val)
      },
      get () {
        return this.$store.state.question.question
      }
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = Questions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = Questions.filter(v => v.q.toLowerCase().indexOf(needle) > -1)
      })
    },
    // async filterFn (val, update, abort) {
    //   const { data } = await this.$axios.get(`http://127.0.0.1:3001/search?q=${val}`)
    //   update(() => {
    //     this.options = data.map(item => item._source.question)
    //   })
    // },

    abortFilterFn () {
      // console.log('delayed filter aborted')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
