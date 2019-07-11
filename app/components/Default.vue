<template>
	<div class="appVue">
		<img alt="Vue logo" 
            src="../assets/logo.png" 
            class="logo"
            @click="goHome">

		<h3>Навигация</h3>
		<ul>
			<li>
				<go-to :to="{name: 'HelloWorld'}">HelloWorld</go-to>
			</li>
			<li>
				<go-to to="RouterTest">RouterTest</go-to>
			</li>
            <li>
				<go-to to="RouterTest" remember="false">RouterTest (not remember)</go-to>
			</li>
		</ul>

		<router-view></router-view>
	</div>
</template>

<script>
import GoTo from '../GoTo.vue';


export default {
    name: 'default',
    data() {
        return {
            
        }
    },
    components: { GoTo },
    computed: { },
    methods: {
        goHome() {
            this.$store.getters.goTo('HelloWorld', {page_: '123'}, {admin: true});
        }
    },
    created() {
        
    }
}
</script>

<style scoped lang="scss">
.appVue {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.logo {
    cursor: pointer;
}

h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}

a.router-link-active {
    color: #ffc000 !important;
}
</style>
