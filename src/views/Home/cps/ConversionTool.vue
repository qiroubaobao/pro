<template>
  <div class="box-fixed">
    <h1 align="left">单位转换工具</h1>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card align="left" :style="{ backgroundColor: '#f5f5f5' }">
          <div class="ts-tool">
            <experiment-outlined
              :style="{ fontSize: '18px', margin: '4px 10px 0 0' }"
            />
            <div>
              <h3 :style="{ fontSize: '18px' }">
                <span>压力单位转换</span>
              </h3>
              <p>计算机将已知的温度转换成各种</p>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card align="left" :style="{ backgroundColor: '#f5f5f5' }">
          <div class="ts-tool">
            <experiment-outlined
              :style="{ fontSize: '18px', margin: '4px 10px 0 0' }"
            />
            <div>
              <h3 :style="{ fontSize: '18px' }">
                <span>压力单位转换</span>
              </h3>
              <p>计算机将已知的温度转换成各种</p>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card align="left" :style="{ backgroundColor: '#f5f5f5' }">
          <div class="ts-tool">
            <experiment-outlined
              :style="{ fontSize: '18px', margin: '4px 10px 0 0' }"
            />
            <div>
              <h3 :style="{ fontSize: '18px' }">
                <span>压力单位转换</span>
              </h3>
              <p>计算机将已知的温度转换成各种</p>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card align="left" :style="{ backgroundColor: '#f5f5f5' }">
          <div class="ts-tool">
            <experiment-outlined
              :style="{ fontSize: '18px', margin: '4px 10px 0 0' }"
            />
            <div>
              <h3 :style="{ fontSize: '18px' }">
                <span>压力单位转换</span>
              </h3>
              <p>计算机将已知的温度转换成各种</p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { ExperimentOutlined } from "@ant-design/icons-vue"

export default defineComponent({
  name: "ConversionTool",
  components: {
    ExperimentOutlined
  }
})
</script>

<style scoped lang="scss">
.ts-tool {
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
}
</style>
