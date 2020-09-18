<template>
  <q-select
    v-model="teacher"
    label="Teacher name"
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
  props: {
    value: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      model: null,
      options: []
    }
  },
  computed: {
    teacher: {
      set (val) {
        return this.$emit('input', val)
      },
      get () {
        return this.value
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
