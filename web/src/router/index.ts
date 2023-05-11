import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import store from '@/store/index';
import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';
import Stock from '@/pages/stock/stock.vue';
import {getAuthStatus} from '@/utils/oidc-providers';
import Marketplace from '@/pages/marketplace/marketplace.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'stock',
                name: 'Stock',
                component: Stock,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '',
                name: 'Dashboard',
                component: Marketplace,
                meta: {
                    requiresAuth: false
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresUnauth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

router.beforeEach(async (to, from, next) => {
    let storedAuthentication = store.getters['auth/authentication'];

    if (!storedAuthentication) {
        storedAuthentication = await checkSession();
    }

    if (Boolean(to.meta.requiresAuth) && Boolean(!storedAuthentication)) {
        return next('/login');
    }
    return next();
});

export default router;

export async function checkSession() {
    try {
        let responses: any = await Promise.all([getAuthStatus()]);

        responses = responses.filter((r: any) => Boolean(r));

        if (responses && responses.length > 0) {
            return responses[0];
        }
    } catch (error: any) {
        return;
    }
}
