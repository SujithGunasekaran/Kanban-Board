<script setup>

import { ref, reactive } from 'vue';
import InlineMessage from '../reusable-components/InlineMessageVue';
import useUerForm from '../composable/useUserform';
import { userAxios } from '../api/axiosInstance';
import { validateForm } from '../javascript/commonUtil';

// ref
let isLoading = ref(false);
let errorMessage = ref('');
let formError = reactive({});

// composables
const {
    userDetail,
    handleInputChange
} = useUerForm();


// methods
async function handleFormSubmit() {
    const isFormValid = validateForm(['userName', 'password'], userDetail.formData, formError);
    if (!isFormValid) return;
    try {
        isLoading.value = true;
        const response = await userAxios.post('/loginUser', userDetail.formData);
        console.log("res", response.data);
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
</template>
