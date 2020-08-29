<template>
  <q-page class="flex flex-start justify-start items-start content-start q-pa-md">

    <Card class="q-ma-xs" >
      <Bar />
    </Card>

    <Card class="q-ma-xs">
      salam
    </Card>

    <Card class="q-ma-xs">
      <Score/>
    </Card>

  </q-page>
</template>

<script>
import Card from '../components/Pages/Index/Card'
import Score from '../components/Pages/Index/Score'
import Bar from '../components/Common/Chartjs/Bar/Bar'
// import cubejs from '@cubejs-client/core'

// Hack for development, change UI address to API
// const API_URL = document.location.origin
//   .replace('ui', 'api') // Theia dev servers
//   .replace('3000', '4000') // Local development

export default {
  name: 'PageIndex',
  components: {
    Card,
    Score,
    Bar
  },
  data () {
    return {
    }
  },
  mounted () {

  }
}
</script>
