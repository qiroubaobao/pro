<template>
  <div class="layout">
    <a-row class="login-box">
      <a-col class="banner" :span="12">
        <h1 class="title">实验缘工具箱</h1>
        <h6 class="title">——让你安心做实验——</h6>
        <img
          class="pic"
          referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/pscuhgtg2d49g2tzfnkgl04a9d3n8vcu8hl21259f26-2b44-4edc-9b40-39598afbee84"
        />
      </a-col>
      <a-col class="form-box" :span="12">
        <router-view/>
        <div class="login-btn-group">
          <a-button @click="handelSubmit" :size="size" type="primary" block  :loading="loginBtn"
            >{{btnStr2}}</a-button
          >
          <a-button @click="handelAccount" :size="size" block
            >{{btnStr}}</a-button
          >
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, ref, reactive,provide } from "vue"
import {setItem} from '@/store/storage'
import { useRouter } from "vue-router"
import { getLoginApi,register } from "@/service/api" 
import { message } from 'antd'
import { ACCESS_TOKEN,ACCESS_USERNAME,ACCESS_COMPANYNAME } from '@/store/mutation-types'
import { useStore } from "vuex"

export default defineComponent({
  setup() {
    const store=useStore()
    let loginParams = reactive({cellPhone:'',AuthCode:''})
    let registerParams = reactive({phone:'',verifyCode:'',pname:'',cname:'',province:'',city:'',area:'',agree:false})
    provide('loginParams',loginParams)
    provide('registerParams',registerParams)
    let loginBtn=ref(false)
    let lors=ref(1)
    let btnStr=ref('还没有实验室，马上注册')
    let btnStr2=ref('登录')

    const router = useRouter()
    //console.info(router.currentRoute)
    if(router.currentRoute.value.name==='Register')
    {
        lors.value=2
        btnStr.value='已有实验，马上登录'
        btnStr2.value='注册'
    }
    const handelSubmit = () => {
      //console.info(lors.value) 
      //console.info(registerParams)
      if(lors.value===1)
      {
        if(!loginParams.cellPhone)
        {
          message.error("请输入手机号")
          return
        }
        if(!loginParams.AuthCode)
        {
          message.error("请输入验证码")
          return
        }
          loginBtn.value = true
          getLoginApi(loginParams).then(resp => {
              if (resp.code === 0) {
                setItem(ACCESS_TOKEN, resp.data.token)
                setItem(ACCESS_USERNAME, resp.data.name)
                setItem(ACCESS_COMPANYNAME, resp.data.companyname)
                store.commit('SET_TOKEN',resp.data.token)
                router.push({ path: '/main' })
              }
              else if(resp.code === 1)
              {
                message.error(resp.message)
              }
            })
            .catch(() => {
              loginBtn.value = false
            }).finally(()=>{
            loginBtn.value = false
          })
      }
      else if(lors.value===2)
      {
        if(!registerParams.phone)
        {
          message.error("请输入手机号")
          return
        }
        if(!registerParams.verifyCode)
        {
          message.error("请输入验证码")
          return
        }
        if(!registerParams.pname)
        {
          message.error("请输入姓名")
          return
        }
        if(!registerParams.cname)
        {
          message.error("请输入企业名称")
          return
        }
        if(!registerParams.province)
        {
          message.error("请选择省")
          return
        }
        if(!registerParams.city)
        {
          message.error("请选择市")
          return
        }
        if(!registerParams.area)
        {
          message.error("请选择区")
          return
        }
        if(!registerParams.agree)
        {
          message.error("请勾选服务协议")
          return
        }
          loginBtn.value = true
          register(registerParams).then(resp => {
              if (resp.code === 0) {                
                message.success("注册成功")
                handelAccount()
              }
              else if(resp.code === 1)
              {
                message.error(resp.message)
              }
            })
            .catch(() => {
              loginBtn.value = false
            }).finally(()=>{
            loginBtn.value = false
          })
      }
       return
    }
    const handelAccount = () => {
      if(lors.value===1)
      {
        router.push({
          name: "Register"
        })
        lors.value=2
        btnStr.value='已有实验，马上登录'
        btnStr2.value='注册'
      }
      else 
      {
        router.push({
          name: "Account"
        })
        lors.value=1
        btnStr.value='还没有实验室，马上注册'
        btnStr2.value='登录'
      }
    }

    return {
      loginParams,
      registerParams,
      loginBtn,
      lors,
      btnStr,
      btnStr2,
      size: ref("large"),
      handelSubmit,
      handelAccount,
    }
  }
})
</script>
<style scoped lang="scss">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  background-color: rgba(245, 245, 245, 1);
}
.login-box {
  width: 960px;
  height: 560px;
  background-color: #fff;
}
.banner {
  background-color: #2580fc;
  height: 560px;
  padding: 40px 0 0 40px;
  & .title {
    text-align: left;
    color: #fff;
  }
  .pic {
    margin-top: 40px;
  }
}
.form-box {
  padding: 40px 70px 0 70px;
}
.login-btn-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  min-height: 96px;
}
</style>
