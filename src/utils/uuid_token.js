import { v4 as uuidv4 } from 'uuid'
// 要生成一个字符串，且每次执行不能发生变化，游客身份持久储存
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 判断是否有uuid,如果没有
  if (!uuid_token) {
    // 生成身份
    uuid_token = uuidv4()
    // 临时存储
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}
