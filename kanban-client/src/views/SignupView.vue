<script setup>

import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InlineMessage from 'src/reusable-components/InlineMessageVue';
import useUerForm from 'src/composable/useUserform';
import { userAxios } from 'src/api/axiosInstance';
import { validateForm } from 'src/javascript/commonUtil';
import { userStore } from 'src/store/userStore';
import commonApi from 'src/api/commonApi';

// ref
let isLoading = ref(false);
let errorMessage = ref('');
let successMessage = ref('');
let formError = reactive({});
let isAuthenticating = ref(false);

// router
const router = useRouter();

// store
const userStoreInfo = userStore();


// composables
const {
    userDetail,
    handleInputChange,
    resetForm
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
        const response = await userAxios.post('/createUser', userDetail.formData);
        const { data } = response;
        if (data && data.status === 'Success') {
            successMessage.value = data.message;
            resetForm();
            return;
        }
        throw new Error('Something went wrong');
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

function closeInlineMessage(type) {
    switch (type) {
        case 'danger':
            errorMessage.value = '';
            break;
        case 'success':
            successMessage.value = '';
            break;
        default: return;
    }
}

async function checkIsUserAuthenticated() {
    isAuthenticating.value = true;
    const response = await commonApi.authenticateUser(userStoreInfo);
    if (response || !response) {
        isAuthenticating.value = false;
    }
    if (response) {
        router.push({
            name: 'home'
        })
    }

}


</script>

<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-5 col-lg-5">
                <div class="form_container">
                    <InlineMessage v-if="errorMessage" @closeInlineMessage="closeInlineMessage" :message="errorMessage"
                        :type="'danger'" />
                    <InlineMessage v-if="successMessage" @closeInlineMessage="closeInlineMessage"
                        :message="successMessage" :type="'success'" />
                    <div class="form_title">Register</div>
                    <div class="form_info">Welcome to kanban board, Create account to track your daily activities. with
                        lot's of
                        new features</div>
                    <div class="form_card">
                        <form @submit.prevent="handleFormSubmit">
                            <div class="form_label">Username</div>
                            <input type="text" class="form_input" name="userName"
                                :value="userDetail.formData.userName || ''"
                                @input="handleInputChange($event, formError)" />
                            <div v-if="formError['userName_Error']" class="form_input_error">{{
                                    formError['userName_Error']
                            }}</div>
                            <div class="form_label">Password</div>
                            <input type="password" class="form_input" name="password"
                                :value="userDetail.formData.password || ''"
                                @input="handleInputChange($event, formError)" />
                            <div v-if="formError['password_Error']" class="form_input_error">{{
                                    formError['password_Error']
                            }}</div>
                            <button :disabled="isLoading" class="form_btn" :class="isLoading ? 'disabled' : ''"
                                type="submit">
                                <div v-if="isLoading" class="spinner-border spinner_loader" role="status"></div>
                                <span v-else>Create Account</span>
                            </button>
                        </form>
                        <div class="form_info dark">Already have an account ? <span class="highlight">
                                <router-link :to="{ name: 'login' }">Login</router-link>
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
