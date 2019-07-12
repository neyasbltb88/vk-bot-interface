<template>
    <button 
        @click="$emit('clickToggleContent')"
        :class="{
            [APP_NAME + '--openBtn']: true,
            'open': isOpen
        }"
        class="im-page--header-icon im-page--header-icon_search im-page-header-icon_search-shown" 
        aria-label="Интерфейс Бота" 
        onmouseover="showTooltip(this, { forcetoup: true, shift: [0, -9], black: true, text: 'Интерфейс Бота' })"
    >
        <slot></slot>
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
            &.open
                color: #ffc000 !important
            &:before
                background-image: none !important
                display: none !important
</style>

