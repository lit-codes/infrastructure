<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    chartdata (newValue, oldValue) {
      if (newValue) {
        this.renderChart(this.chartdata, this.options)
      }
    }
  }
}
</script>
