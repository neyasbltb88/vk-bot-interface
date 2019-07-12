<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         width="10" 
         height="7" 
         viewBox="0 0 14 7" 
         :style="'transform: ' + rotate"
         class="dropdown-arrow"
         >
        <path 
            :fill="color"
            d="M1.64.232c-.424-.354-1.055-.296-1.408.128s-.296 1.055.128 1.408l6 5c.371.309.91.309 1.28 0l6-5c.424-.354.482-.984.128-1.408s-.984-.482-1.408-.128l-5.36 4.467z"/>
    </svg>

    <!-- ∧ --> <!-- Номер в Юникоде: U+2227 --> <!-- HTML-код: &#8743; -->
    <!-- ∨  --> <!-- Номер в Юникоде: U+2228 --> <!-- HTML-код: &#8744; -->

    <!-- ⏶ --> <!-- Номер в Юникоде: U+23F6 --> <!-- HTML-код: &#9206; -->
    <!-- ⏷ --> <!-- Номер в Юникоде: U+23F7 --> <!-- HTML-код: &#9207; -->

    
</template>

<script>
export default {
    name: 'DropdownArrow',
    props: {
        color: {
            type: String,
            default: '#C3CFE0'
        },
        up: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        rotate() {
            if(this.up) {
                return 'rotate(180deg);';
            } else {
                return 'rotate(0deg);';
            }
        }
    }
}
</script>

<style lang="sass" scoped>
    
</style>