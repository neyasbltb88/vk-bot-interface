import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    // history работает, но может нарушить работу сообщений в VK.
    // Если перезагрузить страницу с адресом, включающим роут, то сообщения отправляются,
    // но не отображаются, новые входящие сообщения тоже могут не появляться.
    // mode: 'history',
    mode: 'abstract',
    routes
})

export default router