<template>
  <a-table
    :columns="columns"
    :data-source="data.data"
    :showHeader="false"
    class="components-table-demo-nested inventory"
  >
    <template #bodyCell="{ column, text, record, index}">
      <template v-if="column.key === 'name'">
        <div class="item-left">
          <div style="margin-right: 40px;">
            <p class="ft16">{{ text }}</p>
            <p>保存条件：{{ record.saveCondition }}</p>
            <template v-if="column.key === 'state'">
              <span class="status">已删除</span>
            </template>
          </div>
          <div style="width: 100px; text-align:right">
            <p class="ft16">{{ record.cas }}</p>
            <a-button type="primary">MSDS</a-button>
          </div>
        </div>
      </template>
      <template v-if="column.key === 'inventory'">
        <div class="item-left">
          <div>
            <p class="ft16">
              库存: <a-typography-text type="warning">5322</a-typography-text>
            </p>
            <p>全新2432瓶 过期234瓶</p>
          </div>
          <div>
            <p><a-tag color="orange">低库存</a-tag></p>
            <p><a-tag color="pink">已过期</a-tag></p>
            <p><a-tag color="blue">即将过期</a-tag></p>
          </div>
        </div>
      </template>
      <template v-if="column.key === 'operation'">
        <div>
          <p>
            <a-button type="text" @click="toNewBatch"><folder-outlined />新批次</a-button>
          </p>
          <p>
            <a-dropdown>
              <a-button type="text" @click.prevent
                ><ellipsis-outlined />更多</a-button
              >
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <delete-outlined />
                    <a href="javascript:;" @click="delStorage(index)">&nbsp;删除</a>
                  </a-menu-item>
                  <a-menu-item>
                    <form-outlined />
                    <a href="javascript:;" >&nbsp;编辑</a>
                  </a-menu-item>
                  <a-menu-item>
                    <snippets-outlined />
                    <router-link to="/checkstorage">&nbsp;详情</router-link>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </p>
        </div>
      </template>
    </template>
    <template #expandedRowRender="{record}">
      <a-table
        :columns="innerColumns"
        :data-source="record.innerData"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'state'">
            <span>
              <a-badge status="success" />
              Finished
            </span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <span class="table-operation">
              <a @click="showModal(record.id)" style="margin-right: 10px;">领用</a>
              <a-dropdown>
                 <a class="ant-dropdown-link" @click.prevent>
                  溯源
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="showModalBS(record.id)"
                      >报损</a-menu-item
                    >
                    <a-menu-item>删除</a-menu-item>
                    <a-menu-item>编辑</a-menu-item>
                    <a-menu-item>复制</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </span>
          </template>
        </template>
      </a-table>
    </template>
  </a-table>

  <a-modal
    v-model:visible="visible"
    title="标准物质领用"
    @ok="handleOk"
    :maskClosable="false"
    okText="领用"
    cancelText="取消"
  >
    <table class="table">
      <tr>
        <td>标准物质名称：</td>
        <td>
          <label>{{ editData.data.name }}</label>
        </td>
        <td>库存剩余量：</td>
        <td>
          <label>{{ editData.data.remainCount }}</label>
        </td>
      </tr>
      <tr>
        <td>CAS：</td>
        <td>
          <label>{{ editData.data.cas }}</label>
        </td>
        <td>标准值/纯度：</td>
        <td>
          <label>{{ editData.data.standardValue }}</label>
        </td>
      </tr>
      <tr>
        <td>产品编号：</td>
        <td>
          <label>{{ editData.data.productNum }}</label>
        </td>
        <td>过期时间至：</td>
        <td>
          <label>{{ editData.data.expireDate }}</label>
        </td>
      </tr>
      <tr>
        <td>自编码：</td>
        <td>
          <label>{{ editData.data.code }}</label>
        </td>
        <td>现库存位置：</td>
        <td>
          <label>{{ editData.data.location }}</label>
        </td>
      </tr>
    </table>

    <table class="table2">
      <tr>
        <td>领取人：</td>
        <td>
          <a-input-group compact>
            <a-select
              v-model:value="lyData.userid"
              style="margin-right: 10px; min-width:100px;"
              @dropdownVisibleChange="reloadUser"
            >
              <a-select-option v-for="user in userList.data" :key="user.id">
                {{user.name}}
              </a-select-option>
            </a-select>
            <a-button @click="openUserManage" type="primary">人员管理</a-button>
          </a-input-group>
        </td>
      </tr>
      <tr>
        <td>领取日期：</td>
        <td>
          <a-date-picker v-model:value="lyData.lydate" style="width: 100%" />
        </td>
      </tr>
      <tr>
        <td>出库人：</td>
        <td>{{ currName }}</td>
      </tr>
    </table>
  </a-modal>
  <a-modal
    v-model:visible="visibleBS"
    title="标准物质领用"
    @ok="handleOkBS"
    :maskClosable="false"
    okText="报损"
    cancelText="取消"
  >
    <table class="table">
      <tr>
        <td>标准物质名称：</td>
        <td>
          <label>{{ editData.data.name }}</label>
        </td>
        <td>CAS：</td>
        <td>
          <label>{{ editData.data.cas }}</label>
        </td>
      </tr>
    </table>

    <a-table :columns="bscolumns" :data-source="bsData.bsdatalist">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="
                tag === 'loser'
                  ? 'volcano'
                  : tag.length > 5
                  ? 'geekblue'
                  : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'operation'">
          <span>
            <a>Delete</a>
          </span>
        </template>
      </template>
    </a-table>

    <hr />
    <table class="table2">
      <tr>
        <td>报损日期：</td>
        <td>
          <a-date-picker v-model:value="bsData.bsdate" style="width: 100%" />
        </td>
      </tr>
      <tr>
        <td>报损原因：</td>
        <td>
          <a-input v-model:value="bsData.bsreason" style="width: 100%" />
        </td>
      </tr>
      <tr>
        <td>存放位置：</td>
        <td>
          <a-input-group compact>
            <a-select
              v-model:value="bsData.location"
              @dropdownVisibleChange="reloadLocation"
              style="width: 69%;"
            >
              <a-select-option
                v-for="location in locationList.data"
                :key="location.id"
                >{{ location.name }}
              </a-select-option>
            </a-select>

            <a-button
              @click="openLocationManage"
              class="primary"
              style="width: 30%; float:right"
              >库存管理</a-button
            >
          </a-input-group>
        </td>
      </tr>
      <tr>
        <td>报损人：</td>
        <td>
          <a-input-group compact>
            <a-select
              v-model:value="bsData.userid"
              style="width: 69%;"
              @dropdownVisibleChange="reloadUser"
            >
              <a-select-option v-for="user in userList.data" :key="user.id">{{
                user.name
              }}</a-select-option>
            </a-select>
            <a-button
              @click="openUserManage"
              class="primary"
              style="width: 30%; float:right"
              >人员管理</a-button
            >
          </a-input-group>
        </td>
      </tr>
    </table>
  </a-modal>
  <MModal v-model:visible="visibleCheck" @ok="hideOk" :title="title" size="small">
  <div>我是内容</div>
  </MModal>
</template>
<script>
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "inventory",
    dataIndex: "inventory",
    key: "inventory",
    width: 400
  },
  {
    title: "operation",
    dataIndex: "operation",
    key: "operation",
    width: 200
  }
]
const innerColumns = [
  {
    title: "自编码",
    dataIndex: "code",
    key: "code"
  },
  {
    title: "批次",
    dataIndex: "batchNum",
    key: "batchNum"
  },
  {
    title: "供应商",
    dataIndex: "supplier",
    key: "supplier"
  },
  {
    title: "发票",
    dataIndex: "invoiceNum",
    key: "invoiceNum"
  },
  {
    title: "单价（RMB）",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "COA证书",
    dataIndex: "certificateNum",
    key: "certificateNum"
  },
  {
    title: "库存余量",
    dataIndex: "remainingAmount",
    key: "remainingAmount"
  },
  {
    title: "过期时间",
    dataIndex: "expireDate",
    key: "expireDate"
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    fixed: "right"
  }
]
const bsColumns = [
  {
    title: "序号",
    dataIndex: "bsnum",
    key: "bsnum"
  },
  {
    title: "自编码",
    dataIndex: "bscode",
    key: "bscode"
  },
  {
    title: "库存余量",
    dataIndex: "bsremainamount",
    key: "bsremainamount"
  },
  {
    title: "存放位置",
    dataIndex: "bslocation",
    key: "bslocation"
  },
  {
    title: "开封日期",
    dataIndex: "bsopendate",
    key: "bsopendate"
  },
  {
    title: "过期时间",
    dataIndex: "bsexpiredate",
    key: "bsexpiredate"
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation"
  }
]

import { defineComponent, ref } from "vue"
import MModal from '../../cps/MModal'
import {
  DeleteOutlined,
  SnippetsOutlined,
  FormOutlined,
  EllipsisOutlined,
  FolderOutlined,
  DownOutlined
} from "@ant-design/icons-vue"
import { useGetMaterials } from "../hooks/useMinventory"
import { useGetLyAndBs } from "../hooks/useGetLyAndBs"

import { getItem } from "@/store/storage"
import { ACCESS_USERNAME } from "@/store/mutation-types"

export default defineComponent({
  components: {
    DeleteOutlined,
    SnippetsOutlined,
    FormOutlined,
    EllipsisOutlined,
    FolderOutlined,
    DownOutlined,
    MModal
  },

  setup() {
    const { data, innerData, searchKey, getMaterialsList ,toNewBatch} = useGetMaterials()
    const {
      editData,
      lyData,
      bsData,
      userList,
      visible,
      handleOk,
      showModal,
      dateFormat,
      handleOkBS,
      showModalBS,
      getBSMaterialsDetails,
      getLocationList,
      openUserManage,
      reloadUser,
      openLocationManage,
      reloadLocation
    } = useGetLyAndBs()

    let currName = getItem(ACCESS_USERNAME)
    let title = ref("删除")
    let visibleCheck = ref(false)

    const delStorage = (index) =>{
      visibleCheck.value = true
      console.log(index, 101)
    }
    const hideOk = () => {
      visibleCheck.value = false
    }
    getMaterialsList()

    return {
      visibleCheck,
      hideOk,
      title,
      dateFormat,
      currName,
      searchKey,
      data,
      columns,
      innerColumns,
      innerData,
      editData,
      userList,
      lyData,
      bsData,
      getMaterialsList,
      visible,
      showModal,
      handleOk,
      bsColumns,
      handleOkBS,
      showModalBS,
      getBSMaterialsDetails,
      getLocationList,
      openUserManage,
      reloadUser,
      openLocationManage,
      reloadLocation,
      toNewBatch,
      delStorage
    }
  }
})
</script>
<style scoped lang="scss">
.inventory {
  position: relative;
  & p {
    margin: 2px 0;
  }
}
.item-left {
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #f0f0f0;
  padding-right: 30px;
}
.status {
  position: absolute;
  left: -40px;
  font-size: 12px;
  color: #999;
}
.ft16 {
  font-size: 16px;
  font-weight: bold;
}
.table {
  width: 100%;
  border-bottom: 1px solid #ccc;
  & td,
  & th {
    padding: 10px 0;
  }
  & td:nth-child(odd) {
    text-align: right;
  }
  & td:nth-child(even) {
    text-align: left;
  }
}

.table2 {
  width: 100%;
  margin: 10px 0 0;
  & td,
  & th {
    padding: 10px 0;
  }
  & td:nth-child(1) {
    text-align: right;
  }
}
</style>
