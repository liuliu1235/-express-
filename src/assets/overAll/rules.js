const rules={
  // element 表单验证
    ver:function(refFormName){
      console.log(this)
      return new Promise((rs,rj)=>{
        this.$refs[refFormName].validate((valid) => {
          if (valid) {
            rs(true)
          } else {
            rj(false)
          }
        })
      })
    },
    /**账号密码长度在6-16 并且包含数字与字母*/
    username:(rule, value, callback) => {
        let string=false
        let number=false
        let valueLength=(''+value.length)>5&&(''+value.length)<16
        let v=value.split('')
        v.forEach(val=>{
            if(isNaN(Number(val))){
                string=true
            }else if(typeof Number(val)==='number'){
                number=true
            }
        })
        setTimeout(()=>{
            if(valueLength){
                if(string&&number){
                    callback()
                }else{
                    callback(new Error('必须包含数字和字母'));
                }
            }else{
                callback(new Error('长度为6到16位'));
            }

        },10)
    },

    /** 手机号 */
    phone:(rule, value, callback)=>{
        let p= /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!p.test(value)) {
            callback(new Error('手机号格式不正确'));
        } else {
            callback()
        }
    },

    /** 身份证号 */
    idCard:(rule, value, callback)=>{
// 加权因子
        let regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        let values=''+value
        console.log(typeof value,value)
        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if(regIdCard.test(value)){
            if(values.length==18){
                let  idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
                let idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                let idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
                for(var i=0;i<17;i++){
                    idCardWiSum+=c.substring(i,i+1)*idCardWi[i];
                }
                let idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
                let idCardLast=c.substr(17,1);//得到最后一位身份证号码
                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if(idCardMod==2){
                    if(idCardLast=="X"||idCardLast=="x"){
                        callback()
                    }else{
                        callback(new Error("身份证号码错误！"));
                    }
                }else{
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if(idCardLast==idCardY[idCardMod]){
                        callback()
                    }else{
                        callback(new Error("身份证号码错误！"));
                    }
                }
            }
        }else{
            callback(new Error("身份证格式不正确!"));
        }
    },

    /** 邮箱 */
    email:(rule, value, callback)=>{
        var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!emailReg.test(value)) {
            callback(new Error('邮箱格式不正确'));
        }else {
            callback()
        }
    },

    /** 判断是否http https 开头的网址 */
    url:(rule, value, callback)=>{
        if(!value){
            callback()
        }else{
            let urls = value.slice(0,8);
            console.log(value.slice(0,7))
            if(urls.indexOf('https://') != -1 || urls.indexOf('http://') != -1){
                callback()
            }else {

                callback(new Error('网址格式不正确'));
            }
        }

    },
}
export default rules
