<template>
  <div class="MInventory">
    <h1 :style="{ fontSize: '20px'}" align="left">台账溯源</h1>
    <a-form>
      <a-row type="flex">
        <a-col flex="auto" align="left">
          <a-form-item>
            <a-input v-model:value="searchkey" :style="{ width: '300px'}" placeholder="物料名称"></a-input>
          </a-form-item >
          <a-form-item :style="{ marginLeft: '50px'}">
            <a-radio-group v-model:value="value">
              <a-radio :value="1">入库</a-radio>
              <a-radio :value="2">领用</a-radio>
              <a-radio :value="3">归还</a-radio>
              <a-radio :value="4">报损</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col flex="200px">
          <a-form-item>
            <a-space>
            <a-button type="primary" html-type="submit" @click="getMaterialsList">查询</a-button>
            <a-button html-type="submit">重置</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
  </div>
  <div class="MTable">
    <a-row type="flex">
      <a-col flex="auto" align="left">
        <!-- <a-button size="small" @click="toAddStorage">
          <template #icon><folder-add-outlined /></template>
            新入库
        </a-button> -->
      </a-col>
    </a-row>
<div style="width:100%; height:20px;"></div>
    <!-- <a-row type="flex">
      <a-col flex="220px" align="left">
        <a-checkbox v-model:checked="haveDelete">显示已删除物料信息</a-checkbox>
      </a-col>
    </a-row> -->
<div style="width:100%; height:10px;"></div>

  <a-table :columns="columns" :data-source="data.data" >
  </a-table>
  
  </div>
</template>
<script>
//import { FolderAddOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref,inject, reactive } from "vue"
import { useRouter } from "vue-router"
import { message } from 'antd';
import {getMaterialsDgh,getMaterialsDetailsByID,getUser,saveGHMaterials,getLocation} from "@/service/api/main" 
import dayjs from 'dayjs';
import {getItem} from '@/store/storage'
import { ACCESS_USERNAME } from '@/store/mutation-types'

  const columns = [{
  title: '标签码',
  dataIndex: 'tagCode',
  key: 'tagCode',
}, {
  title: '自编码',
  dataIndex: 'code',
  key: 'code',
},{
  title: '处理方式',
  dataIndex: 'clmethod',
  key: 'clmethod',
},{
  title: '处理时间',
  dataIndex: 'cltime',
  key: 'cltime',
},{
  title: '处理数量',
  dataIndex: 'clcount',
  key: 'clcount',
},{
  title: '产生费用',
  dataIndex: 'cost',
  key: 'cost',
},{
  title: '当时状态',
  dataIndex: 'currentState',
  key: 'currentState',
},{
  title: '发起人',
  dataIndex: 'originator',
  key: 'originator',
},{
  title: '操作人',
  dataIndex: 'operator',
  key: 'operator',
},{
  title: '报损缘由',
  dataIndex: 'damagedReason',
  key: 'damagedReason',
},{
  title: '品类名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '保存位置',
  dataIndex: 'location',
  key: 'location',
}, {
  title: '状态',
  dataIndex: 'state',
  key: 'state',
}, {
  title: '使用情况',
  dataIndex: 'usestate',
  key: 'usestate',
}, {
  title: '规格/单位',
  dataIndex: 'unit',
  key: 'unit',
}, {
  title: 'CAS',
  dataIndex: 'cas',
  key: 'cas',
}, {
  title: '产品编号',
  dataIndex: 'proNum',
  key: 'proNum',
}, {
  title: '保存条件',
  dataIndex: 'saveCondition',
  key: 'saveCondition',
},{
  title: '批次号',
  dataIndex: 'batchNum',
  key: 'batchNum',
},{
  title: '采购日期',
  dataIndex: 'createDate',
  key: 'createDate',
},{
  title: '过期时间至',
  dataIndex: 'expireDate',
  key: 'expireDate',
},{
  title: '标准值/纯度',
  dataIndex: 'standardValue',
  key: 'standardValue',
},{
  title: '单价',
  dataIndex: 'price',
  key: 'price',
},{
  title: '供应商',
  dataIndex: 'supplier',
  key: 'supplier',
},{
  title: '发票号',
  dataIndex: 'invoiceNum',
  key: 'invoiceNum',
},{
  title: '定值日期',
  dataIndex: 'dzDate',
  key: 'dzDate',
},{
  title: '开封日期',
  dataIndex: 'openDate',
  key: 'openDate',
},{
  title: '不确定度',
  dataIndex: 'uncertainty',
  key: 'uncertainty',
},{
  title: '介质/溶剂',
  dataIndex: 'jzrj',
  key: 'jzrj',
},{
  title: 'COA证书',
  dataIndex: 'certificate',
  key: 'certificate',
},{
  title: '证书号',
  dataIndex: 'certificateNum',
  key: 'certificateNum',
}]

export default defineComponent({
  name: "MInventoryTzsy",
  components: {
    //FolderAddOutlined,
  },
  setup() {
    const router = useRouter()
    const dateFormat = 'YYYY-MM-DD';
    let currName=getItem(ACCESS_USERNAME)
    let editID=ref('')
    let data=reactive({data:[]})
    let innerData=reactive({data:[]})
    let editData=reactive({data:{name:'',remainCount:'',cas:'',standardValue:'',productNum:'',expireDate:'',code:'',location:''}})
    let searchkey=ref('')
    let haveDelete=false
    let formState=inject("tabkey")
    const value = ref(1)
    let userList=reactive({data: [{id:1,name:''}]})
    let locationList=reactive({data: [{id:1,name:''}]})
    let lyData = reactive({id:'',userid:'',ghdate:'',remainacount:'',opendate:'',locationid:'',expiredate:'',openstate:''})

    let isReloadUser=ref(false)
    let isReloadLocation=ref(false)

    const toAddStorage=() => {
      formState.value="inStorage"
    }

    const getMaterialsList=()=>{      
      let param={searchkey:searchkey}
      getMaterialsDgh(param).then(resp => {
        if (resp.code === 0) {
          data.data=resp.data.materials
          innerData.data=resp.data.details
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
    const getMaterialsDetails=()=>{      
      let param={id:editID.value}
      getMaterialsDetailsByID(param).then(resp => {
        if (resp.code === 0) {
          editData.data=resp.data
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

    function getUserList()
    {
      getUser().then(resp => {
        if (resp.code === 0) {          
          userList.data=resp.data
          if(resp.data.length>0&&lyData.userid=='')
          {
            lyData.userid=resp.data[0].id
          }
        }
      })
    }

    const visible = ref(false);

    const showModal = (id) => {
      visible.value = true
      editID.value=id
      lyData.id=id
      getMaterialsDetails()
      getUserList()
      getLocationList()
      lyData.ghdate=ref(dayjs(getDate(), dateFormat))
      lyData.opendate=ref(dayjs(getDate(), dateFormat))
      lyData.expiredate=ref(dayjs(getDate(), dateFormat))
    };

    const handleOk = () => {
      let param={ghData:lyData}
      saveGHMaterials(param).then(resp => {
        if (resp.code === 0) {
          message.success("归还成功")
          getMaterialsList()
          visible.value = false
          editID.value=''
          lyData.id=''
        }
        else if(resp.code === 1)
        {
          message.error(resp.message)
        }
      }).catch(() => {
      }).finally(()=>{
      })
      return
    };
    
    function getDate() {
      var nowDate = new Date();
      var date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        day: nowDate.getDate(),
      }
      var dayDate = date.year + '-' + (date.month >= 10 ? date.month : '0' + date.month) + '-' + (date.day >= 10 ? date.day : '0' + date.day)
      return dayDate;
    }

    const openUserManage=()=>{
      const page = router.resolve({
        name: "User",
        params: {}
      });      
      window.open(page.href, '_blank');
      isReloadUser.value=true
    }

    const reloadUser=()=>{
      if(isReloadUser.value)
      {
        getUserList()
        isReloadUser.value=false
      }
    }

    function getLocationList()
    {
      getLocation().then(resp => {
        if (resp.code === 0) {          
          locationList.data=resp.data
          if(resp.data.length>0&&lyData.locationid=='')
          {
            lyData.locationid=resp.data[0].id
          }
        }
      })
    }
    const openLocationManage=()=>{
      const page = router.resolve({
        name: "Location",
        params: {}
      });      
      window.open(page.href, '_blank');
      isReloadLocation.value=true
    }
    const reloadLocation=()=>{
      if(isReloadLocation.value)
      {
        getLocationList()
        isReloadLocation.value=false
      }
    }

    getMaterialsList()
    return {
      dateFormat,
      currName,
      searchkey,
      haveDelete,
      value,
      data,
      columns,
      innerData,
      editData,
      userList,
      locationList,
      lyData,
      toAddStorage,
      getMaterialsList,
      visible,
      showModal,
      handleOk,
      openUserManage,
      reloadUser,
      openLocationManage,
      reloadLocation,
    }
  }
})
</script>

<style scoped lang="scss">
.MInventory {
  margin: 0 16px 16px 16px;
  padding: 16px;
  background-color: #fff;
}
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[data-theme="dark"] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme="dark"] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
  .MTable{
    margin: 16px;
  }
  .table{
    width: 100%;
    margin: 10px 20px 20px 0;
    overflow: hidden;
    & td, & th{
      padding: 10px 0;
    }
    & td:nth-child(odd){
      text-align: right;
    }
    & td:nth-child(even){
      text-align: left;
    }
  }
  .table2{
    width: 100%;
    margin: 10px 20px 20px 0;
    overflow: hidden;
    & td, & th{
      padding: 10px 0;
    }
  }
  .space-10{
    margin-left: 10px;
  }
  .primary{
    border-color: #1890ff;
    color: #1890ff;
  }
  .btn-startard-edit{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.btn-size{
  & button {
    padding: 0 40px;
    margin: 0 20px;
  }
}

</style>
