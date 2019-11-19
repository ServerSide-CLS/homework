import React from 'react'
import App from 'next/app'
import { Provider } from 'mobx-react'

import Layout from '../components/Layout'
import store from '../store'

/* 全局样式 */
import 'semantic-ui-css/semantic.css'
import '../style/global.css'

class MyApp extends App {

	render() {
		const {Component, pageProps} = this.props
		return (
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		)
	}
}

export default MyApp
