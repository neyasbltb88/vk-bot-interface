<template>
    <div :class="{
            [APP_NAME + '--content']: true,
            'open': isOpen
        }"
    >
        <Default></Default>
    </div>
    
</template>

<script>
import Default from './Default.vue';

export default {
    name: 'Content',
    components: {
        Default
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="sass">
    .im-page--chat-header-in .im-page--aside
        .bot_interface
            &--content
                box-sizing: border-box
                display: flex
                justify-content: center
                width: 100%
                height: 100%
                border: 1px solid rgba(105, 109, 125, 0.4) !important
                background-color: rgb(37, 48, 60)
                transition: transform 250ms cubic-bezier(0.21, 0.02, 0.46, 1) !important
                will-change: transform
                transform: translate3d(0, -100%, 1px)
                overflow: auto
                &.open
                    transform: translate3d(0, 0, 1px)

</style>
