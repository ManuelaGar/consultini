import dotenv from 'dotenv'
import findPrices from './find_prices.service.js'

async function main () {
  dotenv.config()
  await findPrices()
}

main().catch(console.error)
