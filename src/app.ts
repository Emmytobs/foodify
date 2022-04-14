import express from 'express'
import cors from 'cors'
import dotEnv from 'dotenv'

import { v1Router } from './shared/infra/http/api/v1';

const app = express();

dotEnv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1', v1Router)

// @ts-ignore
app.use('*', (req: express.Request, res: express.Response) => {
    res.status(404).json({
        status: 'error',
        message: 'URL not found'
    })
})

const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT} in ${env}`)
});

export { app }