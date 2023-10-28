import "./assets/main.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Toaster from "@meforma/vue-toaster";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css'
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);


app.component('EasyDataTable', Vue3EasyDataTable);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2);

app.use(VueSweetalert2);
app.use(Toaster);

app.mount("#app");
