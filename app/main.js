import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import NavWatcher from './scripts/nav-watcher'

Vue.config.productionTip = false

// Имя приложения
const APP_NAME = 'appVue'

// С помощью глобального миксина добавляем APP_NAME в data всех компонентов
Vue.mixin({
    data() {
        return {
            APP_NAME
        }
    }
})

// Декоратор роутера VK
// TODO: скорее всего он тут не будет нужен
window.navWatcher = new NavWatcher({
    callback: objLoc => console.log('Параметры коллбека перехода: ', objLoc),
});

// Создаем блок, в который будет монтироваться приложение
let appElem = document.createElement('div')
    // id корневого элемента приложения будет соответствовать имени приложения
appElem.id = APP_NAME
    // и добавляем его в конец body
document.body.appendChild(appElem)

// Сохраняем экземпляр приложения в глобальную переменную под именем приложения
window[APP_NAME] = new Vue({
    router,
    store,
    created() {
        // Заносим имя приложения в store
        this.$store.commit('setAppName', APP_NAME)
    },
    render: h => h(App)
}).$mount(`#${APP_NAME}`)