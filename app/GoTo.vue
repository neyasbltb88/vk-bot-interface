<template>
    <a href="!#" @click.prevent="goTo(routeName)" class="go-to router-link" :class="_activeClass">
        <slot></slot>
    </a>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'goTo',
    props: { 
        // Имя роута или объект, который может содержать имя роута и параметры
        to: {
            type: [Object, String],
            required: true
        },
        // Имя активного класса
        activeClass: String,
        // Флаг сохранения перехода на роут в localStorage в режиме роутера 'abstract'
        remember: {
            type: [Boolean, String],
            default: true
        }
    }, 
    data() {
        return {
            routeName: '',
            routeParams: {},
            matcher: this.$router.matcher.match,
            _remember: true
        }
    },
    created() {
        if(this.to instanceof Object) {
            this.routeName = this.to.name;
            this.routeParams = this.to.params || {};
        } else {
            this.routeName = this.to;
        }

        if(typeof this.remember === 'string') {
            this._remember = (this.remember === 'false') ? false : true;
        } else {
            this._remember = this.remember;
        }

        let goTo = this.$store.getters.goTo;
        if(!goTo) this.$store.commit('setGoTo', this.goTo);
        
    },
    computed: {
        ...mapGetters(['SStorage']),
        // Проверяет совпадает ли текущий роут с целевым для этого компонента
        _isActive() {
            let active = false;
            let match = this.matcher(this.$route).matched[0];

            if(match !== undefined && match.name === this.routeName) {
                active = true;
            }

            return active;
        },
        // Вешает активный класс, если текущий роут совпадает с целевым для этого компонента
        _activeClass() {
            let className = '';
            if(this._isActive) className = this.activeClass || 'router-link-active';
            
            return className;
        }
    },
    methods: {
        // routeName: String - имя роута для перехода
        // routeParams: Object - параметры, передаваймые в роутер
        // query: Object - GET-параметры
        // remember: Boolean - запоминать переходи на этот роут в режиме 'abstract'?
		goTo(routeName, routeParams, query, remember) {
			let page = '_'; // path часть url самого сайта(VK)
            routeParams = routeParams ? routeParams : this.routeParams || {};
            query = query ? query : {};
            remember = remember ? remember : (this._remember === false) ? false : true ;

            // Пока это заточено только под VK
            // nav - роутер VK
            // В nav.objLoc объект, описывающий составляющие текущего url
			if(window.nav && window.nav.objLoc) {
                query = Object.assign(query, window.nav.objLoc);
                // query[0] - это path часть url
				if(query[0] !== undefined) {

                    // Очищаем path от предыдущего роута
                    let page = query[0];
                    let match = this.matcher(page).matched[0];
                    // Если есть совпадение с каким-либо роутом, разбиваем path по / 
                    // и отбрасываем последний элемент path (наш предыдущий роут)
                    if(match !== undefined) {
                        page = page.split('/');
                        page = page.slice(0, 1 - path.length).join('/');
                    }
                    
                    // И удаляем path из объекта локации, чтобы в нем остались только GET-параметры
					delete query[0];
				}
			}

			let route = {
				name: routeName, // Имя роута, на который переходим
				params: Object.assign(routeParams, {page}), // path страницы VK
				query // GET-параметры страницы VK
            };

            if(remember && this.$store.getters.SStorage) {
                let SStorage = this.$store.getters.SStorage;
                SStorage.set('route', route);
            }

            // Переход на нужный роут
            this.$router.replace(route);
        }
    }
}
</script>
