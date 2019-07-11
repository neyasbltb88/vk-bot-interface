<template>
    <button 
        @click="$emit('clickToggleContent')"
        :class="APP_NAME + '--openBtn'"
        class="im-page--header-icon im-page--header-icon_search im-page-header-icon_search-shown" 
        aria-label="Интерфейс Бота" 
        onmouseover="showTooltip(this, { forcetoup: true, shift: [0, -9], black: true, text: 'Интерфейс Бота' })"
    >
        БОТ
    </button>
</template>

<script>
export default {
    name: 'BtnOpenContent'
}
</script>

<style lang="sass" scoped>
    .bot_interface
        &--openBtn
            display: flex !important
            align-items: center
            justify-content: center
            &:before
                background-image: none !important;
                display: none !important;
</style>

