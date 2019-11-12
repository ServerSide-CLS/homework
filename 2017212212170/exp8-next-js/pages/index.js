import React, { Component } from 'react'
import { Button, Form, Icon, Loader, Message } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import axios from 'axios'
import TopNav from '../components/TopNav'
import 'semantic-ui-css/semantic.min.css'
import '../style/global.css'

const VERCODE_REMAIN = 60     // 设置验证码倒计时

class Register extends Component {
	state = {
		email: '',
		vercode: '',
		pwd: '',
		repwd: '',
		_vercode: '',
		emailCheck: 'before',   // 'before' => 'fail' or 'pass'
		vercodeCheck: 'before', // 'fail' or 'pass'
		pwdCheck: 'before',
		cd: VERCODE_REMAIN,     // 倒计时 CountDown
		status: 'before',       // 验证码状态 'before' => 'sending' => 'checking'
		loading: false
	}

	handleChange = (e, {name, value}) => {
		if (name === 'vercode') {
			this.validateField(name, value)
		}
		this.setState({[name]: value})
	}

	doTimer = () => {
		this.setState({cd: VERCODE_REMAIN}, () => {
			this._timeHandle = setInterval(this.changeCD, 1000)
		})
	}

	changeCD = () => {
		let cd = this.state.cd - 1
		this.setState({cd})

		if (cd === 0) {
			this.setState({
				status: 'before'
			})
			clearInterval(this._timeHandle)
		}
	}

	handleSubmit = () => {
		const {email, vercode, pwd, repwd, status, emailCheck, pwdCheck, vercodeCheck} = this.state
		this.setState({loading: true})
		if (emailCheck === 'pass' && vercodeCheck === 'pass' && pwdCheck === 'pass') {
			axios.post('/api/register', {email, vercode, pwd, repwd, status})
				.then(r => {
					if (r && r.status === 200) {
						toast({
							type: 'success',
							icon: 'check circle outline',
							title: r.data.msg,
							description: r.data.msg,
							time: 5000
						})
						this.setState({
							loading: false
						})
					}
				})
		}
	}

	validateField = (fieldName, value) => {
		let check = 'fail'
		console.log('check ' + fieldName + '  ' + value)
		switch (fieldName) {
			case 'email':
				check = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? 'pass' : 'fail'
				this.setState({emailCheck: check})
				break
			case 'vercode':
				if (this.state.status === 'checking') {
					console.log(`vercode = ${this.state._vercode}, your is ${value}`)
					check = value === this.state._vercode ? 'pass' : 'fail'
					this.setState({vercodeCheck: check})
				}
				break
			case 'repwd':
				check = value.length > 2 && value === this.state.pwd ? 'pass' : 'fail'
				this.setState({pwdCheck: check})
				break
			default:
				break
		}

		console.log(`check ${fieldName}: ${value}, ${check}`)

		return check
	}

	sendVercode = () => {
		console.log('发送验证码')

		this.validateField('email', this.state.email)
		if (this.state.emailCheck === 'pass') {
			const params = {
				email: this.state.email,
			}
			this.setState({status: 'sending'})
			axios.post('/api/register/vercode', params)
				.then(r => {
					if (r && r.status === 200) {
						this.setState({status: 'checking', _vercode: r.data.data.vercode})
						this.doTimer()
						console.log(r.data)
					}
				})
		}
	}

	shouldBlur = (e) => {
		let value = e.target.value
		let name = e.target.name

		this.validateField(name, value)
	}

	render() {
		const {email, vercode, pwd, repwd, status, emailCheck, pwdCheck, vercodeCheck, cd, loading} = this.state

		const vercodeBtn = (status) => {
			switch (status) {
				case 'before':
					return <Button onClick={this.sendVercode}>发送验证码</Button>
				case 'sending':
					return <Button loading>发送验证码</Button>
				case 'checking':
					if (vercodeCheck === 'pass') {
						return <Button positive><Icon name='check'/></Button>
					}
					return <Button>{cd} s</Button>
			}
		}

		return (
			<div>
				<TopNav/>

				<div className="toast-wrap">
					<SemanticToastContainer position="top-right" className="toast"/>
				</div>

				<div className="g-content">
					<Form className="m-form">
						<Form.Input
							label='E-mail'
							name='email'
							value={email}
							error={
								emailCheck === 'fail' ?
									{content: '请填写正确的邮箱！'} :
									false
							}
							className={emailCheck === 'pass' ? 'success' : ''}
							onBlur={this.shouldBlur}
							placeholder='请输入E-mail...'
							onChange={this.handleChange}
						/>
						<Form.Input
							label='验证码'
							name='vercode'
							action={vercodeBtn(status)}
							value={vercode}
							error={vercodeCheck === 'fail'}
							className={vercodeCheck === 'pass' ? 'success' : ''}
							onBlur={this.shouldBlur}
							placeholder='请输入验证码...'
							onChange={this.handleChange}
						/>
						<Form.Input
							label='密码'
							name='pwd'
							value={pwd}
							error={pwdCheck === 'fail'}
							className={pwdCheck === 'pass' ? 'success' : ''}
							placeholder='请输入密码...'
							type='password'
							onChange={this.handleChange}
						/>
						<Form.Input
							label='确认密码'
							name='repwd'
							value={repwd}
							error={
								pwdCheck === 'fail' ?
									{content: '密码长度至少三位，且两次密码必须相同'} :
									false
							}
							className={pwdCheck === 'pass' ? 'success' : ''}
							onBlur={this.shouldBlur}
							placeholder='请再次输入密码...'
							type='password'
							onChange={this.handleChange}
						/>
						<Button
							positive={
								emailCheck === 'pass' && vercodeCheck === 'pass' && pwdCheck === 'pass'
							}
							type='submit'
							onClick={this.handleSubmit}
							loading={loading}
						>提交</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default Register
