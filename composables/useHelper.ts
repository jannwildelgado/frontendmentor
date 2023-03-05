export const getKey = (key: string, obj: { default: '' } | any) => {
  return obj[key] === undefined ? obj?.default : obj[key]
}
