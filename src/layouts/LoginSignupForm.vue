<template>
<h4 class="card-title text-center text-capitalize">{{mode}}</h4>
<form @submit.prevent="submitForm">
    <div class="mb-3">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email" required @input="doEmailValidation">
        <div v-if="invalidEmailFeedback" class="text-danger">Please fill out this field.</div>
    </div>
    <div class="mb-3">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Enter password" required @input="doPasswordValidation">
        <div v-if="invalidPasswordFeedback && mode === 'signup'" class="text-danger">Password should contain 8 character ad includes uppercase,lowercase,symbol and number</div>
    </div>

    <button type="submit" id="submitButton" class="btn btn-primary w-100">Submit</button>
    <slot></slot>
</form>
</template>

<script>
import validator from 'validator';
export default {
    data() {
        return {
            email: '',
            password: '',
            invalidPasswordFeedback: false,
            invalidEmailFeedback: false,
            isEmailValid: false,
            isPasswordValid: false
        }
    },
    props: ['mode'],
    methods: {
        async submitForm() {
            try {
                console.log(this.mode)
                await this.$store.dispatch('signupLoginForm', {
                    email: this.email,
                    password: this.password,
                    mode: this.mode
                })
                this.$router.push('/shownotes');

            } catch (error) {
                alert(error.message);
            }
        },
        doPasswordValidation(event) {
            this.password = event.target.value;
            if (this.mode === 'signup') {
                const passwordField = document.getElementById('password');
                this.isPasswordValid = validator.isStrongPassword(event.target.value, [{
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }]);
                if (this.isPasswordValid) {
                    console.log("strong password");
                    passwordField.classList.replace('border-danger', 'border-success');
                    this.invalidPasswordFeedback = false;
                } else {
                    console.log("weak password");
                    passwordField.classList.add('border-danger')
                    this.invalidPasswordFeedback = true;
                    passwordField.classList.contains('border-success') && passwordField.classList.remove('border-success')

                }
            }
        },
        doEmailValidation(event) {
            this.email = event.target.value;
            if (this.mode === 'signup') {
                const emailField = document.getElementById('email');
                this.isEmailValid = validator.isEmail(event.target.value);
                if (this.isEmailValid) {
                    this.invalidEmailFeedback = false;
                    emailField.classList.replace('border-danger', 'border-success')
                } else {
                    this.invalidEmailFeedback = true;
                    emailField.classList.add('border-danger')
                    emailField.classList.contains('border-success') && emailField.classList.remove('border-success')

                }

            }
        },
    }
}
</script>
