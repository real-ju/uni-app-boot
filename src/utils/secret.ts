// @ts-nocheck
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
/**
 * 请自行安装CryptoJS类型定义文件
 */

const AES_KEY: string = 'abcdef0123456789';

//RSA公钥
const PUBLIC_KEY: string =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWuhmfxBPhd+RPRw6M3UoW5ZDFR5CBB21+CaKtcRxwvFhxvPb1Wz6RAosymnYjc7zvZ3NIXNpNzDNfxxnvRtHuNkOJbX5aYkyEz8k630+tBkQ6luvGDPB0tl+C5ta/8ppPpYh8DBhGwLFbzxQbL4PR6u77dtlvDWbcN9WXS7HBRQIDAQAB';
//RSA私钥
// const PRIVATE_KEY: string = '';

//AES加密
function AESEncrypt(word: string) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let key = CryptoJS.enc.Utf8.parse(AES_KEY);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString();
}

//AES解密
function AESDecrypt(word: string) {
  let key = CryptoJS.enc.Utf8.parse(AES_KEY);
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

//RSA加密
function RSAEncrypt(word: string) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(PUBLIC_KEY);
  let encrypted = encrypt.encrypt(word);

  return encrypted;
}

//RSA解密
function RSADecrypt(word: string) {
  let decrypt = new JSEncrypt();
  // decrypt.setPrivateKey(PRIVATE_KEY);
  decrypt.setPublicKey(PUBLIC_KEY);
  let uncrypted = decrypt.decrypt(word);

  return uncrypted;
}

export default {
  AESEncrypt,
  AESDecrypt,
  RSAEncrypt,
  RSADecrypt,
  AES_KEY
};
