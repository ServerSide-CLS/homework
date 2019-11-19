import React from 'react'
import Head from 'next/head'
import TopNav from './TopNav'

const Header = () => (
	<div>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta charSet="utf-8" />
		</Head>
		<style jsx global>{`

    `}</style>
	</div>
)

const Footer = () => (
	<div>
		footer
	</div>
)

export default ({ children }) => (
	<div>
		<Header />
		<TopNav />
		{ children }
	</div>
)
