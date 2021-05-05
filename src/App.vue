<template>
    <router-view></router-view>
</template>

<style>

* {
    margin : 0;
    padding : 0
}

</style>

<script>
export default {
    created(){
        try {
            this.$store.dispatch('tryLogin');
        } catch(error){
            console.log(error.message);
        }
    }
}
</script>