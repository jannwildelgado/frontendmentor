export default function getKey (key: string | number, obj: any) {
  return obj[key] === undefined ? obj.default : obj[key]
}
