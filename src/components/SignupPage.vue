<template>
<basic-card>
    <login-signup-form mode="signup">
        <p class="my-2">If you already have a account Please <router-link to="/login">Login</router-link>
        </p>
    </login-signup-form>
</basic-card>
</template>

<script>
import BasicCard from '../layouts/BasicCard';
import LoginSignupForm from '../layouts/LoginSignupForm';
export default {
    components: {
        BasicCard,
        LoginSignupForm
    }
}
</script>
