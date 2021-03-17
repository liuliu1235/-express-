/** 判断账号是否过期 */
import Vue from 'vue'
import {Message} from "element-ui";

export default async function  overdue(){
  setTimeout(() =>{
    let userId=Vue.prototype.$userInfo().ids
    let adminId=Vue.prototype.$adminInfo().ids
    let getApi=Vue.prototype.$api.get

    if(userId){
      let userPassword=Vue.prototype.$userInfo().password
      // getApi('user',{$where:{ids:userId,password:userPassword}},res=>{
      //   if(!res||res.length===0){
      //     Message.info('账号已过期');
      //     Vue.prototype.$userInfo('clear')
      //   }
      // })
    }
    if(adminId&&adminId!=='1'){
      let adminPassword=Vue.prototype.$adminInfo().password
      getApi('admin',{$where:{ids:adminId,password:adminPassword}},res=>{
        if(!res||res.length===0){
          Message.info('账号已过期');
          Vue.prototype.$adminInfo('clear')
        }
      })
    }
  },100)
}

function newInfo(newObj){

}

