// service统一出口
import LMRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

const LmRequest = new LMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default LmRequest
