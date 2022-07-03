<script setup>

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ConfirmModel from '../reusable-components/ConfirmModel';
import { userStore } from '../store/userStore';
import commonApi from '../api/commonApi';

// ref
const showDropdown = ref(false);
const showConfirmModel = ref(false);
const isLoading = ref(false);

// router
const route = useRoute();
const router = useRouter();

// store
const userStoreInfo = userStore();


// methods
onMounted(async function () {
    if (userStoreInfo.isUserLoggedIn) return;
    const response = await commonApi.authenticateUser(userStoreInfo);
    if (!response) {
        redirectRouteToLogin();
    }
})

function handleUserDropdown(event) {
    event.stopPropagation();
    if (showDropdown.value) {
        closeDropdown();
        return;
    }
    showDropdown.value = true;
    document.addEventListener('click', closeDropdown)
}

function closeDropdown() {
    showDropdown.value = false;
    document.removeEventListener('click', closeDropdown);
}

function redirectRouteToLogin() {
    router.push({
        name: 'login'
    });
}

function openConfirmModel() {
    showConfirmModel.value = true;
}

function closeConfirmModel() {
    showConfirmModel.value = false;
}

async function logoutUser() {
    isLoading.value = true;
    const response = await commonApi.logoutUser(userStoreInfo);
    isLoading.value = false;
    if (response === true) {
        closeConfirmModel();
        redirectRouteToLogin();
    }
}

</script>

<template>
    <div class="header_container" :class="(route.name !== 'login' && route.name !== 'signup') ? 'show' : ''">
        <div class="header_title">Kanban</div>
        <div class="header_user">
            <div class="header_user_data" @click="handleUserDropdown">
                <div class="header_user_name">{{ userStoreInfo.userInfo.userName }}</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        class="bi bi-chevron-down header_arrow_icon" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>
            <div class="header_user_dropdown" :class="showDropdown ? 'show' : ''" v-if="showDropdown">
                <div class="list">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                            <path fill-rule="evenodd"
                                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>
                    </div>
                    <div @click="openConfirmModel" class="title">Signout</div>
                </div>
            </div>
        </div>
    </div>
    <ConfirmModel v-if="showConfirmModel" :displayMessage="'Are you sure you want to logout ?'"
        :confirmDisplayName="'Logout'" @onCancel="closeConfirmModel" @onConfirm="logoutUser" :isLoading="isLoading" />
</template>
