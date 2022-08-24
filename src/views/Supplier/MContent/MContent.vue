<template>
  <div class="MContent">
    <a-tabs  v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit" @change="tabChange">
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
        <component :is="pane.content"></component>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import { defineComponent, ref,inject, watch  } from 'vue';
  import MList from './cps/MList.vue'
  export default defineComponent({
    components: {
      MList,
    },
    setup() {
    let formState=inject("tabkey")
      const panes = ref([{
        title: '供应商管理',
        content: "MList",
        key: '1',
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
        if(newValue==="1")
        {          
          panes.value.push({
            title: '供应商管理',
            content: "MList",
            key: activeKey.value,
          })
          return
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
        MList,
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
