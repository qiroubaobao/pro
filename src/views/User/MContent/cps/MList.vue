<template>
  <div class="MInventory">
    <h1 :style="{ fontSize: '20px'}" align="left">人员管理</h1>
    <a-form>
      <a-row type="flex">
        <a-col flex="auto" align="left">
          <a-form-item>
            <a-input v-model:value="searchkey" :style="{ width: '300px'}" placeholder="用户姓名"></a-input>
          </a-form-item >
        </a-col>
        <a-col flex="200px">
          <a-form-item>
            <a-space>
            <a-button type="primary" html-type="submit" @click="getUser">查询</a-button>
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
  <a-modal v-model:visible="visible" title="添加用户" @ok="handleOk" maskClosable="false" okText="保存" cancelText="取消">
    <table class="table">
      <tr>
        <td>用户姓名：</td>
        <td>
          <a-input v-model:value="editData.data.username" placeholder="" style="width: 100%;"></a-input>
        </td>
      </tr>
      <tr>
        <td>手机号：</td>
        <td>
          <a-input v-model:value="editData.data.tel" placeholder="" style="width: 100%;"></a-input>
        </td>
      </tr>
      <tr>
        <td>邮箱：</td>
        <td>
          <a-input v-model:value="editData.data.email" placeholder="" style="width: 100%;"></a-input>
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
import {getUserList,getUserDetailsByID,saveSubmitUser,DeleteUser} from "@/service/api/main" 
import {getItem} from '@/store/storage'
import { ACCESS_USERNAME } from '@/store/mutation-types'

  const columns = [{
  title: '姓名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '手机号',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: 'email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
},{
  title: '状态',
  dataIndex: 'disabled',
  key: 'disabled',
},  {
  title: '操作',
  key: 'operation',
}]

export default defineComponent({
  name: "MList",
  components: {
  },
  setup() {
    const dateFormat = 'YYYY-MM-DD';
    let currName=getItem(ACCESS_USERNAME)
    let editID=ref('')
    let data=reactive({data:[]})
    let editData=reactive({data:{username:'',tel:'',email:'',remark:''}})
    let searchkey=ref('')
    let haveDelete=false
    //let formState=inject("tabkey")
    const value = ref(1)

    const getUser=()=>{
      let param={searchkey:searchkey.value}
      getUserList(param).then(resp => {
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
    const getUserDetails=()=>{
      let param={id:editID.value}
      getUserDetailsByID(param).then(resp => {
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
      visible.value = true
      editID.value=id
      getUserDetails()
    };

    const handleOk = () => {
      //console.log(e);
      let params={model:editData.data}
      saveSubmitUser(params).then(resp => {
        if (resp.code === 0) {                
          message.success("保存成功")
          getUser()
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
      DeleteUser(params).then(resp => {
        if (resp.code === 0) {                
          message.success("删除成功")
          getUser()
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

    getUser()
    return {
      dateFormat,
      currName,
      searchkey,
      haveDelete,
      value,
      data,
      columns,
      editData,
      getUserList,
      visible,
      getUser,
      showModal,
      handleOk,
      onDelete,
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
