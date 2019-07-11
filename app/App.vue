<template>
    <div :id="APP_NAME" :class="APP_NAME">
        <btn-open-content @clickToggleContent="toggleContent"></btn-open-content>

        <Content :is-open="openedContent"></Content>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import SStorage from './scripts/sstorage'
import BtnOpenContent from './components/BtnOpenContent.vue';
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
        Content
    },
    computed: { },
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
</style>


<style lang="sass" scoped>
    // .bot_interface

</style>
