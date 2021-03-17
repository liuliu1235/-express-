
import upImg from './upImg'   //上传图片
import upVideo from './upVideo'   //上传视频
import upPdf from './upPdf'   //上传pdf

import userImage from './userImage.vue'   //用户头像
//import cityAZ from './city_A_Z'  //全国城市a-z列表  h5
//import dydPdf from './dydPdf'  //pdf
import dydVideo from './dydVideo'  //news
import dydDialog from './dydDialog.vue'   //弹框
import dydTable from './dydTable.vue'   //表格
import dydForm from './dydForm.vue'   //表单
import nextPage from './nextPage.vue'   //表单
import dydLink from './dydLink.vue'   // 字体链接

const publicTitle= {
    install: function (Vue) {
        Vue.component('upImg',upImg),
            Vue.component('userImage',userImage),
            //Vue.component('cityAZ',cityAZ),
            Vue.component('upVideo',upVideo),
            Vue.component('upPdf',upPdf),
            //Vue.component('dydPdf',dydPdf),
            Vue.component('dydVideo',dydVideo)
            Vue.component('dydDialog',dydDialog),
            Vue.component('dydTable',dydTable),
            Vue.component('dydForm',dydForm),
            Vue.component('dydLink',dydLink),
            Vue.component('nextPage',nextPage)
    }
}
export default publicTitle;
