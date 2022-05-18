import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import Marzipano from "marzipano";

createApp(App).use(Marzipano).mount("#app");
