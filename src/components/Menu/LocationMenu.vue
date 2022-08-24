<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :open-keys="openKeys"
    @openChange="onOpenChange"
  >
    <a-sub-menu key="sub4">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>仓库管理</template>
      <a-menu-item key="1" @click="toBlank(1)">仓库位置列表</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { defineComponent, reactive, toRefs,inject,watch } from "vue"
import {
  SettingOutlined
} from "@ant-design/icons-vue"
export default defineComponent({
  components: {
    SettingOutlined
  },

  setup() {
    let formState=inject("tabkey")
    watch(formState,(newValue)=>{
    state.selectedKeys=[newValue+=""]     
    })
    const state = reactive({
      rootSubmenuKeys: [ "sub4"],
      openKeys: ["sub4"],
      selectedKeys: ["1"]
    })

    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(
        key => state.openKeys.indexOf(key) === -1
      )

      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    function toBlank(id)
    {
      formState.value=id
      //console.log(formState.value)
    }
    return { 
      ...toRefs(state), 
      onOpenChange,
      toBlank,
      formState,
    }
  }
})
</script>

<style scoped></style>
