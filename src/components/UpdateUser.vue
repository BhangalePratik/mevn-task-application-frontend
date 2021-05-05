<template>
<basic-card>
    <h4 class="text-center my-4">Update User Info</h4>
    <form @submit.prevent="submitForm">
        <div class="mb-3">
            <label for="old-pasword" class="form-label">Enter your Old Password</label>
            <input type="password" class="form-control" id="old-password" required v-model="old_password">
        </div>
        <div class="mb-3">
            <label for="new-password" class="form-label">Enter your New Password</label>
            <input type="password" class="form-control" id="new-password" required v-model="new_password">
        </div>
        <div class="mb-3">
            <label for="reentered-new-password" class="form-label">Enter your New Password Again</label>
            <input type="password" class="form-control" id="reentered-new-password" required v-model="reentered_new_password">
        </div>
        <h5 v-if="reentered_new_password !== '' && new_password !== reentered_new_password">New Password and Reentered New Password are not matching</h5>
        <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>
</basic-card>
</template>

<script>
import BasicCard from '../layouts/BasicCard';

export default {
    components: {
        BasicCard,
    },
    data() {
        return {
            old_password: '',
            new_password: '',
            reentered_new_password: ''
        }
    },
    methods: {
        async submitForm() {
            try {
                await this.$store.dispatch('updateForm', {
                    old_password: this.old_password,
                    new_password: this.new_password,
                    reentered_new_password: this.reentered_new_password
                })
                this.$router.push('/shownotes');

            } catch (error) {
                alert('Updationg Failed');
            }
        }
    }
}
</script>
