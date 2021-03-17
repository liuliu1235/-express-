import axios from 'axios'
//定位到用户当前城市
(function() {
    let that=this
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() === BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            GetLocation(r.point.lng,r.point.lat);
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true})

    async function GetLocation(lng,lat){
        var point = new BMap.Point(lng,lat);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function(rs){
            var addComp = rs.addressComponents;
            console.log(addComp)
            getCity(addComp)
        });
    }
})()

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let store= new Vuex.Store({
    state: {
        city:{}
    },
    mutations: {
        setCity (state, options) {
            if(options==='clear'){
                for(let i in  state.city){
                    Vue.set(state.city,`${i}`, '')
                }
            }
            else{
                for(let c in  options){
                    Vue.set(state.city,`${c}`, options[c]);
                }
            }
        }
    }
})
function getCity(options=null){
    if(!options) return store.state.city
    else {
        store.commit('setCity',options)
    }
}
export default getCity
