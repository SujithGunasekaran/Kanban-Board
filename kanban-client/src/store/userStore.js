import { defineStore } from 'pinia';


export const userStore = defineStore({
    id: 'userStore',
    state: () => ({
        userInfo: {},
        isUserLoggedIn: false
    }),
    actions: {
        setUserDetail(userData) {
            this.userInfo = userData;
        },
        setUserLoggedIn(input) {
            this.isUserLoggedIn = input;
        }
    }
})
