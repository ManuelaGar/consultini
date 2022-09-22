import axios from 'axios'
import medsList from './list.js'
// import average from './average.js'

const pharmacies = [
  'colsubsidio',
  'cruz_verde'
]

const config = {
  method: 'post',
  url: process.env.SEARCH_API,
  headers: {
    'Content-Type': 'application/json'
  }
}

let medArray = []

async function callSearchApi (data) {
  config.data = data

  try {
    const response = await axios(config)
    const r = response.data
    medArray.push(r.map((med) => ({
      name: med.name,
      price: med.price,
      units: med.units,
      type: med.type,
      concentration: med.concentration,
      link: med.link
    })))
  } catch (e) {
    console.log(e)
  }
}

async function main () {
  const medList = medsList()
  for (let i = 0; i < medList.length; i++) {
    for (const pharmacy of pharmacies) {
      const data = JSON.stringify({
        medicine: medList[i].toLowerCase(),
        department: 'antioquia',
        city: 'medellin',
        pharmacy
      })
      await callSearchApi(data)
      console.log(medList[i], pharmacy, medArray)
    }
    medArray = []
  }
}

main()
