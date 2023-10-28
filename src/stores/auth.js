import { defineStore } from "pinia";


export const useAuth = defineStore('auth', {
    state: () => ({
        user: {},
        isLoggedIn:false,
    }),

    persist: {
        paths: ['user','isLoggedIn'],
    },

    getters: {

        getAuthStatus:(state)=>{
            return state.isLoggedIn;
        },


    },


    actions: {
        register(formData){
           const success=this.user=formData;
            this.isLoggedIn=true;
           return success;
        },

        login(formData){
           const info= this.user;
            return info;
        } ,


        logout(){
            const out=this.user;
            this.isLoggedIn=false;
            return out;
        }

          }
})