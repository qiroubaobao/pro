
import axios from "axios"
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { message } from 'antd'
import {getItem} from '@/store/storage'

class LMRequest {
  constructor(options) {
    //const store=useStore()
    this.options = options
    this.instance = axios.create(options)

    this.instance.interceptors.request.use(
      (config) => {
        // 拦截请求的数据
        const token = getItem(ACCESS_TOKEN)
        if (token) {
          config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        return config
      },
      err => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // 拦截响应的数据
        if (response.data.type === 'application/vnd.ms-excel') {
          return response.data
        }
        if (response.data.code === 2) {
          message.error('您的会话已经失效，请重新登录')              
            setTimeout(() => {
              window.location='/'
            }, 1000)
        } else if (response.data.code !== 0) {
          message.error(response.data.message, 4)
        }
        return response.data
      },
      (err) => {
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: "GET" })
  }

  post(config) {
    return this.request({ ...config, method: "POST" })
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" })
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" })
  }
}

export default LMRequest
