import React from 'react'
import { Header, Icon, Image, List } from 'semantic-ui-react'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import axios from 'axios'

class Admin extends React.Component {

	state = {
		userList: []
	}

	static async getInitialProps(ctx) {
		const r = await axios.get('/api/user/list')
		console.log('r', r)
		if (r && r.status === 200) {

			return {
				userList: r.data.data.users
			}
		}
	}

	render() {

		const {userList} = this.props

		console.log('userList', userList)

		return (
			<div style={{height: '50vh'}}>
				<div className="toast-wrap">
					<SemanticToastContainer position="top-right" className="toast"/>
				</div>
				<Header style={{marginBottom: 50}} as='h2' color='teal' textAlign='center'>
					用户列表
				</Header>
				<div className="g-content">
					<List divided verticalAlign='middle'>

						{userList && userList.map(item => (
							<List.Item style={{width: 300}} key={item._id}>
								<List.Content>
									<List.Header as='a'><Icon name='user' />{item.email}</List.Header>
								</List.Content>
							</List.Item>
						))}
					</List>
				</div>
			</div>
		)
	}
}

export default Admin
