<script setup>
</script>

<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-5 col-lg-5">
                <div class="form_container">
                    <div class="form_title">Register</div>
                    <div class="form_info">Welcome to kanban board, Create account to track your daily activities. with
                        lot's of
                        new features</div>
                    <div class="form_card">
                        <form>
                            <div class="form_label">Username</div>
                            <input type="text" class="form_input" />
                            <div class="form_label">Password</div>
                            <input type="password" class="form_input" />
                            <button class="form_btn" type="submit">Create Account</button>
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
</template>
