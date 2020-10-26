<template>
  <div class="home">
    <h3>主页在此</h3>
    <!-- :value='imgurl' -->
    <my-cover v-model="imgUrl"></my-cover>
  </div>

</template>

<script>
import MyCover from '@/components/my-cover.vue'
export default {
  name: 'home',
  components: {
    MyCover
  },
  data () {
    return {
      imgUrl: 'http://a0.att.hudong.com/18/56/14300000958002128488569856508.jpg'
    }
  }
}
</script>

<style>

</style>
