<template>
<basic-card >
    <h4 class="text-center my-4">Add Note</h4>
    <form @submit.prevent="submitForm">
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="test" class="form-control" id="title" aria-describedby="emailHelp" v-model="title" required>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" class="form-control" rows="4" cols="50" v-model="description"></textarea>
        </div>
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
            title: '',
            description: ''
        }
    },
    methods: {
        async submitForm() {
            try {
                await this.$store.dispatch('addNote', {
                    title: this.title,
                    description: this.description
                });
                this.$router.push('/shownotes');
            } catch (error) {
                console.log('Error Occurred while adding notes')
            }
        }
    }
}
</script>
