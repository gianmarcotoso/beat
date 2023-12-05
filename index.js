import express from 'express'
import { AppConfig } from './config.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { createBeat, createRythm } from './beat.js'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use('/', express.static('public'))

io.on('connection', (socket) => {
	socket.on('disconnect', () => {})
})

server.listen(AppConfig.Port, AppConfig.Host, () => {
	console.log('Server running on port 3000')

	const beat = createBeat({ number: AppConfig.Beat.Number, value: AppConfig.Beat.Value, bpm: AppConfig.Beat.BPM })
	const rythm = createRythm(beat)

	rythm.on('beat', (beat) => {
		io.emit('beat', beat)
	})

	rythm.on('bar', (beat) => {
		io.emit('bar', beat)
	})
})
