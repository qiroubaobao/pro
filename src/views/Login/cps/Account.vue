<template>
  <div class="box">
    <h1 align="left">登录实验室</h1>
    <a-form>
      <a-form-item>
        <div class="border-bottom">
          <a-input
            v-model:value="formState.cellPhone"
            class="input-style border-none"
            placeholder="手机号"
          />
        </div>
      </a-form-item>
      <a-form-item>
        <div class="border-bottom">
          <a-row class="input-style" type="flex" justify="space-between">
            <a-col :span="16">
              <a-input
                v-model:value="formState.AuthCode"
                class="border-none"
                placeholder="验证码"
              />
            </a-col>
            <a-col :span="7" align="right">
              <a-button v-on:click="sendLoginCode" :disabled="flag">{{content}}</a-button>
            </a-col>
          </a-row>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent,inject,ref} from "vue"
import { sendCode } from "@/service/api" 
import { message } from 'antd';
export default defineComponent({
  name: "login-account",
  setup() {
    let formState=inject("loginParams")
    
    let flag=ref(false)//按钮是否可取
    let content=ref("获取验证码")//按钮内文本
    let totalTime=ref(60)//倒计时时间
    function sendLoginCode()
    {
      if(!formState.cellPhone)
      {
        message.error("请输入手机号")
        return
      }
      
      flag.value = true//点击之后设置按钮不可取     
      let param={cellPhone:formState.cellPhone,codeType:1}
      sendCode(param).then(resp => {
              if (resp.code === 0) {
                //this.$router.push({ path: '/main' })
                message.success("验证码已发送，请注意查收")
                content.value = totalTime.value + "s后重新发送"//按钮内文本
                let clock = window.setInterval(() => {
                  totalTime.value--
                  content.value = totalTime.value + "s后重新发送"
                  if (totalTime.value < 0) {
                    window.clearInterval(clock)
                    content.value = "重新发送验证码"
                    totalTime.value = 60
                    flag.value = false;//这里重新开启
                  }
                }, 1000)
              }
              else if(resp.code === 1)
              {
                flag.value = false;//这里重新开启
                message.error(resp.message)
              }
              else
              {
                flag.value = false;//这里重新开启
                message.error("服务器忙")
              }
            })
            .catch(() => {
                flag.value = false;//这里重新开启
                message.error("服务器错误")
            }).finally(()=>{
          })
    }
    
    return {
      flag,
      content,
      totalTime,
      formState,
      sendLoginCode
    }
  }
})
</script>

<style scoped>
.ant-form-item{
  margin-bottom:0px;
}
.box {
  margin-bottom: 40px;
}
.input-style {
  margin: 30px 0 5px 0;
}
.border-bottom {
  border-bottom: 1px solid #ccc;
}
.border-none {
  border: 0 none;
}
</style>
