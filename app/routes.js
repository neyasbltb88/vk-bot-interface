import HelloWorld from './components/HelloWorld.vue'
import RouterTest from './components/RouterTest.vue'

export default [
    { path: '/:page/hello-world', component: HelloWorld, name: 'HelloWorld' },
    { path: '/:page/router-test', component: RouterTest, name: 'RouterTest' }
]