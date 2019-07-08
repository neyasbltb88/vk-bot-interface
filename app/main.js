import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import NavWatcher from './scripts/nav-watcher'
import launcher from './scripts/launcher'

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

function checkChatName() {
    let chatHeader = select('.im-page--title-main-inner');
    return chatHeader && chatHeader.textContent === CHAT_NAME;
}

// Декоратор роутера VK
window.navWatcher = new NavWatcher({
    callback: objLoc => {
        console.log('Параметры коллбека перехода: ', objLoc)

        let regex = /c(\d+)/mi;
        let chat_id = null;
        let res = null;

        // Если мы зашли в любую беседу
        if (objLoc.sel && (res = objLoc.sel.match(regex))) {
            chat_id = res[1];
            console.log('Оп! Мы вбеседе с id: ', chat_id);

            // Работает определение беседы, но без ограничения в attempts
            // экзкмпляры лаунчера стакаются при каждом заходе в любую беседу.
            // Нужно сделать launcher классом с методами launch и stop
            // и не допускать внутри класса их повторные вызызовы.
            launcher({
                condition: checkChatName,
                callback() {
                    console.log('Мы в нужной беседе');
                },
                attempts: 100
            })

            // Если мы вообще не в беседе
        } else {

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

// TODO: Тут надо так же запускать старт лаунчера
// Если скрипт запустился уже в нужной беседе, то сразу активировать основную логику
if (checkChatName()) init();

// window.addEventListener('load', init)