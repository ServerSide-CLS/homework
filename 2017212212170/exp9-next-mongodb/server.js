const express     = require('express')
const next        = require('next')
const bodyParser  = require('body-parser')
const mongoose    = require('./backend/db/config/mongoose')

//next.js configuration
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
	const app = express()
	mongoose()
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.use('/api', require('./backend/router'))

	//catch-all for nextJS /pages
	app.get('*', (req, res) => {
		return handle(req, res)
	})

	app.listen(3000, err => {
		if (err) throw err
		console.log('listening on port ' + 3000)
	})
})
