<template>
  <div class="user-menu">
    <div class="information">
      <a-badge :count="0">
        <bell-filled :style="{ fontSize: '20px', width: '32px' , color: '#ccc'}" />
      </a-badge>
    </div>
    <div class="user-info">
      <a-avatar>
        <template #icon><user-outlined /></template>
      </a-avatar>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{currName}}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <!-- <a-menu-item key="0">
              <a target="_blank" href="http://www.alipay.com/">
                个人信息
              </a>
            </a-menu-item> -->
            <a-menu-divider />
            <a-menu-item key="3">
              <a-popconfirm @confirm="logoutSubmit" title="确定要退出吗？" ok-text="确定" cancel-text="取消">
                <a href="#">退出登录</a>
              </a-popconfirm>
            </a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { UserOutlined, BellFilled, DownOutlined } from "@ant-design/icons-vue"
import { defineComponent } from "vue"
import {getItem,setItem} from '@/store/storage'
import { useRouter } from "vue-router"
import { getLogOut } from "@/service/api" 
import { useStore } from "vuex"
import { message } from 'antd'
import { ACCESS_TOKEN,ACCESS_USERNAME } from '@/store/mutation-types'

export default defineComponent({
  components: {
    UserOutlined,
    BellFilled,
    DownOutlined
  },
  
  setup() {
    const store=useStore()
    const router = useRouter()
    let currName=getItem(ACCESS_USERNAME)

    const logoutSubmit = () => {
        
          getLogOut().then(resp => {
              if (resp.code === 0) {
                setItem(ACCESS_TOKEN, '')
                setItem(ACCESS_USERNAME, '')
                store.commit('SET_TOKEN','')
                router.push({ path: '/' })
              }
              else if(resp.code === 1)
              {
                message.error(resp.message)
              }
            })
            .catch(() => {
            }).finally(()=>{
          })
    }
    return{
      currName,
      logoutSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.user-menu {
  display: flex;
  align-items: center;
  min-width: 100px;
}
.information {
  position: relative;
  margin-right: 30px;
}
.ant-dropdown-link {
  color: #666;
}
</style>
