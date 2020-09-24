<template>
  <q-card
    v-if="question"
    class="q-ma-xs q-pa-md q-card"
  >
    <q-card
      v-if="question"
      class="q-ma-xs q-card"
    >
      <div style="max-width: 300px;">
        <SearchTeacher v-model="selectedTeacher"/>
      </div>
    </q-card>
    <div class="flex flex-start justify-start items-start">
      <Card
        class="q-ma-xs overflow-auto"
        :name="teacher.fullName"
      >
        <Bar
          :chartdata="ratingsOverTime.chartdata"
          :options="ratingsOverTime.options"
        />
      </Card>

      <Card
        class="q-ma-xs overflow-auto"
        :name="teacher.fullName"
      >
        <Pie
          :chartdata="overallRatings.chartdata"
          :options="overallRatings.options"
        />
      </Card>

      <Card
        class="q-ma-xs overflow-auto"
        :name="teacher.fullName"
      >
        <Score :retakeWorthyCount="retakeWorthyCount" />
      </Card>
    </div>
  </q-card>
</template>

<script>
import SearchTeacher from '../SearchTeacher'
import Card from '../../Common/Card'
import Score from '../../Pages/Index/Score'
import Bar from '../../Chartjs/Bar'
import Pie from '../../Chartjs/Pie'
import { loadTeacher, loadTeacherRatings, loadRetakeCourse } from '../../../cubes'
import { drawOverallRatings, drawRatingsOverTime } from '../../../Charts'

export default {
  components: {
    Card,
    Score,
    Bar,
    Pie,
    SearchTeacher
  },
  data () {
    return {
      selectedTeacher: null,
      teacher: {},
      overallRatings: {},
      ratingsOverTime: {},
      retakeWorthyCount: ''
    }
  },
  mounted () {
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
        const teacherRatings = await loadTeacherRatings(
          this.cubeApi,
          this.teacherId
        )
        if (teacherRatings) {
          this.ratingsOverTime = drawRatingsOverTime(teacherRatings)
        }
      }
    },
    async loadRetakeCourse () {
      if (this.cubeApi) {
        const retakeCourse = await loadRetakeCourse(
          this.cubeApi,
          this.teacherId
        )

        this.retakeWorthyCount = retakeCourse
      }
    }
  },
  computed: {
    question () {
      return this.$store.state.question.question
    },
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
        this.loadRetakeCourse()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
