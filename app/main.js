import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import NavWatcher from './scripts/nav-watcher'
import Launcher from './scripts/launcher'

import getChatNames from './scripts/testApi/getChatNames';

Vue.config.productionTip = false

// Имя приложения
const APP_NAME = 'bot_interface'
    // Селектор контейнера приложения
const APP_CONTAINER_SELECTOR = `#${APP_NAME}`
    // Параметры нашей беседы
const CHAT_PARAMS = {
        NAMES: [],
        IDS: {}
    }
    // Для контроля при отладке
window.CHAT_PARAMS = CHAT_PARAMS

let wasInit = false

const select = x => document.querySelector(x)
const selectAll = x => document.querySelectorAll(x)
const newEl = x => document.createElement(x)

// Запускает инициализацию основного кода приложения
const initBotInterface = () => {
    if (wasInit) return
    wasInit = true

    // Если на странице еще нет контейнера приложения
    if (!select(APP_CONTAINER_SELECTOR)) {
        let searchBtn = select('.im-page--aside .im-page--header-icon_search');
        if (!searchBtn) return

        // Создаем блок, в который будет монтироваться приложение
        let appElem = newEl('div')
            // id корневого элемента приложения будет соответствовать имени приложения
        appElem.id = APP_NAME
            // и добавляем его в конец body
        searchBtn.before(appElem)
    }

    // С помощью глобального миксина добавляем APP_NAME в data всех компонентов
    Vue.mixin({
        data() {
            return {
                APP_NAME,
                APP_CONTAINER_SELECTOR,
                CHAT_PARAMS
            }
        }
    })

    // Сохраняем экземпляр приложения в глобальную переменную под именем приложения
    window[`$${APP_NAME}`] = new Vue({
        router,
        store,
        created() {
            // Заносим имя приложения в store
            this.$store.commit('setAppName', APP_NAME)
        },
        render: h => h(App)
    }).$mount(APP_CONTAINER_SELECTOR)
}

// Уничтожает инстанс интерфейса и удаляет его со страницы
const destroyBotInterface = () => {
    if (!wasInit) return
    wasInit = false

    if (window[`$${APP_NAME}`]) {
        window[`$${APP_NAME}`].$destroy()
        delete window[`$${APP_NAME}`]
    }

    let appElem = select(APP_CONTAINER_SELECTOR)
    if (appElem) appElem.innerHTML = ''
}

const matchChatName = chatName => {
    if (CHAT_PARAMS.NAMES.length === 0) return
    let result = CHAT_PARAMS.NAMES.some(name => name === chatName)

    return result
}

const matchChatId = chatId => {
    if (CHAT_PARAMS.IDS[chatId]) {
        return true
    } else {
        return false
    }
}

// Возвращает true если заголовок диалога совпадает с нашей беседой
const checkChatName = () => {
    let result = false;
    let chatHeader = select('.im-page--title-main-inner')

    if (chatHeader && matchChatName(chatHeader.textContent)) {
        result = true
    }

    return result;
}

// Проверяет находимся ли мы в нужной беседе. 
// Принимает объект локации родного роутера вк(window.nav.objLoc)
const checkNavToChat = (objLoc) => {
    // console.log('Параметры коллбека перехода: ', objLoc)
    let regex = /c(\d+)/mi
    let chat_id = null
    let res = null

    // Если мы зашли в любую беседу
    if (objLoc[0] === 'im' && objLoc.sel && (res = objLoc.sel.match(regex))) {
        chat_id = res[1];
        // console.log('--- Мы в беседе с id: ', chat_id, ' ---');

        // Если уже ранее был найден id нашей беседы, и сейчас мы в ней
        if (matchChatId(chat_id)) {
            initBotInterface()

            // Если уже ранее был найден id нашей беседы, и сейчас мы НЕ в ней
        } else if (!matchChatId(chat_id)) {
            destroyBotInterface()
            LAUNCHERS.init.run(chat_id)
        }

        // Если мы вообще не в беседе
    } else {
        LAUNCHERS.init.stop()
        destroyBotInterface()
    }
}

// Декоратор роутера VK
window.navWatcher = new NavWatcher({
    callback: checkNavToChat
});

const LAUNCHERS = {
        // Лаунчер, срабатывающий каждый раз при переходе по страницам ВК.
        // Вызывает инициализацию интерфейса, если мы заходим в нашу беседу 
        // с любой другой страницы ВК
        init: new Launcher({
            condition: checkChatName,
            callback(chat_id) {
                CHAT_PARAMS.IDS[chat_id] = chat_id
                initBotInterface()
            },
            attempts: 100
        }),
        // Лаунчер, срабатывающий один раз при запуске этого скрипта.
        // Вызывает инициализацию интерфейса, если этот скрипт загрузился сразу в нашей беседе
        navReady: new Launcher({
            condition: () => window.nav && window.nav.objLoc,
            callback: () => checkNavToChat(window.nav.objLoc)
        })
    }
    // Для доступа к лаунчерам из консоли во время отладки
window[`${APP_NAME}_LAUNCHERS`] = LAUNCHERS

const globalInit = async() => {
    let names_json = await getChatNames()
    try {
        CHAT_PARAMS.NAMES = JSON.parse(names_json)
    } catch (err) {
        console.log('%c%s', (window.log_color) ? window.log_color.red : '', `${APP_NAME}: Не удалось получить список бесед`)
    }

    // Запускает ожидание родного роутера ВК для анализа страницы, 
    // на которой запустился скрипт
    LAUNCHERS.navReady.run()
}

// Точка входа
globalInit()