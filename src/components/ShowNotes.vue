<template>
<h3 class="text-center">Notes</h3>
<div v-if="!toBeShare">
    <basic-card v-for="note in notes" :key="note._id" :id="note._id" class="mb-3">
        <div class="d-flex flex-row justify-content-between">
            <div>
                <h3>{{note.title}}</h3>
                <p>{{note.description}}</p>
            </div>
            <div class="d-flex flex-column justify-content-between">
                <button type="button" class="btn btn-primary" style="width:100px" @click="setShare(note)" :disabled=" haveAccessShare(note) ? false : true">Share</button>
                <button type="button" class="btn btn-danger" style="width:100px" @click="deleteNote(note)" :disabled=" haveAccessDelete(note) ? false : true">Delete</button>
            </div>
        </div>
    </basic-card>

</div>

<div v-if="toBeShare">

    <div v-for="alert in alerts" :key="alert.alertNumber" class="position-fixed" style="top:10px;left:50%;transform:translate(-50%, 0%);">
        <div class="alert alert-dismissible d-flex flex-row justify-content-between" :class="alert.value ? 'alert-success' : 'alert-danger'">
            <p>{{ alert.reason || alert.value }}</p>
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        </div>
    </div>

    <basic-card>
        <form @submit.prevent="shareNote">
            <div class="form-group mb-3 mt-2">
                <h5>Enter email id of contributor : </h5>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email of contributor" v-model="contributorEmail">
            </div>
            <div class="form-group mb-3 mt-2">
                <h5>Enter email id of reader : </h5>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email of contributor" v-model="readerEmail">
            </div>
            <div class="d-flex flex-row justify-content-between">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="submit" class="btn btn-danger" @click="toBeShare=false">Cancel</button>
            </div>
        </form>
    </basic-card>
</div>

<div class="fixed-bottom d-flex justify-content-center mb-3">
    <div class="px-2">
        <router-link to="/updateuser"><button type="button" class="btn btn-warning mr-2">Update User</button></router-link>
    </div>
    <div class="px-2">
        <router-link to="/addnotes"><button type="button" class="btn btn-primary mr-2">Add Note</button></router-link>
    </div>
    <div class="px-2">
        <button type="button" class="btn btn-danger" @click="logout">Log Out</button>
    </div>
</div>
</template>

<script>
import BasicCard from '../layouts/BasicCard';

export default {
    components: {
        BasicCard
    },
    data() {
        return {
            toBeShare: false,
            note: {},
            contributorEmail: '',
            readerEmail: '',
            alerts: [],
            counter: 0,
        }
    },
    computed: {
        notes() {
            return this.$store.getters.notes
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login')
        },
        async deleteNote(note) {
            try {
                console.log(note);
                await this.$store.dispatch('deleteNote', note._id);
            } catch (err) {
                alert("Deletion faied")
            }
        },
        async setShare(note) {
            console.log(note);
            this.note = note;
            this.toBeShare = true;

        },
        async shareNote() {
            try {
                this.alerts = await this.$store.dispatch('shareNote', {
                    id: this.note._id,
                    contributorEmail: this.contributorEmail,
                    readerEmail: this.readerEmail
                });
                console.log(this.alerts);

                this.alerts = this.alerts.map((alert) => {
                    this.counter++;
                    return {
                        ...alert,
                        alertNumber: this.counter
                    }
                })

            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        },
        haveAccessDelete(note){
            const userId = this.$store.getters.user._id;
            console.log('note owner is ',note.owner)
            console.log('user id is ',userId)
            return note.owner === userId;     
        },
        haveAccessShare(note){
            const userId = this.$store.getters.user._id;
            return note.owner === userId || note.contributors.includes(userId);   
        }
    },
    async created() {
        try {
            await this.$store.dispatch('showNotes');
        } catch (error) {
            console.log(error.message);
            console.log('Error Occured while showing notes');
        }
    }
}
</script>
