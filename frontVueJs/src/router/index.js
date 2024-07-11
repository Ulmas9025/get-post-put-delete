import { createRouter, createWebHistory } from 'vue-router'
import AppGet from '../components/appGet/AppGet.vue';
import AppPost from '../components/appPost/AppPost.vue';
import AppDelete from '../components/appDelete/AppDelete.vue';
import AppHome from '../components/appHome/AppHome.vue';
import AppUpdate from '../components/appUpdate/AppUpdate.vue';


const router = createRouter({
    history: createWebHistory (),
    routes : [
        {path: '/' , component: AppHome},
        {path: '/get' , component: AppGet},
        {path: '/post' , component: AppPost},
        {path: '/delete' , component: AppDelete},
        {path: '/update' , component: AppUpdate}
    ]
})

export default router
