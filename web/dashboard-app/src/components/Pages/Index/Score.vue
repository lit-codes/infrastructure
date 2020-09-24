<template>
  <div class="flex justify-around">
    <div class="text-center">
      <div :class="['text-h4', {'green': parseInt(retakeWorthyCount) > 50, 'red': parseInt(retakeWorthyCount) <= 50 }]">{{retakeWorthyCount}}%</div>
      <div class="text-subtitle1">Would take again</div>
    </div>

    <div class="text-center">
      <div class="red text-h4">3.3</div>
      <div class="text-subtitle1">Difficulty level</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    retakeWorthyCount: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.green {
  color: $green;
}
.red {
  color: $red;
}
</style>
