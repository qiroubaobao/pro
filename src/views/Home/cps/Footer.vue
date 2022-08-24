<template>
  <a-row  type="flex" justify="space-around" align="middle" class="height-225">
    <a-col :span="12">
      <div class="footer" align="left" >
        <p>北京实验科技有限公司</p>
        <p>CopyRight 实验缘 北京实验科技有限公司北京实验科技有限公司</p>
      </div>
    </a-col>
    <a-col :span="12" align="right">
      <img src="~@/assets/logo.png" style="height: 100px; margin-right: 20px;" alt="" />
      <img src="~@/assets/logo.png" style="height: 100px;" alt="" />
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "LFooter",
  components: {}
})
</script>

<style scoped lang="scss">
.footer {
  color: #fff;
}
  .height-225{
    height: 225px;
  }
</style>
