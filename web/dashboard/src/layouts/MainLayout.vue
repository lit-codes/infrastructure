<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <q-header elevated>
      <q-toolbar>
        <q-input dark dense standout style="min-width: 300px" v-model="text" label="Ratings of teachers over time" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>

        <q-toolbar-title>
          Codelite App
        </q-toolbar-title>

        <div>Codelite v{{ $q.version }}</div>
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
      text: ''
    }
  }
}
</script>
