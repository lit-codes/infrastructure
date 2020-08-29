<template>
  <q-page class="flex flex-start justify-start items-start content-start q-pa-md">
    <Card class="q-ma-xs">
      <Bar />
    </Card>

    <Card class="q-ma-xs">salam</Card>

    <Card class="q-ma-xs">
      <Score />
    </Card>
  </q-page>
</template>

<script>
import Card from '../components/Pages/Index/Card'
import Score from '../components/Pages/Index/Score'
import Bar from '../components/Common/Chartjs/Bar/Bar'
// import cubejs from '@cubejs-client/core'

export default {
  name: 'PageIndex',
  components: {
    Card,
    Score,
    Bar
  },
  data () {
    return {}
  },
  mounted () {
    this.authenticate()
  },
  methods: {
    async authenticate () {
      try {
        const response = await this.$axios.get('/')
        console.log('Authenticated2!', response)
        return response
      } catch (e) {
        console.log('Authentication failed with error:', e)
      }
    }
  }
}
</script>
