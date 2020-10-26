<template>
    <el-select :value="value" placeholder="请选择" @change='change'>
         <el-option
         v-for="item in channel"
         :key="item.id"
         :label="item.name"
         :value="item.id">
         </el-option>
    </el-select>
</template>

<script>
import { getChannels } from '@/api/articles.js'
export default {
  name: 'channels',
  data () {
    return {
      channel: []
    }
  },
  async created () {
    try {
      const res = await getChannels()
      this.channel = res.data.data.channels
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    // eu 里面下拉框的 change事件  当选择的时候会自动给选中的 option的value值
    change (val) {
      console.log(val)
      this.$emit('input', val)
    }
  },
  props: ['value']
}
</script>

<style>

</style>
