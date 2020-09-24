<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <q-header elevated>
      <q-toolbar>
        <SearchQuestion />

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
import SearchQuestion from '../components/Common/SearchQuestion'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  components: {
    SearchQuestion
  }
}
</script>
