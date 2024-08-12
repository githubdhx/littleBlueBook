import { defineStore } from 'pinia'
// import { ref } from 'vue'
 
export const useUserStore = defineStore('title', {
	state: () => ({
		detail_title : {},
		
	}),
	actions: {
		setDetailTitle(title) {
			this.detail_title = title
		}
	}
})
 

