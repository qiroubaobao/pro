<template>
  <a-breadcrumb class="ft12" separator=">" align="left">
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item>实验室耗材管理系统</a-breadcrumb-item>
    <a-breadcrumb-item>标准材质管理系统</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { defineComponent } from "vue"
import { Breadcrumb } from "ant-design-vue/lib"
const { Item } = Breadcrumb

export default defineComponent({
  name: "Breadcrumb",
  components: {
    ABreadcrumbItem: Item
  }
})
</script>

<style scoped></style>
