import http from "../index"
import qs from "qs"


export function getLoginApi(parameter){
  return http.post({
    url: 'Account/login',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
    // headers:{
    //   'verifyCodeId':parameter.verifyCodeId
    // }
  })
}
export function getLogOut(parameter){
  return http.post({
    url: 'Common/Logout',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
    // headers:{
    //   'verifyCodeId':parameter.verifyCodeId
    // }
  })
}
export function sendCode(parameter){
  return http.get({
    url: 'Account/SendCode',
    params: parameter,
  })
}

export function register(parameter){
  return http.post({
    url: 'Account/Register',
    data: parameter,
    paramsSerializer: parameter => {
      return qs.stringify(parameter, { indices: false })
    }
    // headers:{
    //   'verifyCodeId':parameter.verifyCodeId
    // }
  })
}
export function getProvince(parameter){
  return http.get({
    url: 'Account/GetProvince',
    params: parameter,
  })
}
export function getCity(parameter){
  return http.get({
    url: 'Account/GetCity',
    params: parameter,
  })
}
export function getArea(parameter){
  return http.get({
    url: 'Account/GetArea',
    params: parameter,
  })
}