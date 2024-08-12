//  第一步： 引入createRouter
import { createRouter, createWebHistory } from 'vue-router'
//  第二步： 创建路由实例
const router = createRouter({
    history: createWebHistory(),
	
    routes: [
		
        //  配置路由规则
        { path: '/titleContent', component: () => import('../views/title-content') },
	]
})
//  第三步： 导出路由实例
export default router
