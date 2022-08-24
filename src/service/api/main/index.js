import http from "../../index"
import qs from "qs"


export function getGGDW(parameter){
  return http.get({
    url: 'Common/GetGGDW',
    params: parameter,
  })
}

export function getBZDW(parameter){
  return http.get({
    url: 'Common/GetBZDW',
    params: parameter,
  })
}

export function getSupplier(parameter){
  return http.get({
    url: 'Common/GetSupplier',
    params: parameter,
  })
}
export function getLocation(parameter){
  return http.get({
    url: 'Common/GetLocation',
    params: parameter,
  })
}
export function getUser(parameter){
  return http.get({
    url: 'Common/GetUser',
    params: parameter,
  })
}

export function getMaterials(parameter){
  return http.get({
    url: 'StandardMaterial/GetSMaterialsList',
    params: parameter,
  })
}

export function saveSubmitMaterials(parameter){
  return http.post({
    url: 'StandardMaterial/SaveSMaterials',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function getMaterialsDetailsByID(parameter){
  return http.get({
    url: 'StandardMaterial/GetMaterialsDetailsByID',
    params: parameter,
  })
}

export function getSupplierList(parameter){
  return http.get({
    url: 'Supplier/GetSupplierList',
    params: parameter,
  })
}

export function getSupplierDetailsByID(parameter){
  return http.get({
    url: 'Supplier/GetSupplierDetail',
    params: parameter,
  })
}

export function saveSubmitSupplier(parameter){
  return http.post({
    url: 'Supplier/SaveSupplier',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function DeleteSupplier(parameter){
  return http.post({
    url: 'Supplier/DeleteSupplier',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function getUserList(parameter){
  return http.get({
    url: 'User/GetUserList',
    params: parameter,
  })
}

export function getUserDetailsByID(parameter){
  return http.get({
    url: 'User/GetUserDetail',
    params: parameter,
  })
}

export function saveSubmitUser(parameter){
  return http.post({
    url: 'User/SaveUser',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function DeleteUser(parameter){
  return http.post({
    url: 'User/DeleteUser',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function getLocationList(parameter){
  return http.get({
    url: 'Location/GetLocationList',
    params: parameter,
  })
}

export function getLocationDetailsByID(parameter){
  return http.get({
    url: 'Location/GetLocationDetail',
    params: parameter,
  })
}

export function saveSubmitLocation(parameter){
  return http.post({
    url: 'Location/SaveLocation',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function DeleteLocation(parameter){
  return http.post({
    url: 'Location/DeleteLocation',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function saveLYMaterials(parameter){
  return http.post({
    url: 'StandardMaterial/LYMaterials',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function saveGHMaterials(parameter){
  return http.post({
    url: 'StandardMaterial/GHMaterials',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function getMaterialsDgh(parameter){
  return http.get({
    url: 'StandardMaterial/GetGHMaterialsList',
    params: parameter,
  })
}

export function saveBSMaterials(parameter){
  return http.post({
    url: 'StandardMaterial/BSMaterials',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
  })
}

export function getBSMaterialsDetailsByID(parameter){
  return http.get({
    url: 'StandardMaterial/getBSMaterialsDetailsByID',
    params: parameter,
  })
}