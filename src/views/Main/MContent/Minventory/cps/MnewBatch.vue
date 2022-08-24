<template>
  <div class="inventory">
    <h1 class="subTitle">入库新批次该标准如下</h1>
    <a-table
      :columns="columns"
      :data-source="data"
      :showHeader="false"
      :pagination="false"
      class="components-table-demo-nested"
    >
      <template #bodyCell="{ column}">
        <template v-if="column.key === 'name'">
          <div class="item-left">
            <div style="margin-right: 40px;">
              <p class="ft16">甲醇中吡菌磷</p>
              <p>保存条件：低温避光</p>
            </div>
            <div style="width: 100px; text-align:right">
              <p class="ft16">3457-18-6</p>
              <a-button type="primary">MSDS</a-button>
            </div>
          </div>
        </template>
        <template v-if="column.key === 'inventory'">
          <div class="item-left br-none">
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
      </template>
    </a-table>
    <h1 class="subTitle">本批次入库详情</h1>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="text-align: left"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="规格单位"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input />
                </a-col>
                <a-col :span="4">
                  <a-select style="width:100%">
                    <a-select-option value="ML">ML</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="入库日期"
            name="date-picker"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-date-picker style="width:100%" v-model:value="formState['date-picker']" value-format="YYYY-MM-DD" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="入库数量"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-space>
              <a-button>-</a-button>
            <a-input style="width: 100px;" v-model:value="formState.username" />

              <a-button>+</a-button>
            </a-space>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="过期时间"
            name="date-picker"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >

            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-date-picker style="width:100%" v-model:value="formState['date-picker']" value-format="YYYY-MM-DD" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>

    <h1 class="subTitle">单瓶独立信息</h1>

    <table class="table table-standard">
      <tr>
        <th>序号</th>
        <th>编码</th>
        <th>使用状态</th>
        <th>剩余量</th>
        <th>开封日期</th>
      </tr>
      <tr>
        <td>1</td>
        <td><a-input placeholder="单行输入" style="width: 80%;"></a-input></td>
        <td>
          <a-radio-group  name="radioGroup" class="space-10">
            <a-radio value="0">整瓶全新</a-radio>
            <a-radio value="1">已开封</a-radio>
          </a-radio-group>
        </td>
        <td><a-input placeholder="" style="width: 80px;"></a-input>
          <label class="space-10">ml</label></td>
        <td>
          <a-date-picker :format="dateFormat" />
        </td>
      </tr>
    </table>

    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="text-align: left"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="批次号"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input v-model:value="formState.username" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="产品编号"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input v-model:value="formState.username" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="标准值"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input v-model:value="formState.username" />
                </a-col>
                <a-col :span="5">
                  <a-button type="primary">编辑</a-button>
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="存放位置"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-select style="width:100%">
                    <a-select-option value="ML">ML</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="5">

                  <a-button type="primary" >库存管理</a-button>
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
          label="上传证书"
          :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-upload
              v-model:file-list="fileList"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              @preview="handlePreview"
            >
              <div v-if="fileList.length < 8">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="不确定度"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >

            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input v-model:value="formState.username" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="介质/溶酸"
            name="date-picker"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input v-model:value="formState.username" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="定值日期"
            name="date-picker"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-date-picker style="width:100%" v-model:value="formState['date-picker']" value-format="YYYY-MM-DD" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="证书编号"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input v-model:value="formState.username" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>

      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="供应商"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-select style="width:100%">
                    <a-select-option value="ML">ML</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="5">
                  <a-button type="primary" >管理供应商</a-button>
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="购入日期"
            name="date-picker"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-date-picker style="width:100%" v-model:value="formState['date-picker']" value-format="YYYY-MM-DD" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="单价"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input />
                </a-col>
                <a-col :span="5"> /&nbsp;
                  <a-select style="width:80%">
                    <a-select-option value="ML">瓶</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="发票编号"
            name="date-picker"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >

            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-input v-model:value="formState.username" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
    <div style="text-align: center">
      <a-button size="large" style="width: 100px; margin-right: 40px;" type="primary">保存</a-button>
      <a-button size="large"  style="width: 100px" >取消</a-button>
    </div>

  </div>
  <a-button type="primary" @click="showModal">Modal</a-button>
  <a-modal
    v-model:visible="visible"
    title="报损"
    ok-text="确认"
    cancel-text="取消"
    width="900px"
    @ok="hideModal"
  >
    <div class="modal">
      <h1 class="subTitle">标准物质报损, 共3个</h1>
      <table class="table table-bordered-bg" >
        <tr>
          <td>名称：</td>
          <td>环氧已烷</td>
          <td>CAS：</td>
          <td>243-22</td>
        </tr>
      </table>
      <a-table bordered  :columns="columnsBs" :data-source="dataBS" :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
        <span>
          序号
        </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
        <span>
          <a-typography-text type="success">全新未开</a-typography-text>
        </span>
          </template>
          <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
        </span>
          </template>
        </template>
      </a-table>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        style="margin-top: 20px;"
      >
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="过期时间"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <a-input-group>
                <a-row :gutter="8">
                  <a-col :span="16">
                    <a-date-picker style="width:100%" v-model:value="formState['date-picker']" value-format="YYYY-MM-DD" />
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="存放位置"
              name="username"
            >
              <a-input-group>
                <a-row :gutter="8">
                  <a-col :span="12">
                    <a-select style="width:100%">
                      <a-select-option value="ML">ML</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="5">

                    <a-button type="primary" >库存管理</a-button>
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="报损原因"
              name="username"
            >
              <a-input-group>
                <a-row :gutter="8">
                  <a-col :span="16">
                    <a-input v-model:value="formState.username"  />
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="报损人"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <a-input-group>
                <a-row :gutter="8">
                  <a-col :span="12">
                    <a-input v-model:value="formState.username"  />
                  </a-col>
                  <a-col :span="5">

                    <a-button type="primary" >人员管理</a-button>
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>

      <h1 class="subTitle" style="text-align: center">批量添加自编码</h1>
      <p style="text-align: center"><img style="width: 80%" :src="sample.url" alt=""></p>
      <table class="table table-bordered-bg">
        <tr>
          <td width="120px">输入</td>
          <td>
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="3">
                  <a-input v-model:value="value1" placeholder="前缀" />
                </a-col>
                <a-col :span="4">
                  <a-input v-model:value="value2" placeholder="起始序号" />
                </a-col>
                <a-col :span="4">
                  <a-input v-model:value="value2" placeholder="结束序号"/>
                </a-col>
                <a-col :span="3">
                  <a-input v-model:value="value2" placeholder="后缀" />
                </a-col>
                <a-col>
                  <a-button type="primary" ghost>批量生成自编码</a-button>
                </a-col>
              </a-row>
            </a-input-group>
          </td>
        </tr>
        <tr>
          <td>生成自编码</td>
          <td>
            <a-row :gutter="8" class="codeBox">
              <a-col :span="6">col-8</a-col>
              <a-col :span="6">col-8</a-col>
              <a-col :span="6">col-8</a-col>
            </a-row>
            <a-row :gutter="8" class="codeBox">
              <a-col :span="6">col-8</a-col>
              <a-col :span="6">col-8</a-col>
              <a-col :span="6">col-8</a-col>
            </a-row>
            <a-row :gutter="8" class="codeBox">
              <a-col :span="6">col-8</a-col>
              <a-col :span="6">col-8</a-col>
              <a-col :span="6">col-8</a-col>
            </a-row>
          </td>
        </tr>
      </table>
      <a-alert message="报损后将不允许再领取使用" type="info" show-icon />


      <a-alert
        message="准备删除"
        description="删除会影响统计类相关信息，除非以后不再涉及该品，否则不推荐删除"
        type="warning"
        show-icon
      />
      <table class="table table-bordered-bg" >
        <tr>
          <td width="180px">标准物质名称：</td>
          <td>甲苯</td>
        </tr>
      </table>

      <a-alert
        message="确认删除"
        description="删除会影响统计类相关信息，除非以后不再涉及该品，否则不推荐删除"
        type="warning"
        show-icon
      />
      <table class="table table-bordered-bg" >
        <tr>
          <td width="180px">标准物质名称：</td>
          <td colspan="3">甲苯</td>
        </tr>
        <tr>
          <td width="180px">库存量：</td>
          <td>5</td>
          <td width="180px">出入库操作记录：</td>
          <td>20条</td>
        </tr>
      </table>
      <a-alert
        message="领取成功"
        description="请前往“一层三楼”领取"
        type="success"
        show-icon
      />

      <section style="margin-top: 40px;">
      <h1 class="subTitle" >品类预警</h1>
      <p>
        该品类 <span class="ft16">“甲醇中吡菌磷”</span><strong class="red ft16">低于安全库存</strong>，请尽快补充
      </p>
      <table class="table table-bordered-bg" >
        <tr>
          <td width="180px">安全库存量预警：</td>
          <td>20</td>
          <td width="180px">库存量：</td>
          <td>5</td>
        </tr>
      </table>
      </section>
      <section style="margin-top: 40px;">
      <h1 class="subTitle" >单个物品警告</h1>
      <p>
        该标准物质 <strong class="red ft16">已过期</strong>，请尽快报损处理
      </p>
      <p>
        该标准物质 <strong class="red ft16">即将过期</strong>，请下次优先使用
      </p>

      <table class="table table-bordered-bg" >
        <tr>
          <td width="180px">过期时间：</td>
          <td colspan="3">243-22</td>

        </tr>
      </table>
      </section>
    </div>
  </a-modal>
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
    key: "inventory"
  }
]
const data = [
  {

  }
]
const columnsBs = [
  {
  name: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
}, {
  title: 'Action',
  key: 'action',
}];
const dataBS = [
  {
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

import { defineComponent, reactive, ref } from 'vue'

import { Modal } from 'ant-design-vue';
export default defineComponent({
  name: "NewBatch",
  setup() {
    const sample = reactive({
      url: require("/src/assets/sample.png")
    })
    const formState = reactive({
      username: '',
      password: '',
    });

    const fileList = ref([{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]);

    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const hideModal = () => {

      Modal.confirm({
        title: '确认删除',
        content: 'Some descriptions',
        okText: '确认删除',
        cancelText: '取消',

        onOk() {
          console.log('OK');

          visible.value= false
        },

        onCancel() {
          console.log('Cancel');
        },

      });
    };

    return {
      columns,
      data,
      formState,
      fileList,
      showModal,
      hideModal,
      visible,
      columnsBs,
      dataBS,
      sample

    }
  }
})
</script>
<style scoped lang="scss">
.modal {
  position: relative;
  padding: 0 40px;
  & p {
    margin: 2px 0;
  }
}
.subTitle{
  margin: 20px 0;
  text-align: left;
  font-size: 20px;
}
.item-left {
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  border-right: 1px solid #ccc;
}
.br-none{
  border-right: 0 none;
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
}.table{
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
.table-bordered-bg{
  border: 1px solid #f1f1f1;
  & td{
    padding: 10px;
    border: 1px solid #dcdde0;
  }
  & td:nth-child(odd){
    background-color: #f6f6f6;
  }
}
.codeBox{
  & .ant-col{
    margin: 8px;
    padding: 5px 0;
    border: 1px solid #ddd;
    text-align: center;
  }
}
  .red{
    color: red;
  }

</style>
