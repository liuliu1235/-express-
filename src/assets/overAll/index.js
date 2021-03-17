import api from '../util/util/index'
import userInfo from './info-user'
import adminInfo from './info-admin'
import routerGo from './routerGo'
import Time from './Time'
import nodeUrl from '../util/lib/url'
import rules from './rules'
import array from './array'
import city from './info-city'
import verificationCode from './verificationCode'
import ver from './ver'
async function fun(Vue,options) {
    Vue.prototype.$api=api;            /**接口清单*/
    Vue.prototype.$userInfo=userInfo;  /**用户信息*/
    Vue.prototype.$adminInfo=adminInfo;/**管理员信息*/
    Vue.prototype.$routerGo=routerGo;  /**跳转页面*/
    Vue.prototype.$Time=function(date){ /**获取时间*/
        return new Time(date)
    }

    Vue.prototype.$JSP=function (data) {  /**  对象不指向同一地址拷贝 --深度拷贝 */
        return JSON.parse(JSON.stringify(data))
    }

    Vue.prototype.$nodeUrl=nodeUrl  /** 后台node地址 */

    Vue.prototype.$rules=rules  /** el-form  表单验证规则 */

    Vue.prototype.$array=array  /** 数组操作 */

    Vue.prototype.$myCity=city /**用户省市*/

    Vue.prototype.$verificationCode=new verificationCode() /**验证码*/

    Vue.prototype.$ver=ver /**elememt 表单验证*/

    Vue.prototype.$bus=new Vue() /**elememt 表单验证*/
}
export default fun
