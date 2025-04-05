import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

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
        path:"/auth",
        component: () => import("@/views/Auth.vue"),
        children: [
            {
                path: "/auth/login",
                name: "login",
                component: () => import("@/components/Login.vue"),
            },
            {
                path: "/auth/signin",
                name: "signin",
                component: () => import("@/components/Register.vue")
            }
        ]
    },
    {
        path:"/check",
        name:"check",
        component: () => import("@/views/CheckConfirm.vue"),
        children: [
            {
                path: "/check/check_confirmation_email/:email",
                name:"checkConfirmationEmail",
                component: () => import("@/components/CheckConfirmEmail.vue"),
                props: true
            },
            {
                path: "/check/forgot_password/",
                name: "forgotPassword",
                component: () => import("@/components/ForgotPassword.vue")
            },
            {
                path: "/check/reset_password/:id",
                name: "resetPassword",
                component: () => import("@/components/ChangePassword.vue"),
                props: true
            },
            {
                path: "/check/check_confirmation_passoword/:email",
                name:"checkConfirmationPassword",
                component: () => import("@/components/CheckConfirmPassword.vue"),
                props: true
            }
        ]
    },
    {
        path: "/job_detail/:name",
        name: "jobDetail",
        component: () => import("@/views/JobDetail.vue"),
        props: true
    },
    {
        path:"/profile",
        name:"profile",
    },
    {
        path:"/company",
        name: "company"
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;