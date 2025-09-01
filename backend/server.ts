import app from './src/app'
import { env } from "./src/config/env";

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running in ${env.NODE_ENV} mode at ${env.BASE_URL}`)
    console.log(`Server started on port ${env.PORT}`)
})