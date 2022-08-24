<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :open-keys="openKeys"
    @openChange="onOpenChange"
  >
    <a-sub-menu key="sub1">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>标准物质管理系统</template>
      <!-- <a-menu-item key="1" @click="toBlank(1)">入库管理</a-menu-item> -->
      <a-menu-item key="2" @click="toBlank(2)">库存管理</a-menu-item>
      <a-menu-item key="3" @click="toBlank(3)">归还物料</a-menu-item>
      <a-menu-item key="4" @click="toBlank(4)">报损溯源</a-menu-item>
      <a-menu-item key="5" @click="toBlank(5)">期间核查</a-menu-item>
      <a-menu-item key="6" @click="toBlank(6)">数据统计</a-menu-item>
      <a-menu-item key="7" @click="toBlank(7)">溯源台账</a-menu-item>
      <a-menu-item key="8" @click="toBlank(8)">标签批量打印</a-menu-item>
      <a-menu-item key="9" @click="toBlank(9)">COA证书管理</a-menu-item>
      <a-menu-item key="10" @click="toBlank(10)">消息中心</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #icon></template>
      <template #title>
        <SettingOutlined />
        库位管理
      </template>
      <a-menu-item @click="openLocationManage" key="11">库位列表</a-menu-item>
      <!-- <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu> -->
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>供应商管理</template>
      <a-menu-item @click="openSupplierManage" key="12">供应商管理</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub5">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>人员管理</template>
      <a-menu-item @click="openUserManage" key="13">人员管理</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub6">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>智能硬件管理</template>
      <a-menu-item key="14">智能硬件管理</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { defineComponent, reactive, toRefs,inject,watch } from "vue"
import { useRouter } from "vue-router"
import {
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons-vue"
export default defineComponent({
  components: {
    AppstoreOutlined,
    SettingOutlined
  },

  setup() {
    const router = useRouter()
    let formState=inject("tabkey")
    watch(formState,(newValue)=>{
    state.selectedKeys=[newValue+=""]
    })
    const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4", "sub5", "sub6"],
      openKeys: ["sub1"],
      selectedKeys: ["2"]
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
    const openLocationManage=()=>{
      const page = router.resolve({
        name: "Location",
        params: {}
      });
      window.open(page.href, '_blank');
    }
    const openSupplierManage=()=>{
      const page = router.resolve({
        name: "Supplier",
        params: {}
      });
      window.open(page.href, '_blank');
    }
    const openUserManage=()=>{
      const page = router.resolve({
        name: "User",
        params: {}
      });
      window.open(page.href, '_blank');
    }
    return {
      ...toRefs(state),
      onOpenChange,
      toBlank,
      formState,
      openLocationManage,
      openSupplierManage,
      openUserManage
    }
  }
})
</script>

<style scoped>
/* .ant-menu, .ant-menu-sub, .ant-menu-inline{
  color:white;
  background: #1184F6 !important;
}
.ant-menu-submenu > .ant-menu{
  background-color: #1184F6 !important;
}
.ant-menu-submenu-title{
  color:white !important;
}
.ant-menu-item a{
  color:white !important;
}
.ant-menu-item a:hover{
  color:#3BA3FF !important;
}
.ant-menu-item a:active:before{
  color:#3BA3FF !important;
}
.ant-menu-item a:active:after{
  color:#3BA3FF !important;
}
.ant-layout-sider{
  color:#1184F6 !important;
}
.ant-menu-item-selected{
  color:#003482 !important;
}
.ant-menu-item-active{
  color:#2B6BC7 !important;
} */
</style>
