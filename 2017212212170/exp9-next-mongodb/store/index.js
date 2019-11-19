import { action, observable, runInAction } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import axios from 'axios'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export class Store {
	@observable
	currUser = null

	@action
	start = () => {
		this.timer = setInterval(() => {
			this.lastUpdate = Date.now()
			this.light = true
		}, 1000)
	}

	@action
	login = async (params) => {
		axios.post('/api/user/signup', params)
			.then(r => {
				if (r && r.status === 200) {
					runInAction(() => {
						this.currUser = r.data.data
					})
				}
			})
	}

	@action
	logout = () => {
		console.log('log out')
		this.currUser = null
	}

	@action
	getUsers = async () => {
		const r = await axios.get('/api/user/list')
		console.log(r)
		if (r && r.status === 200) {
			return r.data
		}
	}
}

export default new Store()
