import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import { param } from "jquery";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path:"/job",
        name:"job",
        component: () => import("@/views/Job.vue")
    },
    {
        path:"/company",
        name:"company",
    },
    {
        path:"/profile",
        name:"profile",
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;