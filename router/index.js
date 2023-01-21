import { createRouter, createWebHistory } from 'vue-router'

import Tasks from '../views/Tasks/Tasks.vue';

const routes = [
    {
		name: 'tasks',
		path: '/tasks',
		component: Tasks
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "active"
});

export default router;
