<script lang="ts">
import { isLoggedIn, login, store } from "@/assets/auth-service";

export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
        }
    },
    methods: {
        async onSubmit() {
            await login(this.form.email, this.form.password);
            if (isLoggedIn(store.token)) {
                this.$router.push("/search");
            }
            else {
                this.$router.push("/login");
            }
        },

    }
}

</script>

<template>
    <div class="d-flex justify-content-center align-items-center mt-3" style="height: 80vh;">
        <div class="w-50 p-4" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);">
            <h1 style="text-align: center">Log in</h1>
            <b-form @submit="onSubmit">
                <b-form-group label="Email:">
                <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email here"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
                <b-form-input
                    id="password"
                    v-model="form.password"
                    placeholder="Enter password here"
                    type="password"
                    required
                ></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-center">
                <b-button class="w-50 mt-4" type="submit" variant="primary">Log in</b-button>
            </div>
            </b-form>
            <p style="text-align: center"><br>Don't have an account? <router-link to="/signup">Sign up</router-link></p> 
        </div>
    </div>
</template>