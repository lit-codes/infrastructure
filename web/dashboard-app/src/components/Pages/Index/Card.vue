<template>
 <q-card class="my-card">
      <q-card-section class="bg-light text-dark">
          <div class="row justify-between" style="min-width: 450px;">
                <div>
                    Andrew
                <q-icon  class="q-ml-sm" :name="fasCopy" />
                </div>
                <div class="q-mx-md">
                    Ratings over time
                </div>
                <div>
                <q-icon  class="q-mr-sm" :name="farTrashAlt" />
                <q-icon  class="q-mr-sm" :name="fasCopy" />
                <q-icon  class="q-mr-sm" :name="farTrashAlt" />
            </div>
          </div>
      </q-card-section>

      <q-separator />
      <div class="q-pa-md">
        <slot />
      </div>
    </q-card>
</template>

<script>
import { farTrashAlt, fasCopy } from '@quasar/extras/fontawesome-v5'

export default {
  data () {
    return {
      farTrashAlt: null,
      fasCopy: null
    }
  },
  created () {
    this.farTrashAlt = farTrashAlt
    this.fasCopy = fasCopy
  }
}
</script>

<style lang="scss" scoped>

</style>
