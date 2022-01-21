/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-20 16:22:46
 * @FilePath: \vue\vue-order-control\src\common\encrypt.js
 * @LastEditTime: 2021-12-20 16:39:20
 * @LastEditors: RayseaLee
 */
import JSEncrypt from 'jsencrypt'
// 公钥
const pubKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpkW3SC2vG3X/QKur2StmjFHoC7be/0TxgVI9n55xWJFMRBVVx2RpiUeL1KGc96j49ODPhyAFUPTxGvHFWtYFNnrb3k58862qvyuy/JlcCzvCl+lOIZKT7njSP6LDrq1BBbCArh+DdVNddjnuCHJSleOxeah1fudwpqUe74QrI5wIDAQAB-----END PUBLIC KEY-----'

export function encrypt(password) {
  // 创建加密对象实例
  let encryptor = new JSEncrypt()  
  // 设置公钥
  encryptor.setPublicKey(pubKey)
  // 对内容进行加密
  let rsaPassWord = encryptor.encrypt(password)  
  return rsaPassWord
}