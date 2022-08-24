<template>
  <div class="MInventory">
    <h1 :style="{ fontSize: '20px'}" align="left">供应商管理</h1>
    <a-form>
      <a-row type="flex">
        <a-col flex="auto" align="left">
          <a-form-item>
            <a-input v-model:value="searchkey" :style="{ width: '300px'}" placeholder="供应商名称"></a-input>
          </a-form-item >
        </a-col>
        <a-col flex="200px">
          <a-form-item>
            <a-space>
            <a-button type="primary" html-type="submit" @click="getSupplier">查询</a-button>
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
        <a-button size="small" @click="showModal">
          <template #icon><folder-add-outlined /></template>
            添加
        </a-button>
      </a-col>
    </a-row>
<!-- <div style="width:100%; height:20px;"></div>
    <a-row type="flex">
      <a-col flex="220px" align="left">
        <a-checkbox v-model:checked="haveDelete">显示已删除供应商信息</a-checkbox>
      </a-col>
    </a-row> -->
<div style="width:100%; height:10px;"></div>

<a-table :columns="columns" :data-source="data.data">
    <template #bodyCell="{ column,record }">      
      <template v-if="column.key === 'operation'">
        <span>
          <a @click="showModal(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm
          title="确定要删除吗?"
          @confirm="onDelete(record.id)"
        >
          <a>删除</a>
        </a-popconfirm>
        </span>
      </template>
    </template>
  </a-table>
  </div>
  <a-modal v-model:visible="visible" title="添加供应商" @ok="handleOk" maskClosable="false" okText="保存" cancelText="取消">
    <table class="table">
      <tr>
        <td>供应商名称：</td>
        <td>
          <a-input v-model:value="editData.data.supplierName" placeholder="" style="width: 100%;"></a-input>
        </td>
      </tr>
      <tr>
        <td>联系人：</td>
        <td>
          <a-input v-model:value="editData.data.contactName" placeholder="" style="width: 100%;"></a-input>
        </td>
      </tr>
      <tr>
        <td>联系电话：</td>
        <td>
          <a-input v-model:value="editData.data.contactTel" placeholder="" style="width: 100%;"></a-input>
        </td>
      </tr>
      <tr>
        <td>所在地：</td>
        <td>
          <table style="width:100%">
            <tr>
              <td style="width:33%; padding-right: 5px;">
            <a-select v-model:value="editData.data.provinceID" @change='handleChange1' style="width: 100%" placeholder="省份">
              <a-select-option v-for='province in provinceList.data' :key='province.id' >{{ province.name }}</a-select-option>
            </a-select>
            </td>
            <td style="width:33%; padding-right: 5px;">
            <a-select v-model:value="editData.data.cityID" @change='handleChange2' style="width: 100%" placeholder="市">
              <a-select-option v-for='city in cityList.data' :key='city.id'>{{ city.name }}</a-select-option>
            </a-select>
            </td><td style="width:33%">
            <a-select v-model:value="editData.data.areaID" @change='handleChange3' style="width: 100%" placeholder="区/县">
              <a-select-option v-for='area in areaList.data' :key='area.id'>{{ area.name }}</a-select-option>
            </a-select>
            </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>税点：</td>
        <td>
          <a-input v-model:value="editData.data.taxPoint" placeholder="" style="width: 100%;"></a-input>
        </td>
      </tr>
      <tr>
        <td>备注：</td>
        <td>
          <a-input v-model:value="editData.data.remark" placeholder="" style="width: 100%;"></a-input>
        </td>
      </tr>
    </table>    
  </a-modal>
</template>
<script>
import { defineComponent, ref, reactive } from "vue"
import { message } from 'antd';
import {getSupplierList,getSupplierDetailsByID,saveSubmitSupplier,DeleteSupplier} from "@/service/api/main" 
import { getProvince,getCity,getArea } from "@/service/api" 
import dayjs from 'dayjs';
import {getItem} from '@/store/storage'
import { ACCESS_USERNAME } from '@/store/mutation-types'

  const columns = [{
  title: '供应商名称',
  dataIndex: 'supplierName',
  key: 'supplierName',
}, {
  title: '联系人',
  dataIndex: 'contactName',
  key: 'contactName',
}, {
  title: '联系电话',
  dataIndex: 'contactTel',
  key: 'contactTel',
}, {
  title: '地区',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '税点',
  dataIndex: 'taxPoint',
  key: 'taxPoint',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
},{
  title: '状态',
  dataIndex: 'state',
  key: 'state',
},  {
  title: '操作',
  key: 'operation',
}]

export default defineComponent({
  name: "MList",
  components: {
  },
  setup() {
    let provinceList=reactive({data: [{id:'1',name:'省'}]})
    let cityList=reactive({data: [{id:'1',name:'市'}]})
    let areaList=reactive({data: [{id:'1',name:'区'}]})
    const dateFormat = 'YYYY-MM-DD';
    let currName=getItem(ACCESS_USERNAME)
    let editID=ref('')
    let data=reactive({data:[]})
    let editData=reactive({data:{supplierName:'',contactName:'',contactTel:'',provinceID:'',provinceName:'',cityID:'',cityName:'',areaID:'',areaName:'',taxPoint:'',remark:''}})
    let searchkey=ref('')
    let haveDelete=false
    //let formState=inject("tabkey")
    const value = ref(1)
    let userList=reactive({data: [{id:1,name:''}]})
    let lyData = reactive({userid:'',lydate:''})

    const getSupplier=()=>{
      let param={searchkey:searchkey.value}
      getSupplierList(param).then(resp => {
        if (resp.code === 0) {
          data.data=resp.data
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
    const getSupplierDetails=()=>{      
      let param={id:editID.value}
      getSupplierDetailsByID(param).then(resp => {
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

    const visible = ref(false);

    const showModal = (id) => {
      getProvinceList()
      visible.value = true
      editID.value=id
      getSupplierDetails()
      lyData.lydate=ref(dayjs(getDate(), dateFormat))
    };

    const handleOk = () => {
      //console.log(e);
      let params={model:editData.data}
      saveSubmitSupplier(params).then(resp => {
        if (resp.code === 0) {                
          message.success("保存成功")
          getSupplier()
          visible.value = false;
        }
        else if(resp.code === 1)
        {
          message.error(resp.message)
        }
      })
      .catch(() => {
      }).finally(()=>{
      })
    };
    
    const onDelete=(id)=>{
      let params={id:id}
      DeleteSupplier(params).then(resp => {
        if (resp.code === 0) {                
          message.success("删除成功")
          getSupplier()
          visible.value = false;
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
function getProvinceList()
    {
      getProvince().then(resp => {
        if (resp.code === 0) {          
          provinceList.data=resp.data
        }
        else if(resp.code === 1)
        {
          message.error("获取失败")
        }
        else
        {
          message.error("服务器忙")
        }
      })
      .catch(() => {
        message.error("服务器错误")
      }).finally(()=>{
    })
    }
    function getCityList(id)
    {
      let param={Pid:id}
      getCity(param).then(resp => {
        if (resp.code === 0) {
          editData.data.cityID=''
          editData.data.areaID=''
          cityList.data=resp.data
        }
        else if(resp.code === 1)
        {
          message.error("获取失败")
        }
        else
        {
          message.error("服务器忙")
        }
      })
      .catch(() => {
        message.error("服务器错误")
      }).finally(()=>{
    })
    }
    function getAreaList(id)
    {
      let param={Cid:id}
      getArea(param).then(resp => {
        if (resp.code === 0) {
          editData.data.areaID=''
          areaList.data=resp.data
        }
        else if(resp.code === 1)
        {
          message.error("获取失败")
        }
        else
        {
          message.error("服务器忙")
        }
      })
      .catch(() => {
        message.error("服务器错误")
      }).finally(()=>{
    })
    }
    function handleChange1(value) {      
      editData.data.provinceID=value
      getCityList(value)
      areaList.data=[]
    }
    function handleChange2(value) {
      editData.data.cityID=value
      getAreaList(value)
    }
    function handleChange3(value) {
      editData.data.areaID=value
    }

    getSupplier()
    return {
      provinceList,
      cityList,
      areaList,
      dateFormat,
      currName,
      searchkey,
      haveDelete,
      value,
      data,
      columns,
      editData,
      userList,
      lyData,
      getSupplierList,
      visible,
      getSupplier,
      showModal,
      handleOk,
      onDelete,
      handleChange1,
      handleChange2,
      handleChange3,
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
