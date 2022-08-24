import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import {
  getMaterialsDetailsByID,
  saveLYMaterials,
  saveBSMaterials,
  getLocation,
  getBSMaterialsDetailsByID
} from "@/service/api/main"
import { useGetMaterials } from "./useMinventory"
import { useGetUser } from "./useGetUser"
import { useGetDate } from "./useGetDate"

const { message, getMaterialsList } = useGetMaterials()
const { userList, lyData, bsData, getUserList } = useGetUser()
const { dayjs, dateFormat, getDate } = useGetDate()

export function useGetLyAndBs() {
  const router = useRouter()
  const visible = ref(false)
  const visibleBS = ref(false)

  let locationList = reactive({ data: [{ id: 1, name: "" }] })
  let isReloadUser = ref(false)
  let isReloadLocation = ref(false)

  let editID = ref("")
  let editData = reactive({
    data: {
      name: "",
      remainCount: "",
      cas: "",
      standardValue: "",
      productNum: "",
      expireDate: "",
      code: "",
      location: ""
    }
  })

  //显示领用弹层
  const showModal = id => {
    console.log(id, 11111111)
    visible.value = true
    editID.value = id
    lyData.id = id
    getMaterialsDetails()
    getUserList()
    lyData.lydate = ref(dayjs(getDate(), dateFormat))
  }
  const handleOk = () => {
    let param = { lyData: lyData }
    saveLYMaterials(param)
      .then(resp => {
        if (resp.code === 0) {
          message.success("领用成功")
          getMaterialsList()
          visible.value = false
          editID.value = ""
          lyData.id = ""
        } else if (resp.code === 1) {
          message.error(resp.message)
        }
      })
      .catch(() => {})
      .finally(() => {})
    return
  }

  const getMaterialsDetails = () => {
    let param = { id: editID.value }
    getMaterialsDetailsByID(param)
      .then(resp => {
        if (resp.code === 0) {
          editData.data = resp.data
        } else if (resp.code === 1) {
          message.error(resp.message)
        }
      })
      .catch(() => {})
      .finally(() => {})
  }
  //显示报损弹层
  const showModalBS = (id) => {
    visibleBS.value = true
    editID.value=id
    lyData.id=id
    getMaterialsDetails()
    getUserList()
    getLocationList()
  }

  const handleOkBS = () => {
    let param = { bsData: bsData }
    saveBSMaterials(param)
      .then(resp => {
        if (resp.code === 0) {
          message.success("报损成功")
          getMaterialsList()
          visibleBS.value = false
        } else if (resp.code === 1) {
          message.error(resp.message)
        }
      })
      .catch(() => {})
      .finally(() => {})
    return
  }
  const getBSMaterialsDetails = () => {
    let param = { id: editID.value }
    getBSMaterialsDetailsByID(param)
      .then(resp => {
        if (resp.code === 0) {
          editData.data = resp.data
        } else if (resp.code === 1) {
          message.error(resp.message)
        }
      })
      .catch(() => {})
      .finally(() => {})
  }
  function getLocationList() {
    getLocation().then(resp => {
      if (resp.code === 0) {
        locationList.data = resp.data
        if (resp.data.length > 0 && bsData.location == "") {
          bsData.location = resp.data[0].id
        }
      }
    })
  }

  const openUserManage = () => {
    const page = router.resolve({
      name: "User",
      params: {}
    })
    window.open(page.href, "_blank")
    isReloadUser.value = true
  }

  const reloadUser = () => {
    if (isReloadUser.value) {
      getUserList()
      isReloadUser.value = false
    }
  }
  const openLocationManage = () => {
    const page = router.resolve({
      name: "Location",
      params: {}
    })
    window.open(page.href, "_blank")
    isReloadLocation.value = true
  }
  const reloadLocation = () => {
    if (isReloadLocation.value) {
      getLocationList()
      isReloadLocation.value = false
    }
  }

  return {
    editID,
    editData,
    dateFormat,
    userList,
    lyData,
    bsData,

    visible,
    showModal,
    handleOk,
    getMaterialsDetails,

    visibleBS,
    showModalBS,
    handleOkBS,
    getLocationList,
    getBSMaterialsDetails,

    openUserManage,
    reloadUser,
    openLocationManage,
    reloadLocation
  }
}
