const express = require('express')
const moment = require('moment')
const fs = require('fs')

const init_action = (app) => {
    app.get('/time', (req, res) => {
        res.send(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
    })

    app.post('/user', (req, res) => {
        fs.readFile('/etc/passwd', (err, data) => {
            let result = ''

            err ?
            result += err + '\n' :
            data.toString().split(/\n/).forEach((value, index, array) => {
                result += value.split(':')[0] + '\n'
            })

            res.send(result)
        })    
    })

    app.get('/phone/:id', (req, res) => {
        let phone_synax = /^[1]([3-9])[0-9]{9}$/
        phone_synax.test(req.params.id.toString()) ? res.send('OK') : res.send('NO')
    })

    app.get('*', (req, res) => {
        res.send('404. Sorry, this is an invalid URL.');
    })
}

const init_port = (app, port) => {
    app.listen(port, () => console.log(`listening on port ${port}`))
}

const app = express()
init_action(app)
init_port(app, 8900)