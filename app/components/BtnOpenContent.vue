<template>

    <button 
        @click="$emit('clickToggleContent')"
        :class="{
            [APP_NAME + '--openBtn']: true,
            'open': isOpen,
            'ui_search_button_search': isOpen,
        }"
        class="im-page--header-icon im-page--header-icon_search im-page-header-icon_search-shown ui_actions_menu_item" 
        aria-label="Интерфейс Бота" 
        onmouseover="showTooltip(this, { forcetoup: true, shift: [-11, -9], black: true, text: `Интерфейс Бота` })"
    >
        {{showBtnText}}
    </button>
</template>

<script>
export default {
    name: 'BtnOpenContent',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            btnText: 'Бот'
        }
    },
    computed: {
        showBtnText() {
            return this.isOpen ? `[ ${this.btnText} ⏶ ]` : `[ ${this.btnText} ⏷ ]`;
        }
    }
}
</script>

<style lang="sass" scoped>
    .bot_interface
        &--openBtn
            display: flex !important
            align-items: center
            justify-content: center
            font-weight: 500
            width: auto
            height: 100%
            padding: 0 3px
            overflow: visible
            &:not(.open)
                border: 1px solid transparent !important
            &.open
            &:before, &:after
                content: ''
                display: none


</style>

