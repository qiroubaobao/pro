<template>
  <a-layout class="layout">
    <div class="h-bg">
      <l-header :style="{ width: 'auto' }"></l-header>
    </div>
    <a-layout>
      <a-layout-sider width="272">
        <l-menu/>
      </a-layout-sider>
      <a-layout>
        <l-breadcrumb />
        <a-layout-content>
          <l-content/>
          <!-- <l-inventory /> -->
          <!-- <l-table /> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent,provide,ref} from "vue"
import LMenu from "@/components/Menu/Menu"
import LHeader from "@/components/Header/Header"
import LBreadcrumb from "./MContent/cps/MBreadcrumb"
import LContent from "./MContent/MContent"
//import LInventory from "./MContent/cps/MInventory"
//import LTable from "./MContent/cps/MTable"

export default defineComponent({
  components: {
    LMenu,
    LHeader,
    LBreadcrumb,
    LContent,
    //LInventory,
    //LTable
  },

  setup() {
    let tabkey=ref("2")
    provide('tabkey',tabkey)
    // watch(tabkey,(newValue,oldValue)=>{
    //   console.log(oldValue+"|"+newValue)
    // })
    return {
      tabkey
    }
  }
})
</script>
<style scoped lang="scss">
.layout {
  min-height: 100vh;
}
</style>
