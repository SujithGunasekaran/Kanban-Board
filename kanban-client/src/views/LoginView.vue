<script setup>
</script>

<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-5 col-lg-5">
                <div class="form_container">
                    <div class="form_title">Login to your account</div>
                    <div class="form_info">Welcome to kanban board, Login to track your daily activities. with lot's of
                        new features</div>
                    <div class="form_card">
                        <form>
                            <div class="form_label">Username</div>
                            <input type="text" class="form_input" />
                            <div class="form_label">Password</div>
                            <input type="password" class="form_input" />
                            <button class="form_btn" type="submit">Sign In</button>
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
