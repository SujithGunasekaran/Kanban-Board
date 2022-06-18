import { userAxios } from './axiosInstance';

const commonApi = {
    async authenticateUser(store) {
        try {
            const response = await userAxios.get('/authenticate');
            const { data = null } = response;
            if (!data) throw new Error('Something went wrong');
            store.setUserDetail(data.userInfo);
            store.setUserLoggedIn(true);
            return true;
        }
        catch (err) {
            console.log("authenticate err", err);
            return false;
        }
    }
}

export default commonApi;
