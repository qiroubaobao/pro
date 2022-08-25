export const config = {
  rules: {
    datetime: {
      required: true,
      validateTrigger: "blur",
      validator(rule, value) {
        return value != ""
      },
      message: "请选择日期"
    },
    guige: [
      {
        type: "number",
        required: true,
        validator(rule, value) {
          return value != ""
        },
        message: "请输入规格单位"
      }
    ]
  }
}
