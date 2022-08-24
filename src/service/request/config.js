let BASE_URL = ""
const TIME_OUT = 600000

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://www.skxd.com.cn//Api/"
} else {
  BASE_URL = "http://www.skxd.com.cn//Api/"
}

export { BASE_URL, TIME_OUT }
