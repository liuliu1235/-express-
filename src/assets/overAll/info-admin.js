import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
function json(data){
    return JSON.parse(data)
}

let store= new Vuex.Store({
    state: {
        admin:json(sessionStorage.getItem('infoAdmin'))||json(localStorage.getItem('infoAdmin'))||{
            username:'',
            password:'',
            names:'',
            userImg:'',
            ids:'',
            grade:''
        },
        navDefaultActive:json(sessionStorage.getItem('navDefaultActive-admin'))||false
    },
    getters: {
        user(state){
            return state.admin
        },
    },
    mutations: {
        setUser (state, options) {
            if(options==='clear'){
                console.log(state.admin)
                for(let i in  state.admin){
                    Vue.set(state.admin,`${i}`, '')
                }
            }
            else{
                for(let c in  options){
                    Vue.set(state.admin,`${c}`, options[c]);
                }
            }
            sessionStorage.setItem('infoAdmin', JSON.stringify(state.admin))
        },
        setNav(state , options){
            if(!state.navDefaultActive){
                state.navDefaultActive={}
            }
            for(let c in  options){
                Vue.set(state.navDefaultActive,`${c}`, options[c]);
            }
            sessionStorage.setItem('navDefaultActive-admin', JSON.stringify(state.navDefaultActive))
        }
    }
})
function adminInfo(options=null){
    if(!options) return store.state.admin
    else {
        store.commit('setUser',options)
    }
}

adminInfo.prototype.nav=function(options){
    if(!options){
        return store.state.navDefaultActive
    }else{
        store.commit('setNav',options)
    }
}
export default adminInfo
