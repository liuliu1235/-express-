
const CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Latin1.parse("9vApxLk5G3PAsJrM"); //为了避免补位，直接用16位的秘钥
const iv  = CryptoJS.enc.Latin1.parse("FnJL7EDzjqWjcaY9"); //16位初始向量

// 加密
export default function encrypt(text){
    return CryptoJS.AES.encrypt(JSON.stringify(text), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString()
}

