<template>
  <div class="MBreadcrumb">
    <!-- <breadcrumb /> -->
    <div class="title">
      <div>
        &nbsp;{{currCompabyName}}
        <!-- <a-button class="ft12" type="link">编辑</a-button> -->
      </div>
      <div>
        <a-button class="qr-code" type="link" size="small">
          <template #icon
            ><qrcode-outlined
              :style="{
                fontSize: '18px',
                lineHeight: 0,
                display: 'block'
              }"
          /></template>
          <span class="ft12">扫码管理</span>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue"
//import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { QrcodeOutlined } from "@ant-design/icons-vue"
import {getItem} from '@/store/storage'
import { ACCESS_COMPANYNAME } from '@/store/mutation-types'

export default defineComponent({
  name: "MBreadcrumb",
  components: {
    //Breadcrumb,
    QrcodeOutlined
  },
  setup()
  {    
    let currCompabyName=getItem(ACCESS_COMPANYNAME)
    return{
      currCompabyName
    }
  }
})
</script>

<style scoped lang="scss">
.MBreadcrumb {
  background-color: #fff;
  padding: 10px 10px 0 16px;
  margin: 16px 16px 0 16px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
}
.qr-code {
  min-width: 60px;
  display: flex;
  color: #666;
  & span {
    margin-left: 4px;
  }
}
</style>
