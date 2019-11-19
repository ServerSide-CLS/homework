import React, { Component } from 'react'
import { Button, Image, Menu, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { withRouter } from 'next/router'

@inject('store')
@observer
class TopNav extends Component {
	state = {activeItem: 'home'}

	@computed
	get currUser() {
		return this.props.store.currUser
	}

	render() {
		const pathname = this.props.router.pathname

		console.log('pathname', pathname)

		return (
			<Segment style={{margin: 0}}>
				<Menu secondary>
					<Link href="/">
						<Menu.Item
							name='Home'
							active={pathname === '/'}
						/>
					</Link>
					<Link href="/admin">
						<Menu.Item
							name='Admin'
							active={pathname === '/admin'}
						/>
					</Link>
					{
						this.currUser ?
							<Menu.Item position='right'>
								<Image src='https://semantic-ui.com/images/avatar2/large/matthew.png' avatar/>
								<span>{this.currUser.email}</span>
								<Button
									style={{marginLeft: '1em'}}
									onClick={this.props.store.logout}
								>
									Log out
								</Button>
							</Menu.Item> :
							<Menu.Item position='right'>
								<Link href="/login">
									<Button as='a'>
										Log in
									</Button>
								</Link>
								<Link href="/signup">
									<Button as='a' primary style={{marginLeft: '0.5em'}}>
										Sign Up
									</Button>
								</Link>
							</Menu.Item>
					}

				</Menu>
			</Segment>
		)
	}
}

export default withRouter(TopNav)
