<script setup>

import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InlineMessage from '../reusable-components/InlineMessageVue';
import useUerForm from '../composable/useUserform';
import { userAxios } from '../api/axiosInstance';
import { validateForm } from '../javascript/commonUtil';
import { userStore } from '../store/userStore';
import commonApi from '../api/commonApi';

// ref
let isLoading = ref(false);
let isAuthenticating = ref(false);
let errorMessage = ref('');
let formError = reactive({});

// router
const router = useRouter();

// store
const userStoreInfo = userStore();

// composables
const {
    userDetail,
    handleInputChange
} = useUerForm();


// methods
onMounted(() => {
    checkIsUserAuthenticated();
})

async function handleFormSubmit() {
    const isFormValid = validateForm(['userName', 'password'], userDetail.formData, formError);
    if (!isFormValid) return;
    try {
        isLoading.value = true;
        const response = await userAxios.post('/loginUser', userDetail.formData);
        const { data = null } = response;
        if (!data) throw new Error('Something went wrong');
        userStoreInfo.setUserDetail(data.userInfo);
        userStoreInfo.setUserLoggedIn(true);
        redirectToHome();
    }
    catch (err) {
        const { response = null } = err;
        if (!response) {
            errorMessage.value = 'Something went wrong!';
            return;
        }
        errorMessage.value = response.data.message;
    }
    finally {
        isLoading.value = false;
    }
}

function closeInlineMessage() {
    errorMessage.value = '';
}

async function checkIsUserAuthenticated() {
    isAuthenticating.value = true;
    const response = await commonApi.authenticateUser(userStoreInfo);
    if (response || !response) {
        isAuthenticating.value = false;
    }
    if (response) {
        redirectToHome();
    }
}

function redirectToHome() {
    router.push({
        name: 'home'
    })
}

</script>

<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-5">
                <div class="form_container">
                    <InlineMessage v-if="errorMessage" @closeInlineMessage="closeInlineMessage" :message="errorMessage"
                        :type="'danger'" />
                    <div class="form_title">Login to your account</div>
                    <div class="form_info">Welcome to kanban board, Login to track your daily activities. with lot's of
                        new features</div>
                    <div class="form_card">
                        <form @submit.prevent="handleFormSubmit">
                            <div class="form_label">Username</div>
                            <input type="text" name="userName" class="form_input"
                                :value="userDetail.formData.userName || ''"
                                @input="handleInputChange($event, formError)" />
                            <div v-if="formError['userName_Error']" class="form_input_error">{{
                                    formError['userName_Error']
                            }}</div>
                            <div class="form_label">Password</div>
                            <input type="password" name="password" class="form_input"
                                :value="userDetail.formData.password || ''"
                                @input="handleInputChange($event, formError)" />
                            <div v-if="formError['password_Error']" class="form_input_error">{{
                                    formError['password_Error']
                            }}</div>
                            <button :disabled="isLoading" class="form_btn" :class="isLoading ? 'disabled' : ''"
                                type="submit">
                                <div v-if="isLoading" class="spinner-border spinner_loader" role="status"></div>
                                <span v-else>Sign In</span>
                            </button>
                        </form>
                        <div class="form_info dark">Don't have an account yet ? <span class="highlight">
                                <router-link :to="{ name: 'signup' }">Signup</router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="overlay" v-if="isAuthenticating">
        <div class="middle_loader">
            <div class="spinner-border light spinner_loader" role="status"></div>
            <div class="text">Authenticating...</div>
        </div>
    </div>
</template>
