<template>
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item label="批次号" name="pcnum">
      <a-input
        v-model:value="formState.pcnum"
        type="input"
        placeholder="请输入用户名"
      />
    </a-form-item>
    <a-form-item label="编码" name="code">
      <a-input
        v-model:value="formState.code"
        type="input"
        placeholder="请输入编码"
      />
    </a-form-item>
    <a-form-item label="规格单位" name="gd">
      <a-input v-model:value="formState.gd" type="input" placeholder="请输入规格"/>
    </a-form-item>
    <a-form-item name="select" label="存放位置">
      <a-select
        v-model:value="formState.select"
        placeholder="请选择存放位置"
      >
        <a-select-option value="china">China</a-select-option>
        <a-select-option value="usa">U.S.A</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item name="rkdate" label="入库日期">
      <a-date-picker v-model:value="formState.rkdate" value-format="YYYY-MM-DD" />
    </a-form-item>
    <a-form-item
      label="入库数量"
      name="rknum"
    >
      <a-space>
        <a-input-number v-model:value="formState.rknum" :min="1" />
      </a-space>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref } from "vue"
export default defineComponent({
  setup() {
    const formRef = ref()
    const formState = reactive({
      code: "",
      pcnum: "",
      select: undefined,
      gd: "",
      rkdate: "",
      rknum: ""
    })

    // let checkSelect = async (_rule, value) => {
    //   if (value === "") {
    //     return Promise.reject()
    //   } else {
    //     if (formState.checkSelect !== "") {
    //       formRef.value.validateFields("checkSelect")
    //     }
    //
    //     return Promise.resolve()
    //   }
    // }

    const rules = {
      gd: [
        {
          required: true,
          trigger: "blur",
          message: "请输入规格"
        },
        {
          trigger: "blur",
          pattern: /^\+?[1-9][0-9]*$/,
          message: "规格只能是数字，并且不能为0"
        },
      ],
      rkdate: [
        {
          required: true,
          trigger: "blur",
          message: "请选择入库日期"
        }
      ],
      code: [
        {
          required: true,
          trigger: "blur",
          message: "请输入编码"
        }
      ],
      pcnum: [
        {
          required: true,
          message: "请输入批次号",
          trigger: "blur"
        }
      ],
      rknum: [
        {
          required: true,
          message: "请输入入库数量",
          trigger: "blur"
        }
      ],
      select: [
        {
          required: true,
          trigger: "blur",
          message: "请选择存放位置"
        }
      ]
    }
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    }

    const handleFinish = values => {
      console.log(values, formState)
    }

    const handleFinishFailed = errors => {
      console.log(errors)
    }

    const resetForm = () => {
      formRef.value.resetFields()
    }

    const handleValidate = (...args) => {
      console.log(args)
    }

    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate
    }
  }
})
</script>
