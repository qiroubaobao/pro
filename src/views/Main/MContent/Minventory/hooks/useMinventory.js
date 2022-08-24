import { reactive, ref } from "vue"
import { useRouter } from 'vue-router'
import { getMaterials } from "@/service/api/main"
import { message } from "antd"


//库存管理列表页
export function useGetMaterials() {
  const router = useRouter()
  let data = reactive({ data: [] })
  let innerData = reactive({ data: [] })
  let searchKey = ref("")

  const getMaterialsList = () => {
    let param = { searchkey: searchKey }
    getMaterials(param)
      .then(resp => {
        if (resp.code === 0) {
          data.data = resp.data.materials
          innerData.data = resp.data.details
        } else if (resp.code === 1) {
          message.error(resp.message)
        }
      })
      .catch(() => {})
      .finally(() => {})
  }
  const toNewBatch = () => {
      router.push({
        name: "NewBatch"
      })
  }

  return {
    data,
    innerData,
    searchKey,
    getMaterialsList,
    message,
    toNewBatch
  }
}
