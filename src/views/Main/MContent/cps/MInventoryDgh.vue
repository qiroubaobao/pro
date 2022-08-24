<template>
  <div class="MInventory">
    <h1 :style="{ fontSize: '20px'}" align="left">归还物料</h1>
    <a-form>
      <a-row type="flex">
        <a-col flex="auto" align="left">
          <a-form-item>
            <a-input v-model:value="searchkey" :style="{ width: '300px'}" placeholder="物料名称"></a-input>
          </a-form-item >
          <!-- <a-form-item :style="{ marginLeft: '50px'}">
            <label :style="{ color: '#999', marginRight: '20px'}">状态选择</label>
            <a-radio-group v-model:value="value">
              <a-radio :value="1">低库存</a-radio>
              <a-radio :value="2">即将过期</a-radio>
              <a-radio :value="3">已过期</a-radio>
            </a-radio-group>
          </a-form-item> -->
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

<a-table :columns="columns" :data-source="data.data" class="components-table-demo-nested">
    <template #bodyCell="{  }">
      <!-- <template v-if="column.key === 'operation'">
        <a>新批次</a>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item>删除</a-menu-item>
              <a-menu-item>编辑</a-menu-item>
              <a-menu-item>详情</a-menu-item>
            </a-menu>
          </template>
          <a>
            ...更多
            <down-outlined />
          </a>
        </a-dropdown>
      </template> -->
    </template>
    <template #expandedRowRender="{record}">
      <a-table :columns="innerColumns" :data-source="record.innerData" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'state'">
            <span>
              <a-badge status="success" />
              Finished
            </span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <span class="table-operation">
              <a @click="showModal(record.id)">归还</a>
              <a style="margin:0 10px 0 10px;">溯源</a>
              <!-- <a-dropdown>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>报损</a-menu-item>
                    <a-menu-item>删除</a-menu-item>
                    <a-menu-item>编辑</a-menu-item>
                    <a-menu-item>复制</a-menu-item>
                  </a-menu>
                </template>
                <a>
                  
                  <down-outlined />
                </a>
              </a-dropdown> -->
            </span>
          </template>
        </template>
      </a-table>
    </template>
  </a-table>
  </div>
  <a-modal v-model:visible="visible" title="标准物质归还" @ok="handleOk" :maskClosable="false" okText="归还" cancelText="取消">
    <table class="table">
      <tr>
        <td>标准物质名称：</td>
        <td>
          <label>{{editData.data.name}}</label>
        </td>
        <td>库存剩余量：</td>
        <td>
          <label>{{editData.data.remainCount}}</label>
        </td>
      </tr>
      <tr>
        <td>CAS：</td>
        <td>
          <label>{{editData.data.cas}}</label>
        </td>
        <td>标准值/纯度：</td>
        <td>
          <label>{{editData.data.standardValue}}</label>
        </td>
      </tr>
      <tr>
        <td>产品编号：</td>
        <td>
          <label>{{editData.data.productNum}}</label>
        </td>
        <td>过期时间至：</td>
        <td>
          <label>{{editData.data.expireDate}}</label>
        </td>
      </tr>
      <tr>
        <td>自编码：</td>
        <td>
          <label>{{editData.data.code}}</label>
        </td>
        <td>现库存位置：</td>
        <td>
          <label>{{editData.data.location}}</label>
        </td>
      </tr>
    </table>
    <hr/>
    <table class="table2">
      <tr>
        <td>归还人：</td>
        <td>
          <a-input-group compact>
            <a-select v-model:value="lyData.userid" style="width: 69%;" @dropdownVisibleChange="reloadUser">
              <a-select-option v-for='user in userList.data' :key='user.id' >{{ user.name }}</a-select-option>
            </a-select>

            <a-button @click="openUserManage" class="primary" style="width: 30%; float:right">人员管理</a-button>
          </a-input-group>
        </td>
      </tr>
      <tr>
        <td>归还日期：</td>
        <td><a-date-picker v-model:value="lyData.ghdate" style="width: 100%"/></td>
      </tr>
      <tr>
        <td>归还剩余量：</td>
        <td><a-input v-model:value="lyData.remainacount" style="width: 100%"></a-input></td>
      </tr>
      <tr>
        <td>开封日期：</td>
        <td><a-date-picker v-model:value="lyData.opendate" style="width: 100%"/></td>
      </tr>
      <tr>
        <td>存放位置：</td>
        <td>
          <a-input-group compact>
            <a-select v-model:value="lyData.locationid" @dropdownVisibleChange="reloadLocation" style="width: 69%;">
              <a-select-option v-for='location in locationList.data' :key='location.id' >{{ location.name }}</a-select-option>
            </a-select>

            <a-button @click="openLocationManage" class="primary" style="width: 30%; float:right">库存管理</a-button>
          </a-input-group>
        </td>
      </tr>
      <tr>
        <td>过期时间至：</td>
        <td><a-date-picker v-model:value="lyData.expiredate" style="width: 100%"/></td>
      </tr>
    </table>
  </a-modal>
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
  title: '标物名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'CAS',
  dataIndex: 'cas',
  key: 'cas',
}, {
  title: '规格/单位',
  dataIndex: 'unit',
  key: 'unit',
}, {
  title: '保存条件',
  dataIndex: 'saveCondition',
  key: 'saveCondition',
},{
  title: '状态',
  dataIndex: 'state',
  key: 'state',
},  {
  title: '操作',
  key: 'operation',
}]

const innerColumns = [{
  title: '自编码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '批次',
  dataIndex: 'batchNum',
  key: 'batchNum',
}, {
  title: '供应商',
  dataIndex: 'supplier',
  key: 'supplier',
}, {
  title: '发票',
  dataIndex: 'invoiceNum',
  key: 'invoiceNum',
},  {
  title: '单价（RMB）',
  dataIndex: 'price',
  key: 'price',
}, {
  title: 'COA证书',
  dataIndex: 'certificateNum',
  key: 'certificateNum',
}, {
  title: '库存余量',
  dataIndex: 'remainingAmount',
  key: 'remainingAmount',
},{
  title: '过期时间',
  dataIndex: 'expireDate',
  key: 'expireDate',
},{
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
}];
export default defineComponent({
  name: "MInventoryDgh",
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
      innerColumns,
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
