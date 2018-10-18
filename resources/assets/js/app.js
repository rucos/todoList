
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


window.Vue = require('vue');

import VueRouter from 'vue-router';
import TodoListIndex from './components/todoList/TodoListIndex.vue';
import TodoListCreate from './components/todoList/TodoListCreate.vue';
import TodoListEdit from './components/todoList/TodoListEdit.vue';

window.Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        components: {
            todoListIndex: TodoListIndex
        }
    },
    {
        path: '/create',
        component: TodoListCreate,
        name: 'createTodoList'
    },
    {
        path: '/edit/:id',
        component: TodoListEdit,
        name: 'editTodoList'}
]

const router = new VueRouter({ routes })

const app = new Vue({ router }).$mount('#app')








