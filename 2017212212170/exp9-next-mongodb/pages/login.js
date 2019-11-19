import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import axios from 'axios'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import Router from 'next/router'

@inject('store')
@observer
class Login extends React.Component {
	state = {
		email: '',
		pwd: ''
	}

	@computed
	get currUser() {
		return this.props.store.currUser
	}

	handleChange = (e, {name, value}) => {
		this.setState({[name]: value})
		console.log(name, value)
	}

	handleSubmit = () => {
		const {email, pwd} = this.state
		this.setState({loading: true})
		this.props.store.login({email, pwd})
			.then(() => this.setState({loading: false}))
	}

	render() {
		const {email, pwd} = this.state

		if (this.currUser) {
			const isClient = typeof document !== 'undefined'
			isClient && Router.replace('/')
		}

		return (
			<Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<div className="toast-wrap">
						<SemanticToastContainer position="top-right" className="toast"/>
					</div>
					<Header style={{marginBottom: 50}}  as='h2' color='teal' textAlign='center'>
						Log-in to your account
					</Header>
					<Form size='large'>
						<Segment stacked>
							<Form.Input
								fluid icon='user'
								iconPosition='left'
								placeholder='E-mail address'
								name='email'
								value={email}
								onChange={this.handleChange}
							/>
							<Form.Input
								fluid
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
								name='pwd'
								value={pwd}
								onChange={this.handleChange}
							/>

							<Button color='teal' fluid size='large' onClick={this.handleSubmit}>
								登录
							</Button>
						</Segment>
					</Form>
					<Message>
						New to us? <Link href='/signup'><a href='#'>Sign Up</a></Link>
					</Message>
				</Grid.Column>
			</Grid>
		)
	}
}

export default Login
