<script lang="ts">
import { SERVER_URL, LOCAL_SERVER_URL } from '@/assets/config';


export default {
    data() {
        return {
            regex: /^[a-åA-Å0-9]{8,}$/,
            regexUsername: /^[a-åA-Å0-9]{2,25}$/,
            form: {
                uname: "",
                email: "",
                password: "",
                repeatPassword: ""
            },
            error: false,
            serverError: false,
        }
    },
    computed: {
        validUsername() {
            if(this.form.uname.length == 0)
                return null;
            return this.regexUsername.test(this.form.uname);
        },
        validPassword() {
            if (this.form.password.length === 0)
                return null;
            return this.regex.test(this.form.password)
        },
        passwordMatches() {
            if (this.form.repeatPassword.length == 0)
                return null;
            else return this.form.password === this.form.repeatPassword;
        }
    },
    methods: {
        trySubmit() {
            if(this.validUsername && this.validPassword && this.passwordMatches)
                this.submitForm();
            else {
                this.error = true;
            }
        },
        submitForm() {
            this.axios.post(SERVER_URL + '/users', {
                name: this.form.uname,
                email: this.form.email,
                password: this.form.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                this.$router.push('/login')
            }).catch((error) => {
                this.serverError = true;
            });
        }

    }
}

</script>

<template>
        <div class="d-flex justify-content-center align-items-center mt-4">
            <b-form @submit="trySubmit" class="w-50 p-4" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);">
                <h1 style="text-align: center">Sign up</h1>
                <b-form-group label="Username:">
                    <b-form-input id="usernameInput" v-model="form.uname" :state ="validUsername" placeholder="Enter username here" required />
                    <b-form-invalid-feedback>
                        Username must be between 2-25 characters long and contain only letters and digits
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Email:">
                    <b-form-input id="emailInput" v-model="form.email" placeholder="Enter email here" type="email" required />
                </b-form-group>
                <b-form-group label="Password:">
                    <b-form-input id="passwordInput" v-model="form.password" :state="validPassword" placeholder="Enter password here"
                        required type="password" />
                    <b-form-invalid-feedback v-if="!validPassword" id="passInvalidFeedback" :state="validPassword">
                        Password must be 8 or more characters long, and contain only letters and digits
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Repeat password:">
                    <b-form-input id="repeatPassword" v-model="form.repeatPassword" type="password" :state="passwordMatches" placeholder="Repeat password"
                        required />
                    <b-form-invalid-feedback>
                        Passwords are not matching
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback>
                        Passwords are matching
                    </b-form-valid-feedback>
                </b-form-group>
                <div class="d-flex justify-content-center" >
                    <b-button class="w-50 mt-4" type="submit" variant="primary">Register</b-button>
                </div>
                <p v-if="error" style="color: red"><br/>All fields must be filled and valid</p>
                <p v-if="serverError" style="color: red"><br/>An error occured</p>
                <p style="text-align: center"><br>Already have an account? <router-link to="/login">Log in here</router-link></p> 
            </b-form>
        </div>
</template>

<style>

.p-10 {
    padding: 50px;
}

.w-40 {
    width: 35%;
}


</style>