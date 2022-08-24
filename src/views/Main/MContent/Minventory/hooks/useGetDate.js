import dayjs from "dayjs"

export function useGetDate() {
  const dateFormat = "YYYY-MM-DD"

  function getDate() {
    const nowDate = new Date()
    let date = {
      year: nowDate.getFullYear(),
      month: nowDate.getMonth() + 1,
      day: nowDate.getDate()
    }
    let dayDate =
      date.year +
      "-" +
      (date.month >= 10 ? date.month : "0" + date.month) +
      "-" +
      (date.day >= 10 ? date.day : "0" + date.day)
    return dayDate
  }
  return {
    dateFormat,
    getDate,
    dayjs
  }
}
