<template>
  <a-modal :title="title" :maskClosable="maskClosable" :width="customizeWidth">
    <slot></slot>
  </a-modal>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"

export default defineComponent({
  name: "CheckStorage",
  props: {
    title: String,

    // 点击蒙层是否允许关闭
    maskClosable: {
      type: Boolean,
      default: false
    },
    // 大小设置 mini / small / medium
    size: {
      type: String,
      default: ""
    },
    // 宽度 520 / 650 / 750 / 900
    width: {
      type: Number,
      default: 520
    }
  },
  setup(props) {
    const customizeWidth = ref()

    const sizeObj = { mini: 650, small: 750, medium: 900 }
    console.log(props)

    onMounted(() => {
      setWidth()
    })

    const setWidth = () => {
      Object.keys(sizeObj).forEach(key => {
        if (key === props.size) {
          customizeWidth.value = sizeObj[key]
        }
      })
    }

    return {
      customizeWidth
    }
  }
})
</script>

<style scoped lang="scss">
.MInStorage {
  margin: 0 16px 16px 16px;
  padding: 16px;
  background-color: #fff;
  min-width: 960px;
}
.table {
  width: 100%;
  margin: 10px 20px 20px 0;
  overflow: hidden;
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

.table-bordered-bg {
  border: 1px solid #f1f1f1;
  & td {
    padding: 10px;
    border: 1px solid #dcdde0;
  }
  & td:nth-child(odd) {
    background-color: #f6f6f6;
    width: 10%;
  }
}
.space-R10 {
  margin-right: 10px;
}
.redStar {
  color: red;
}
</style>
