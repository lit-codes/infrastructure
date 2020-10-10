<template>
  <q-select
    v-model="teacher"
    label="Teacher name"
    use-input
    hide-selected
    input-debounce="100"
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
    async filterFn (val, update, abort) {
      const { data } = await this.$axios.get(`http://127.0.0.1:4000/search?teacher=${val}`)
      update(() => {
        this.options = data.map(t => `${t.first_name} ${t.last_name}`)
      })
    },

    abortFilterFn () {
      // console.log('delayed filter aborted')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
