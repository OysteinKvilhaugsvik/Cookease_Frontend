import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/router";
import axios from "axios";
import VueAxios from "vue-axios";
import IconsPlugin from 'bootstrap-vue-3'
import "./assets/main.css";
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { BIconFunnel } from "bootstrap-icons-vue";


const app = createApp(App);
app.use(BootstrapVue3);
app.use(createPinia());
app.use(router);
app.use(IconsPlugin);
app.component('BIconFunnel', BIconFunnel)
app.use(VueAxios, axios);

app.mount("#app");
