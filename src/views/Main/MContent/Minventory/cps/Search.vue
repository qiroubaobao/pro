<template>
  <a-form>
    <a-row type="flex">
      <a-col flex="auto" align="left">
        <a-input v-model:value="searchkey" :style="{ width: '300px'}" placeholder="物料名称"></a-input>
        <label :style="{ color: '#999', marginRight: '20px', marginLeft: '20px'}">状态选择</label>
        <a-radio-group v-model:value="value">
          <a-radio :value="1">低库存</a-radio>
          <a-radio :value="2">即将过期</a-radio>
          <a-radio :value="3">已过期</a-radio>
        </a-radio-group>
      </a-col>
      <a-col flex="200px">
        <a-space>
          <a-button size="large" type="primary" html-type="submit" @click="getMaterialsList">查询</a-button>
          <a-button size="large" html-type="submit">重置</a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import { ref } from 'vue'

  export default {
    name: 'Search',
    setup(){
      const value = ref(1)
      return{
        value
      }
    }
  }
</script>

<style scoped>

</style>
