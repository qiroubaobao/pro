<template>
  <div class="MInventory">
    <h1 :style="{ fontSize: '20px'}" align="left">库存管理</h1>
    <Search></Search>
  </div>
  <div class="MTable">
    <a-row type="flex">
      <a-col flex="220px" align="left">
        <a-checkbox v-model:checked="haveDelete">显示已删除物料信息</a-checkbox>
      </a-col>
      <a-col flex="auto" align="right">
        <a-space>
          <a-button @click="toAddStorage">
            <template #icon>
              <folder-add-outlined/>
            </template>
            新入库
          </a-button>
          <a-button @click="toAddStorage">
            <template #icon>
              <folder-add-outlined/>
            </template>
            从Excel导入
          </a-button>
          <a-button @click="toAddStorage">
            <template #icon>
              <folder-add-outlined/>
            </template>
            批量删除
          </a-button>
          <a-button @click="toAddStorage">
            <template #icon>
              <folder-add-outlined/>
            </template>
            批量报损
          </a-button>
          <a-button @click="toAddStorage">
            <template #icon>
              <folder-add-outlined/>
            </template>
            调整管理内容
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <VentoryList></VentoryList>
    <MIndex></MIndex>
  </div>
</template>
<script>
  import { FolderAddOutlined } from '@ant-design/icons-vue'
  import { defineComponent, inject } from 'vue'
  import Search from './cps/Search.vue'
  import VentoryList from './cps/VentoryList'
  import { getItem } from '@/store/storage'
  import { ACCESS_USERNAME } from '@/store/mutation-types'
  import MIndex from "../cps/MIndex"

  const columns = [
    {
      title: '标物名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'CAS',
      dataIndex: 'cas',
      key: 'cas'
    }, {
      title: '规格/单位',
      dataIndex: 'unit',
      key: 'unit'
    }, {
      title: '保存条件',
      dataIndex: 'saveCondition',
      key: 'saveCondition'
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state'
    }, {
      title: '操作',
      key: 'operation'
    }]

  const innerColumns = [
    {
    title: '自编码',
    dataIndex: 'code',
    key: 'code'
  }, {
    title: '批次',
    dataIndex: 'batchNum',
    key: 'batchNum'
  }, {
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier'
  }, {
    title: '发票',
    dataIndex: 'invoiceNum',
    key: 'invoiceNum'
  }, {
    title: '单价（RMB）',
    dataIndex: 'price',
    key: 'price'
  }, {
    title: 'COA证书',
    dataIndex: 'certificateNum',
    key: 'certificateNum'
  }, {
    title: '库存余量',
    dataIndex: 'remainingAmount',
    key: 'remainingAmount'
  }, {
    title: '过期时间',
    dataIndex: 'expireDate',
    key: 'expireDate'
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation'
  }]

  const bscolumns = [
    {
    title: '序号',
    dataIndex: 'bsnum',
    key: 'bsnum'
  }, {
    title: '自编码',
    dataIndex: 'bscode',
    key: 'bscode'
  }, {
    title: '库存余量',
    dataIndex: 'bsremainamount',
    key: 'bsremainamount'
  }, {
    title: '存放位置',
    dataIndex: 'bslocation',
    key: 'bslocation'
  }, {
    title: '开封日期',
    dataIndex: 'bsopendate',
    key: 'bsopendate'
  }, {
    title: '过期时间',
    dataIndex: 'bsexpiredate',
    key: 'bsexpiredate'
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation'
  }]

  export default defineComponent({
    name: 'MInventory',
    components: {
      FolderAddOutlined,
      Search,
      VentoryList,
      MIndex
    },
    setup() {

      let currName = getItem(ACCESS_USERNAME)
      let formState = inject('tabkey')
      const toAddStorage = () => {
        formState.value = 'inStorage'
      }
      return {
        columns,
        innerColumns,
        bscolumns,
        currName,
        toAddStorage
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
