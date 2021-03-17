// 生成验证码
export default class VerificationCode {
  constructor() {
    this.list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  }
  random(call) {
    let code=''
    for(let i=0;i<4;i++){
      let r = Math.ceil(Math.random()*25); // 随机数
      let letter = this.list[r]
      let b = Math.round(Math.random()); // 大小写
      console.log(b)
      if(b) {
        letter = letter.toLocaleUpperCase()
      }
      code += letter
    }
    setTimeout(()=>{
      this.code = code
      call(code)
    })
  }
  equal(val){
    return this.code.toLocaleUpperCase() === val.toLocaleUpperCase()
  }
}
