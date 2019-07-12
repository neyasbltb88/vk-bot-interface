<template>
    <div :id="APP_NAME" :class="APP_NAME" class="ui_search_new">
        <btn-open-content 
            @clickToggleContent="toggleContent" 
            :is-open="openedContent"
        />

        <div class="ui_search_new"
            :class="{ [APP_NAME + '--content-container']: true }"
            :style="{ height: openedContent ? '424px' : 0 }"
        >
            <Content :is-open="openedContent"></Content>
        </div>
        
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import SStorage from './scripts/sstorage'
import BtnOpenContent from './components/BtnOpenContent.vue';
import DropdownArrow from './components/DropdownArrow.vue'
import Content from './components/Content.vue';

export default {
    name: 'app',
    data() {
        return {
            defaultRouteName: 'HelloWorld',
            openedContent: false
        }
    },
    components: {
        BtnOpenContent,
        DropdownArrow,
        Content
    },
    computed: {
        openedColor() {
            if(this.openedContent) {
                return '#ffc000';
            } else {
                return '#C3CFE0'
            }
        }
    },
    methods: {
        ...mapMutations(['setSStorage']),
        toggleContent() {
            this.openedContent = !this.openedContent;
        }
    },
    created() {
        // Инициализируем хранилище в localStorage с ключом по имени приложения
        let sstorage = new SStorage(this.APP_NAME, {
            route: {
                name: this.defaultRouteName,
                params: { page: '_' },
                query: {}
            }
        });
        this.setSStorage(sstorage);

        // Если режим роутера 'abstract', то делаем переход на роут, сохраненный в localStorage
        if(this.$router.mode === 'abstract') {
            let restoreRoute = sstorage.get('route');
            this.$router.replace(restoreRoute)
        }
        
    }
}
</script>

<style lang="sass">
    .im-page--aside
        display: flex

    .im-page--chat-header
        z-index: 20

    .im-page--chat-body
        z-index: 1
        .ui_scroll_bar_container
            z-index: 1
</style>


<style lang="sass" scoped>
    .bot_interface
        &--content-container
            position: absolute
            width: 100%
            height: 424px
            top: 100%
            left: 0
            overflow: hidden
            z-index: 11
        &.ui_search_new
            .ui_search_button_search
                background-image: none !important
                height: 100%
                width: auto
                padding: 0 3px

</style>
