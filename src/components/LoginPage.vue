<template>
    <basic-card>
        <login-signup-form mode="login">
            <p class="my-2">If you don't have account <router-link to="/signup">Register</router-link></p>
        </login-signup-form>
    </basic-card>
</template>

<script>

import BasicCard from  '../layouts/BasicCard';
import LoginSignupForm from '../layouts/LoginSignupForm';
export default {
    components : {
        BasicCard,
        LoginSignupForm
    }
}
</script>
