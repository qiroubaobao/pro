<template>
  <div class="box">
    <h1 align="left">注册实验室</h1>
    <a-form>
      <a-form-item>
        <div class="border-bottom">
          <a-input v-model:value="formData.phone" class="input-style border-none" placeholder="手机号" />
        </div>
      </a-form-item>
      <a-form-item>
        <div class="border-bottom">
          <a-row class="input-style" type="flex" justify="space-between">
            <a-col :span="16">
              <a-input v-model:value="formData.verifyCode" class="border-none" placeholder="验证码" />
            </a-col>
            <a-col :span="7" align="right">
              <a-button v-on:click="sendRegCode" :disabled="flag">{{content}}</a-button>
            </a-col>
          </a-row>
        </div>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formData.pname" class="input-style" placeholder="姓名" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formData.cname" class="input-style" placeholder="企业名称" />
      </a-form-item>
      <a-form-item>
        <a-row class="input-style" type="flex" justify="space-between">
          <a-col :span="7">
            <a-select v-model:value="formData.province" @change='handleChange1' style="width: 100%" placeholder="省份">
              <a-select-option v-for='province in provinceList.data' :key='province.id' >{{ province.name }}</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="7">
            <a-select v-model:value="formData.city" @change='handleChange2' style="width: 100%" placeholder="市">
              <a-select-option v-for='city in cityList.data' :key='city.id'>{{ city.name }}</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="7">
            <a-select v-model:value="formData.area" @change='handleChange3' style="width: 100%" placeholder="区/县">
              <a-select-option v-for='area in areaList.data' :key='area.id'>{{ area.name }}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item align="left">
        <a-col class="input-style" :span="24">
          <a-checkbox v-model:checked="formData.agree">我已阅读并同意《服务协议》</a-checkbox>
        </a-col>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent,inject,ref,reactive } from "vue"
import { message } from 'antd';
import { sendCode,getProvince,getCity,getArea } from "@/service/api" 

export default defineComponent({
  name: "login-register",
  setup() {
    let formData=inject("registerParams")
    let provinceList=reactive({data: [{id:1,name:'省'}]})
    let cityList=reactive({data: [{id:1,name:'市'}]})
    let areaList=reactive({data: [{id:1,name:'区'}]})
    let flag=ref(false)//按钮是否可取
    let content=ref("获取验证码")//按钮内文本
    let totalTime=ref(60)//倒计时时间
    function sendRegCode()
    {
      if(!formData.phone)
      {
        message.error("请输入手机号")
        return
      }
      
      flag.value = true//点击之后设置按钮不可取
                
      let param={cellPhone:formData.phone,codeType:2}
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
    function getProvinceList()
    {
      getProvince().then(resp => {
        if (resp.code === 0) {          
          provinceList.data=resp.data
        }
        else if(resp.code === 1)
        {
          flag.value = false;//这里重新开启
          message.error("获取失败")
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
    function getCityList(id)
    {
      let param={Pid:id}
      getCity(param).then(resp => {
        if (resp.code === 0) {
          formData.city=''
          formData.area=''
          cityList.data=resp.data
        }
        else if(resp.code === 1)
        {
          flag.value = false;//这里重新开启
          message.error("获取失败")
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
    function getAreaList(id)
    {
      let param={Cid:id}
      getArea(param).then(resp => {
        if (resp.code === 0) {
          formData.area=''
          areaList.data=resp.data
        }
        else if(resp.code === 1)
        {
          flag.value = false;//这里重新开启
          message.error("获取失败")
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
    function handleChange1(value) {      
      formData.province=value
      getCityList(value)
      areaList.data=[]
    }
    function handleChange2(value) {
      formData.city=value
      getAreaList(value)
    }
    function handleChange3(value) {
      formData.area=value
    }

    getProvinceList()
    return {
      formData,
      provinceList,
      cityList,
      areaList,
      flag,
      content,
      totalTime,
      sendRegCode,
      handleChange1,
      handleChange2,
      handleChange3
      }
  }
})
</script>

<style scoped lang="scss">
.ant-form-item{
  margin-bottom:0px;
}
.input-style {
  margin: 16px 0 5px 0;
}
.border-bottom {
  border-bottom: 1px solid #ccc;
}
.border-none {
  border: 0 none;
}
</style>
