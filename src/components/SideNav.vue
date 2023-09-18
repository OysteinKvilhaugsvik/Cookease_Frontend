<script lang="ts">
import { store, logout, isLoggedIn } from '@/assets/auth-service';
export default {
    methods: {
        logout() {
            logout();
            this.$router.push('/login');
        }
    },
    computed: {
        isLoggedIn() {
            return isLoggedIn(store.token);
        }
    }
}

</script>
<template>
    <div class="sidenav vh-100">
        <a v-if="isLoggedIn" @click="logout">Log out</a>
        <RouterLink v-if="!isLoggedIn" to="/login" >Login</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
        <RouterLink v-if="isLoggedIn"  to="/myrecipes">My recipes</RouterLink>
        <RouterLink v-if="isLoggedIn"  to="/createrecipe">Create Recipe</RouterLink>
    </div>
</template>

<style scoped>
/* The side navigation menu */
.sidenav {
    font-size: large;
    text-align: center;
    height: 100%;
    margin-top: 85px;
    /* 100% Full-height */
    width:10%;
    /* 0 width - change this with JavaScript */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Stay on top */
    top: 0;
    /* Stay at the top */
    left: 0;
    background-color: white;
    /* Black*/
    overflow-x: hidden;
    /* Disable horizontal scroll */
    padding-top: 60px;
    /* Place content 60px from the top */
    transition: 0.5s;
    /* 0.5 second transition effect to slide in the sidenav */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

a {
    display: block;
    padding: 5px;
    text-decoration: none;
    color: black;
    border-bottom: 1px solid rgb(196, 196, 196);
}

a:hover {
    background-color: rgb(236, 236, 236);
    color: black;
}
</style>