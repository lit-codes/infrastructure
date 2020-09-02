<template>
  <q-page
    class="flex flex-start justify-start items-start content-start q-pa-md"
  >
    <Card class="q-ma-xs" :name="teacher.fullName">
      <Bar :chartdata="ratingsOverTime.chartdata" :options="ratingsOverTime.options"/>
    </Card>

    <Card class="q-ma-xs" :name="teacher.fullName">
      <Pie :chartdata="overallRatings.chartdata" :options="overallRatings.options" />
    </Card>

    <Card class="q-ma-xs" :name="teacher.fullName">
      <Score />
    </Card>
  </q-page>
</template>

<script>
import Card from '../components/Common/Card'
import Score from '../components/Pages/Index/Score'
import Bar from '../components/Chartjs/Bar'
import Pie from '../components/Chartjs/Pie'
import { loadTeacher, loadTeacherRatings, loadRetakeCourse } from '../cubes'
import { drawOverallRatings, drawRatingsOverTime } from '../Charts'

export default {
  name: 'PageIndex',
  components: {
    Card,
    Score,
    Bar,
    Pie
  },
  data () {
    return {
      teacher: {},
      overallRatings: {},
      ratingsOverTime: {}
    }
  },
  mounted () {
    this.$store.dispatch('cube/authenticate')
    this.loadTeacher()
    this.loadTeacherRatings()
  },
  methods: {
    async loadTeacher () {
      if (this.cubeApi) {
        const teacher = await loadTeacher(this.cubeApi, this.teacherId)
        if (teacher) {
          this.teacher = teacher
          this.overallRatings = drawOverallRatings(teacher)
        }
      }
    },
    async loadTeacherRatings () {
      if (this.cubeApi) {
        const teacherRatings = await loadTeacherRatings(this.cubeApi, this.teacherId)
        if (teacherRatings) {
          this.ratingsOverTime = drawRatingsOverTime(teacherRatings)
        }
      }
    }
  },
  computed: {
    cubeApi () {
      return this.$store.state.cube.cubejsApi
    },
    teacherId () {
      return this.$route.query.tid
    }
  },
  watch: {
    cubeApi (newValue, oldValue) {
      if (newValue) {
        this.loadTeacher()
        this.loadTeacherRatings()
        loadRetakeCourse(newValue, '1269')
      }
    }
  }
}
</script>
