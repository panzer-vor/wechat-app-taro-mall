import dayjs from 'dayjs'

export const dateDiffDay = (d1, d2) => {
  const day1 = dayjs(d1)
  const day2 = dayjs(d2)
  return day1.diff(day2, 'day')
}
