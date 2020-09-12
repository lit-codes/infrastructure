<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <q-header elevated>
      <q-toolbar>
        <q-select
          v-model="model"
          dark
          dense
          standout
          style="min-width: 300px"
          label="Ratings of teachers over time"
          class="q-ml-md"
          use-input
          hide-selected
          input-debounce="500"
          :options="options"
          dropdown-icon="search"
          @filter="filterFn"
          @filter-abort="abortFilterFn"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-toolbar-title>Codelite App</q-toolbar-title>

        <div>Codelite v{{ $q.version }}</div>

        <q-btn class="q-ml-md q-mr-xs" dense icon="share" />
        <q-btn dense icon="help" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      text: '',

      model: null,
      options: []
    }
  },
  methods: {
    async filterFn (val, update, abort) {
      const { data } = await this.$axios.get(`http://127.0.0.1:3001/search?q=${val}`)
      update(() => {
        this.options = data.map(item => item._source.name)
      })
    },

    abortFilterFn () {
      // console.log('delayed filter aborted')
    }
  }
}
</script>
