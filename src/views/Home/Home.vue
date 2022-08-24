<template>
  <div class="home">
    <a-layout class="bg">
      <div class="h-bg">
        <l-header :style="{ width: '1200px' }"></l-header>
      </div>
      <a-layout-content class="h-content">
        <l-banner></l-banner>
        <utility-tool></utility-tool>

        <conversion-tool></conversion-tool>
      </a-layout-content>
      <a-layout-content class="box-fill">
        <div class="h-content">
          <management-tool></management-tool>
        </div>
      </a-layout-content>
      <a-layout-content class="h-content">
        <a-row :gutter="[16,16]">
          <a-col :span="8">
            <div class="f-item">
              <a-row>
                <a-col :span="8">
                  <a-avatar shape="square" size="large" /><span :style="{ fontSize: '16px', marginLeft: '10px'}">品牌管理</span>
                </a-col>
                <a-col :span="8" :offset="8" :style="{lineHeight: '40px', color: '#7f7f7f'}">敬请期待</a-col>
              </a-row>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="f-item">
              <a-row>
                <a-col :span="8">
                  <a-avatar shape="square" size="large" /><span :style="{ fontSize: '16px', marginLeft: '10px'}">品牌管理</span>
                </a-col>
                <a-col :span="8" :offset="8" :style="{lineHeight: '40px', color: '#7f7f7f'}">敬请期待</a-col>
              </a-row>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="f-item">
              <a-row>
                <a-col :span="8">
                  <a-avatar shape="square" size="large" /><span :style="{ fontSize: '16px', marginLeft: '10px'}">品牌管理</span>
                </a-col>
                <a-col :span="8" :offset="8" :style="{lineHeight: '40px', color: '#7f7f7f'}">敬请期待</a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </a-layout-content>

      <a-layout-content class="box-ft">
        <div class="h-content">
          <l-footer />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import LHeader from "@/components/Header/Header"
import LBanner from "./cps/Banner"
import UtilityTool from "./cps/UtilityTool"
import ConversionTool from "./cps/ConversionTool"
import ManagementTool from "./cps/ManagementTool"
import LFooter from "./cps/Footer"
export default defineComponent({
  name: "home",
  components: {
    LHeader,
    LBanner,
    UtilityTool,
    ConversionTool,
    ManagementTool,
    LFooter
  }
})
</script>

<style scoped lang="scss">
.bg {
  background-color: #fff;
}
.h-content {
  width: 1200px;
  margin: 0 auto;
}
  .f-item{
    margin: 40px 0;
    padding: 20px 0 20px 20px;
    border: 1px solid #d9d9d9;
  }
</style>
