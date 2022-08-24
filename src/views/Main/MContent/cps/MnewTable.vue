<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 800 }" :showHeader="false" class="components-table-demo-nested inventory">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'name'" >
        <div class="item-left">
          <div style="margin-right: 40px;">
            <p class="ft16">四氯乙烯测试标准物质标准四氯乙烯测试标准物质标准</p>
            <p>保存条件: 阴凉干燥，通风，阴凉干燥，通风阴凉干燥，通风阴凉干燥，通风阴凉干燥，通风阴凉干燥，通风</p>
            <span class="status">已删除</span>
          </div>
          <div>
            <p class="ft16">484-20-8</p>
            <a-button type="primary">MSDS</a-button>
          </div>
        </div>
      </template>
      <template v-if="column.key === 'inventory'">
        <div class="item-left">
          <div>
            <p class="ft16">库存:  <a-typography-text type="warning">5322</a-typography-text></p>
            <p>全新2432瓶  过期234瓶</p>
          </div>
          <div>
            <p><a-tag color="orange">低库存</a-tag></p>
            <p><a-tag color="pink">已过期</a-tag></p>
            <p> <a-tag color="blue">即将过期</a-tag></p>
          </div>
        </div>
      </template>
      <template v-if="column.key === 'operation'">
        <div>
        <p> <a-button type="text"><folder-outlined />新批次</a-button></p>
        <p>
          <a-dropdown>
            <a-button type="text"  @click.prevent><ellipsis-outlined />更多</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <delete-outlined />
                  <a href="javascript:;">&nbsp;删除</a>
                </a-menu-item>
                <a-menu-item>
                  <form-outlined />
                  <a href="javascript:;">&nbsp;编辑</a>
                </a-menu-item>
                <a-menu-item>
                  <snippets-outlined />
                  <a href="javascript:;">&nbsp;详情</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </p>
      </div>
      </template>
    </template>
    <template #expandedRowRender>
      <a-table :row-selection="rowSelection" :columns="innerColumns" :data-source="data" :scroll="{ x: 1500, y: 300 }"  :pagination="false">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>action</a>
          </template>
        </template>
      </a-table>
    </template>
  </a-table>
</template>
<script>
  import { defineComponent } from 'vue';
  import { DeleteOutlined, SnippetsOutlined, FormOutlined, EllipsisOutlined, FolderOutlined } from "@ant-design/icons-vue"
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'inventory',
    dataIndex: 'inventory',
    key: 'inventory',
    width: 400
  }, {
    title: 'operation',
    dataIndex: 'operation',
    key: 'operation',
    width: 200
  }];
  const innerColumns = [
    {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  }, {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  }, {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  }, {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  }, {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  }, {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  }, {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  }, {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  }, {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  }, {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  }, {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  }];
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  export default defineComponent({
    components: {
      DeleteOutlined,
      SnippetsOutlined,
      FormOutlined,
      EllipsisOutlined,
      FolderOutlined
    },

    setup() {
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
      return {
        data,
        columns,
        innerColumns,
        rowSelection
      };
    },

  });
</script>
<style scoped lang="scss">
  .inventory{
    position: relative;
   & p{
     margin: 2px 0;
   }
  }
  .item-left{
    display: flex;
    justify-content: space-between;
    border-right: 1px solid #f0f0f0;
    padding-right: 30px;
  }
  .status{
    position: absolute;
    left: -40px;
    font-size: 12px;
    color: #999;
  }
  .ft16{
    font-size: 16px;
    font-weight: bold;
  }
</style>
