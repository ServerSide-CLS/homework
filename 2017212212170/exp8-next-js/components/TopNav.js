import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import Link from 'next/link'

export default class TopNav extends Component {
	state = { activeItem: 'home' }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Segment >
				<Menu  secondary>
					<Link href="/home">
						<Menu.Item
							name='Home'
							active={activeItem === 'Home'}
						/>
					</Link>
					<Menu.Item
						name='Message'
						active={activeItem === 'Message'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='About'
						active={activeItem === 'About'}
						onClick={this.handleItemClick}
					/>
				</Menu>
			</Segment>
		)
	}
}
