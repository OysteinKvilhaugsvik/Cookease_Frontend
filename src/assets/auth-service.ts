import axios from "axios";
import { SERVER_URL, LOCAL_SERVER_URL } from "./config";
import { reactive } from 'vue'
import { getPropertyFromJwtToken } from "./token-utils";

// might want to change to using pinia for this
export const store = reactive({
    token: ""
})


export function isLoggedIn(token: string) {
    console.log("Checking if logged in")
    if (token === null || token === "") {
        token = localStorage.getItem("token") as string;
    }
    if (token !== null && token !== "") {
        let expiry = getPropertyFromJwtToken(token, "exp");
        if (expiry > Date.now() / 1000) { 
            
            return true;
        }
        else {
            return false;
        }
    } 
    else {
        return false;
    }
}
export function logout() {
    store.token = "";
    localStorage.removeItem('token');
}

export async function login(email : string, password: string) {
    await axios.post(SERVER_URL + '/token', {}, {
        auth: {
            username: email,
            password: password
        }
    }).then((response) => {
        store.token = response.data;
        localStorage.setItem("token", response.data);
    }).catch((error) => {
        console.log(error);
        alert("Login failed!");
    });
}
