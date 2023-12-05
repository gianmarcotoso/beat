import { EventEmitter } from 'node:events'

export function createBeat({ number = 4, value = 4, bpm = 120 }) {
	return {
		number,
		value,
		bpm,
	}
}

export function createRythm(beat, emitter = new EventEmitter()) {
	if (!beat) {
		throw new Error('Please provide a beat')
	}

	let rythm = { start: new Date().getTime(), timeout: null, bar: null, cleared: false, emitter }
	rythm.timeout = setTimeout(() => {
		if (!rythm.cleared) {
			const next = createRythm(beat, emitter)

			rythm.timeout = next.timeout
			rythm.bar = 0
			beat.start = next.start

			rythm.emitter.emit('beat', beat)
		}
	}, (beat.number * (60 * 1000)) / beat.bpm)

	const bars = Array.from(Array(beat.number).keys())
	for (const bar of bars) {
		setTimeout(() => {
			rythm.bar = bar

			rythm.emitter.emit('bar', { ...beat, bar: bar + 1 })
		}, (bar * (60 * 1000)) / beat.bpm)
	}

	function clear() {
		clearTimeout(rythm.timeout)
		rythm.cleared = true
	}

	return {
		beat,
		clear,
		start: rythm.start,
		on: rythm.emitter.on.bind(rythm.emitter),
	}
}
