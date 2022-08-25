<template>
  <div class="MInStorage">
    <h1 :style="{ fontSize: '20px'}" align="left">新增品类标准物质</h1>
   <table class="table">
     <tr>
       <td style="width: 10%;"><span class="redstar">*</span>标准物质名称：</td>
       <td colspan="3"><a-input v-model:value="inStorageData.name" placeholder="标准物质名称" :rules="[{ required: true, message: 'Please input your username!' }]"></a-input></td>
     </tr>
     <tr>
       <td><span class="redstar">*</span>CAS：</td>
       <td>
         <a-input-group compact>
           <a-input  v-model:value="inStorageData.cas" style="width: 50%" />&nbsp;
           <a-select  v-model:value="inStorageData.hasCas" style="width: 30%;">
             <a-select-option value="0">无CAS号</a-select-option>
             <a-select-option value="1">有CAS号</a-select-option>
           </a-select>
         </a-input-group>
       </td>
       <td><span class="redstar">*</span>产品编号：</td>
       <td><a-input v-model:value="inStorageData.productNum" placeholder="产品编号"></a-input></td>
     </tr>
     <tr>
       <td><span class="redstar">*</span>规格单位：</td>
       <td>
         <a-input-group compact>
           <a-input v-model:value="inStorageData.ggdwCount" style="width: 50%" />&nbsp;
           <a-select v-model:value="inStorageData.ggdw" style="width: 30%;">
              <a-select-option v-for='ggdw in ggdwList.data' :key='ggdw.id' >{{ ggdw.name }}</a-select-option>
           </a-select>
         </a-input-group>
       </td>
       <td><span class="redstar">*</span>包装单位：</td>
       <td>
         <a-select v-model:value="inStorageData.bzdw" style="width: 40%;">
              <a-select-option v-for='bzdw in bzdwList.data' :key='bzdw.id' >{{ bzdw.name }}</a-select-option>
         </a-select>
       </td>
     </tr>
     <tr>
       <td><span class="redstar">*</span>入库数量：</td>
       <td colspan="3">
         <a-input-group compact>
           <a-input v-model:value="inStorageData.inCount" style="width: 40%" />
           <a-radio-group v-model:value="inStorageData.isOpen" name="radioGroup" class="space-10">
             <a-radio value="0">整瓶全新</a-radio>
             <a-radio value="1">已开封</a-radio>
           </a-radio-group>
         </a-input-group>
       </td>
     </tr>
   </table>

  <div style="text-align: left">
      单瓶独立信息
  </div>
  <div style="text-align: left; padding-top: 10px;">
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加</a-button>
  </div>
    <table class="table table-standard">
      <tr>
        <th>序号</th>
        <th>编码</th>
        <th>使用状态</th>
        <th>剩余量</th>
        <th>开封日期</th>
        <th>操作</th>
      </tr>
      <tr v-for='item in inStorageData.details' :key="item.key">
        <td>{{item.num}}</td>
        <td><a-input v-model:value="item.code" placeholder="单行输入" style="width: 80%;"></a-input></td>
        <td>
          <a-radio-group v-model:value="item.openState" name="radioGroup" class="space-10">
            <a-radio value="0">整瓶全新</a-radio>
            <a-radio value="1">已开封</a-radio>
          </a-radio-group>
        </td>
        <td><a-input v-model:value="item.remainingAmount" placeholder="" style="width: 80px;"></a-input>
          <label class="space-10">ml</label></td>
        <td>
          <a-date-picker v-model:value="item.openDate" :format="dateFormat" />
        </td>
        <td>
          <a-popconfirm
          v-if="inStorageData.details.length-1"
          title="确定要删除吗?"
          @confirm="onDelete(item.key)"
        >
          <a>删除</a>
        </a-popconfirm></td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td style="width: 10%;"><span class="redstar">*</span>批次号：</td>
        <td style="width: 40%"><a-input v-model:value="inStorageData.batchNumber" placeholder="批次号"></a-input></td>
        <td style="width: 10%;"><span class="redstar">*</span>安全库存预警：</td>
        <td style="width: 40%"><a-input v-model:value="inStorageData.safeCount" placeholder="安全库存预警"></a-input></td>
      </tr>
      <tr>
        <td><span class="redstar">*</span>过期时间：</td>
        <td><a-date-picker v-model:value="inStorageData.expireDate" style="width: 100%"/></td>
        <td><span class="redstar">*</span>过期提前提醒：</td>
        <td><a-input v-model:value="inStorageData.expiresEarlyDays" placeholder="7" suffix="天" ></a-input></td>
      </tr>
      <tr>
        <td><span class="redstar">*</span>存放位置：</td>
        <td>
          <a-input-group compact>
            <a-select v-model:value="inStorageData.location" @dropdownVisibleChange="reloadLocation" style="width: 69%;">
              <a-select-option v-for='location in locationList.data' :key='location.id' >{{ location.name }}</a-select-option>
            </a-select>

            <a-button @click="openLocationManage" class="primary" style="width: 30%; float:right">库存管理</a-button>
          </a-input-group>
        </td>
        <td>标准值：</td>
        <td>
          <a-input-group compact>
            <a-input v-model:value="inStorageData.standardValue" style="width: 60%" ></a-input>

            <a-button class="btn-startard-edit" style="width: 39%; float:right">
              <SearchOutlined />
              Search库存管理
              <form-outlined />
            </a-button>
          </a-input-group>
        </td>
      </tr>

      <tr>
        <td>入库日期：</td>
        <td><a-date-picker v-model:value="inStorageData.inDate" style="width: 100%"/></td>
        <td>证书：</td>
        <td rowspan="2">
          <div class="upload-img">
            <a-upload
              v-model:file-list="fileList"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              @preview="handlePreview"
            >
              <div v-if="fileList.length < 8">
                <plus-outlined />
                <div style="margin-top: 8px">上传证书</div>
              </div>
            </a-upload>
          </div>
        </td>
      </tr>
      <tr>
        <td><span class="redstar">*</span>领用后归还提醒：</td>
        <td>
            <a-radio-group v-model:value="inStorageData.needReturn" name="radioGroup" class="space-10">
              <a-radio value="0">无需</a-radio>
              <a-radio value="1">需要</a-radio>
            </a-radio-group>
        </td>
      </tr>
      <tr>
        <td>英文名称：</td>
        <td><a-input v-model:value="inStorageData.enName" placeholder="sfd"></a-input></td>
        <td>保存条件：</td>
        <td><a-input v-model:value="inStorageData.saveCondition" placeholder="低温避光"></a-input></td>
      </tr>
      <tr>
        <td>分子式：</td>
        <td><a-input v-model:value="inStorageData.molecular" placeholder="sfd"></a-input></td>
        <td>分子量：</td>
        <td><a-input v-model:value="inStorageData.molecularWeight" placeholder="7" suffix="天" ></a-input></td>
      </tr>
      <tr>
        <td>供应商：</td>
        <td>
          <a-input-group compact>
            <a-select v-model:value="inStorageData.supplierID" @dropdownVisibleChange="reloadSupplier" style="width: 69%;">
              <a-select-option v-for='supplier in supplierList.data' :key='supplier.id' >{{ supplier.name }}</a-select-option>
            </a-select>

            <a-button @click="openSupplierManage" class="primary" style="width: 30%; float:right">供应商管理</a-button>
          </a-input-group>
        </td>
        <td>证书编号：</td>
        <td><a-input v-model:value="inStorageData.certificateNum" placeholder="sfd"></a-input></td>
      </tr>
      <tr>
        <td>不确定度：</td>
        <td><a-input v-model:value="inStorageData.uncertainty" placeholder="2%" suffix="(K=2)"></a-input></td>
        <td>发票编号：</td>
        <td><a-input v-model:value="inStorageData.invoiceNum" placeholder="7" ></a-input></td>
      </tr>
      <tr>
        <td>单价：</td>
        <td><a-input v-model:value="inStorageData.price" placeholder="200" suffix="RMB" ></a-input></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <div class="btn-size">
      <a-button :size="size">取消</a-button>
      <a-button @click="saveSubmit" :size="size" class="space-10" type="primary" :loading="loadState">确定</a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import {SearchOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons-vue"
import { message } from 'antd';
import { useRouter } from "vue-router"
import {getGGDW,getBZDW,getSupplier,getLocation,saveSubmitMaterials} from "@/service/api/main"
import dayjs from 'dayjs';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });
}
export default defineComponent({
  name: "MInStorage",
  components: {
    SearchOutlined,
    FormOutlined,
    PlusOutlined
  },
  setup() {
    const router = useRouter()
    const dateFormat = 'YYYY-MM-DD';
    let loadState=ref(false)
    let supplierList=reactive({data: [{id:1,name:''}]})
    let locationList=reactive({data: [{id:1,name:''}]})
    let ggdwList=reactive({data: [{id:1,name:''}]})
    let bzdwList=reactive({data: [{id:1,name:''}]})
    let isReloadLocation=ref(false)
    let isReloadSupplier=ref(false)

    let inStorageData = reactive({name:'',cas:'',hasCas:'0',productNum:'',ggdw:'',ggdwCount:'',bzdw:'',inCount:'',isOpen:'0',batchNumber:'',
    safeCount:'',expireDate:'',expiresEarlyDays:'',location:'',standardValue:'',inDate:'',needReturn:'0',enName:'',certificateFile:'',
    saveCondition:'',molecular:'',molecularWeight:'',supplierID:'',certificateNum:'',uncertainty:'',invoiceNum:'',
    price:'',Thumbs:[],
    details:[{
      key: '0',
      num:'1',
      code: 'bw001',
      openState: "0",
      remainingAmount: 100,
      openDate:ref(dayjs(getDate(), dateFormat))}]
    })

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    }
    const previewVisible = ref(false);
    const previewImage = ref('');
    const previewTitle = ref('');
    const fileList = ref([{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]);

    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = '';
    }

    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
    }

    let count = 1//computed(() => inStorageData.details.length + 1)

    const onDelete = key => {
      let startNum=0
      inStorageData.details = inStorageData.details.filter(item => item.key !== key);
      inStorageData.details.forEach(element => {
        element.num=startNum+1
        element.key=startNum
        startNum++
      });
    }

    const handleAdd = () => {
      //console.log(getDate())
      let newData = {
        key: inStorageData.details.length,
        num: inStorageData.details.length+1,
        code: '',
        openState: "0",
        remainingAmount: inStorageData.ggdwCount,
        openDate:ref(dayjs(getDate(), dateFormat))
      }
      inStorageData.details.push(newData);
      count++
    }
    const saveSubmit = () => {
      //console.info(lors.value)

      if(!inStorageData.name)
      {
        message.error("请输入标准物质名称")
        return
      }
      loadState.value = true
      saveSubmitMaterials(inStorageData).then(resp => {
        if (resp.code === 0) {
          message.success("保存成功")
        }
        else if(resp.code === 1)
        {
          message.error(resp.message)
        }
      }).catch(() => {
        loadState.value = false
      }).finally(()=>{
        loadState.value = false
      })
      return
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

    function getGGDWList()
    {
      getGGDW().then(resp => {
        if (resp.code === 0) {
          ggdwList.data=resp.data
          if(resp.data.length>0&&inStorageData.ggdw=='')
          {
            inStorageData.ggdw=resp.data[0].id
          }
        }
      })
    }

    function getBZDWList()
    {
      getBZDW().then(resp => {
        if (resp.code === 0) {
          bzdwList.data=resp.data
          if(resp.data.length>0&&inStorageData.bzdw=='')
          {
            inStorageData.bzdw=resp.data[0].id
          }
        }
      })
    }

    function getSupplierList()
    {
      getSupplier().then(resp => {
        if (resp.code === 0) {
          supplierList.data=resp.data
          if(resp.data.length>0&&inStorageData.supplierID=='')
          {
            inStorageData.supplierID=resp.data[0].id
          }
        }
      })
    }

    function getLocationList()
    {
      getLocation().then(resp => {
        if (resp.code === 0) {
          locationList.data=resp.data
          if(resp.data.length>0&&inStorageData.location=='')
          {
            inStorageData.location=resp.data[0].id
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
    const openSupplierManage=()=>{
      const page = router.resolve({
        name: "Supplier",
        params: {}
      });
      window.open(page.href, '_blank');
      isReloadSupplier.value=true
    }
    const reloadLocation=()=>{
      if(isReloadLocation.value)
      {
        getLocationList()
        isReloadLocation.value=false
      }
    }
    const reloadSupplier=()=>{
      if(isReloadSupplier.value)
      {
        getSupplierList()
        isReloadSupplier.value=false
      }
    }
    getGGDWList()
    getBZDWList()
    getSupplierList()
    getLocationList()

    return {
      dateFormat,
      loadState,
      ggdwList,
      bzdwList,
      supplierList,
      locationList,
      inStorageData,
      checked:true,
      onDelete,
      handleAdd,
      count,
      formItemLayout,
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      previewTitle,
      size: ref('large'),
      saveSubmit,
      openLocationManage,
      openSupplierManage,
      reloadLocation,
      reloadSupplier,
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
  .space-10{
    margin-left: 10px;
  }
  .table-standard{
    & th{
      background-color: #f5f5f5;
      border: 0 none;
    }
    & td{
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: center !important;
    }
    & td:first-child{
      border-left: 1px solid #ccc;
    }
    & td:last-child{
      border-right: 1px solid #ccc;
    }
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

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
  .upload-img{
    & .ant-upload-picture-card-wrapper{
      display: inline;
      width: auto;
    }
  }
.btn-size{
  & button {
    padding: 0 40px;
    margin: 0 20px;
  }
}
</style>
