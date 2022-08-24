<template>
  <div class="box-fixed">
    <h1 align="left">实用工具</h1>
    <a-row :gutter="16">
      <a-col :span="4">
        <a-card align="left">
          <h3 :style="{ fontSize: '18px' }">
            <experiment-outlined /> <span>元素周期表</span>
          </h3>
          <div>支持查询基本信息,原子结构和化学性质</div>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card align="left">
          <h3 :style="{ fontSize: '18px' }">
            <experiment-outlined /> <span>元素周期表</span>
          </h3>
          <div>支持查询基本信息,原子结构和化学性质</div>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card align="left">
          <h3 :style="{ fontSize: '18px' }">
            <experiment-outlined /> <span>元素周期表</span>
          </h3>
          <div>支持查询基本信息,原子结构和化学性质</div>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card align="left">
          <h3 :style="{ fontSize: '18px' }">
            <experiment-outlined /> <span>元素周期表</span>
          </h3>
          <div>支持查询基本信息,原子结构和化学性质</div>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card align="left">
          <h3 :style="{ fontSize: '18px' }">
            <experiment-outlined /> <span>元素周期表</span>
          </h3>
          <div>支持查询基本信息,原子结构和化学性质</div>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card align="left">
          <h3 :style="{ fontSize: '18px' }">
            <experiment-outlined /> <span>元素周期表</span>
          </h3>
          <div>支持查询基本信息,原子结构和化学性质</div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { ExperimentOutlined } from "@ant-design/icons-vue"

export default defineComponent({
  name: "UtilityTool",
  components: {
    ExperimentOutlined
  }
})
</script>

<style scoped lang="scss"></style>
