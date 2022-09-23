import searchApi from './utils/search_api.js'
import medsList from './utils/list.js'

export default async function findPrices () {
  const medList = medsList()
  let meds = {}
  const pharmacies = [
    'colsubsidio',
    'cruz_verde'
  // 'farmalisto',
  // 'farmatodo',
  // 'la_rebaja',
  // 'pasteur',
  // 'droguerias_uno_a',
  // 'tu_drogueria_virtual',
  // 'dermatologica',
  // 'medipiel'
  ]

  let foundMedsArray = []

  for (let i = 0; i < medList.length; i++) {
    for (const pharmacy of pharmacies) {
      const data = JSON.stringify({
        medicine: medList[i].toLowerCase(),
        department: 'antioquia',
        city: 'medellin',
        pharmacy
      })
      const foundMeds = await searchApi(data)
      foundMedsArray.push(...foundMeds)
    }
    meds = { ...meds, [medList[i].toLowerCase()]: foundMedsArray }
    foundMedsArray = []
    console.log(medList[i].toLowerCase(), meds[medList[i].toLowerCase()])
  }
}
