<template>
  <div class="MInStorage">
    <h1 :style="{ fontSize: '20px'}" align="left">品类标准物质信息</h1>
   <table class="table table-bordered-bg">
     <tr>
       <td><span class="redStar space-R10">*</span>标准物质名称：</td>
       <td colspan="3">环钇已烷</td>
     </tr>
     <tr>
       <td><span class="redStar space-R10">*</span>CAS：</td>
       <td>
          783-2-44
       </td>
       <td><span class="redStar space-R10">*</span>包装单位：</td>
       <td>
         瓶
       </td>
     </tr>
     <tr>
       <td>保存条件：</td>
       <td>
         低温避光
       </td>
       <td><span class="redStar space-R10">*</span>领用后归还提醒：</td>
       <td>
         无需
       </td>
     </tr>
     <tr>
       <td>过期提前提醒：</td>
       <td>
         7天
       </td>
       <td>安全库存预警：</td>
       <td>
         50
       </td>
     </tr>
      <tr>
        <td>英文名称：</td>
        <td>sdfhjdsfds</td>
        <td>危险品类型：</td>
        <td>易燃易爆</td>
      </tr>
      <tr>
        <td>分子式：</td>
        <td>H2SO4</td>
        <td>分子量：</td>
        <td>589.4</td>
      </tr>

    </table>
    <div class="btn-size">
      <a-button :size="size" class="space-10" type="primary">确定</a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "CheckStorage",

  setup() {

    return {
      size: ref('large'),
    }
  },

});
</script>



<style scoped lang="scss">
.MInStorage {
  margin: 0 16px 16px 16px;
  padding: 16px;
  background-color: #fff;
  min-width: 960px;
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

.table-bordered-bg{
  border: 1px solid #f1f1f1;
  & td{
    padding: 10px;
    border: 1px solid #dcdde0;
  }
  & td:nth-child(odd){
    background-color: #f6f6f6;
    width: 10%;
  }
}
  .space-R10{
    margin-right: 10px;
  }
  .redStar{
    color: red;
  }
</style>
