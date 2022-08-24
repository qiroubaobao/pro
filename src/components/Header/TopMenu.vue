<template>
  <div class="top-menu">
    <a-menu mode="horizontal" :style="{ borderBottom:'0 none', fontSize: '18px', lineHeight: '64px'}">
      <a-menu-item key="1">首页</a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>化学工具箱</template>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">元素周期表</a-menu-item>
          <a-menu-item key="setting:2">MSDS查询</a-menu-item>
          <a-menu-item key="setting:3">CAS号查询</a-menu-item>
          <a-menu-item key="setting:4">标准查询</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="3">单位转化工具</a-menu-item>
      <a-menu-item key="4">实验室耗材管理系统</a-menu-item>
      <a-menu-item key="5">管理方案对比</a-menu-item>
      <a-menu-item key="6">联系我们</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "TopMenu"
}
</script>

<style lang="scss" scoped>
</style>
