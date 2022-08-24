<template>
  <div class="MContent">
    <a-tabs  v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit" @change="tabChange">
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
        <component :is="pane.content"></component>
      </a-tab-pane>
      <!-- {
      panes.value.map((pane)=>{(
        <a-tab-pane :key="pane.key" :tab="pane.title" :closable="pane.closable">
          <m-inventory />
        </a-tab-pane>
      })} -->
      <!-- <a-tab-pane key="1" tab="入库管理" :closable="false">
          <m-inventory />
      </a-tab-pane> -->
      <!--<a-tab-pane key="2" tab="库存管理">
          <m-inventory />
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>
<script>
  import { defineComponent, ref,inject, watch  } from 'vue';
  import MInventory from './Minventory/MInventory.vue'
  import MInStorage from './cps/MInStorage.vue'
  import MInventoryDgh from './cps/MInventoryDgh.vue'
  export default defineComponent({
    components: {
      MInventory,
      MInStorage,
      MInventoryDgh,
    },
    setup() {
    let formState=inject("tabkey")
      const panes = ref([{
        title: '库存管理',
        content: "MInventory",
        key: '2',
      }])

    let activeKey = formState
    watch(formState,(newValue)=>{
      newValue+=""
      let isHave=false
      panes.value.forEach((pane) => {
        if (pane.key === newValue) {
          activeKey.value=newValue
          isHave=true
        }
      })
      if(!isHave)
      {
        add(newValue)
      }
    })
      const add = (newValue) => {
        activeKey.value = newValue
        if(newValue==="inStorage")
        {
          panes.value.push({
            title: '新增品类标准物质',
            content: "MInStorage",
            key: activeKey.value,
          })
          return
        }
        else if(newValue==="2")
        {
          panes.value.push({
            title: '库存管理',
            content: "MInventory",
            key: activeKey.value,
          })
        }
        else if(newValue==="3")
        {
          panes.value.push({
            title: '归还物料',
            content: "MInventoryDgh",
            key: activeKey.value,
          })
        }
      }

      const remove = targetKey => {
        let lastIndex = 0
        panes.value.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1
          }
        })
        panes.value = panes.value.filter(pane => pane.key !== targetKey);

        if (panes.value.length && activeKey.value === targetKey) {
          if (lastIndex >= 0) {
            activeKey.value = panes.value[lastIndex].key
          } else {
            activeKey.value = panes.value[0].key
          }
        }
      }
      const onEdit = (targetKey) => {
        //console.log(targetKey)
        remove(targetKey)
      }
      const tabChange=() => {
        formState.value=activeKey.value
      }

      return {
        MInventory,
        MInStorage,
        MInventoryDgh,
        panes,
        activeKey,
        onEdit,
        formState,
        tabChange,
      };
    },

  });
</script>
<style>
  .MContent{
    margin: 16px;
  }
  .MContent p {
    margin: 0;
  }
  .MContent > .ant-tabs-card .ant-tabs-content {
    margin-top: -16px;
  }
  .MContent > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    padding: 16px;
    background: #fff;
  }
  .MContent > .ant-tabs-card > .ant-tabs-nav::before {
    display: none;
  }
  .MContent > .ant-tabs-card .ant-tabs-tab,
  [data-theme='compact'] .MContent > .ant-tabs-card .ant-tabs-tab {
    background: #f5f5f5;
    border-color: transparent;
  }
  .MContent > .ant-tabs-card .ant-tabs-tab-active,
  [data-theme='compact'] .MContent > .ant-tabs-card .ant-tabs-tab-active {
    background: #fff;
    border-color: #fff;
  }
  #components-tabs-demo-card-top .code-box-demo {
    padding: 24px;
    overflow: hidden;
    background: #f5f5f5;
  }
  [data-theme='compact'] .MContent > .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -8px;
  }
  [data-theme='dark'] .MContent > .ant-tabs-card .ant-tabs-tab {
    background: #f5f5f5;
    border-color: transparent;
  }
  [data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
    background: #000;
  }
  [data-theme='dark'] .MContent > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    background: #141414;
  }
  [data-theme='dark'] .MContent > .ant-tabs-card .ant-tabs-tab-active {
    background: #141414;
    border-color: #141414;
  }
</style>
