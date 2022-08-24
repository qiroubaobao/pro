import { reactive } from "vue"
import { getUser } from "@/service/api/main"

export function useGetUser() {
  let userList = reactive({ data: [{ id: 1, name: "" }] }) //人员下拉框数据
  let lyData = reactive({ id: "", userid: "", lydate: "" }) //领用提交的数据模型结构
  let bsData = reactive({
    id: "",
    userid: "",
    location: "",
    bsreason: "",
    bsdate: "",
    bsdatalist: [
      {
        bsid: "",
        bsnum: "",
        bscode: "",
        bsremainamount: "",
        bslocation: "",
        bsopendate: "",
        bsexpiredate: "",
        expirestate: ""
      }
    ]
  }) //报损提交的数据模型结构


  //获取人员数据
  function getUserList() {
    getUser().then(resp => {
      if (resp.code === 0) {
        userList.data = resp.data
        if (resp.data.length > 0 && lyData.userid == "") {
          lyData.userid = resp.data[0].id
        }
        if (resp.data.length > 0 && bsData.userid == "") {
          bsData.userid = resp.data[0].id
        }
      }
    })
  }

  return {
    userList,
    lyData,
    bsData,
    getUserList
  }
}
