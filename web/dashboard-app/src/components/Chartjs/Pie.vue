<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
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
