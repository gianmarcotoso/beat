import { config } from 'dotenv'
config()

export const AppConfig = {
	Port: Number(process.env.APP_PORT) ?? 3000,
	Host: process.env.APP_HOST ?? 'localhost',

	Beat: {
		Number: Number(process.env.BEAT_NUMBER) ?? 4,
		Value: Number(process.env.BEAT_VALUE) ?? 4,
		BPM: Number(process.env.BEAT_BPM) ?? 120,
	},
}
