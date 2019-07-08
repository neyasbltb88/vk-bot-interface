import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import NavWatcher from './scripts/nav-watcher'

Vue.config.productionTip = false

// Имя приложения
const APP_NAME = 'bot_interface'
const CHAT_NAME = 'БОТ'
const select = x => document.querySelector(x);
const selectAll = x => document.querySelectorAll(x);
const newEl = x => document.createElement(x);

// С помощью глобального миксина добавляем APP_NAME в data всех компонентов
Vue.mixin({
    data() {
        return {
            APP_NAME,
            CHAT_NAME
        }
    }
})

// Декоратор роутера VK
window.navWatcher = new NavWatcher({
    callback: objLoc => {
        console.log('Параметры коллбека перехода: ', objLoc)

        let regex = /c(\d+)/mi;
        let chat_id = null;
        let res = null;

        if (objLoc.sel && (res = objLoc.sel.match(regex))) {
            chat_id = res[1];
            console.log('Оп! Мы вбеседе с id: ', chat_id);

            // TODO: Здесь надо получать элемент с названием беседы и 
            // сравнивать его текст с константой CHAT_NAME
            if (select('.im-page--title-main-inner._im_page_peer_name').textContent == CHAT_NAME){
            	console.log('Мы на месте');
            }
            else {
            	console.log('Нам не сюда');
            }

        }
    }
});

function init() {
    // Создаем блок, в который будет монтироваться приложение
    let appElem = newEl('div')
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
}

// window.addEventListener('load', init)