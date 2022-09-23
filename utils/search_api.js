import axios from 'axios'

export default async function searchApi (data, foundMedicines) {
  const config = {
    method: 'post',
    url: process.env.SEARCH_API,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  try {
    const response = await axios(config)
    const r = response.data
    const pharmacyArray = r.map((med) => ({
      name: med.name,
      price: med.price,
      units: med.units,
      type: med.type,
      concentration: med.concentration,
      link: med.link
    }))
    return pharmacyArray
  } catch (e) {
    console.log(e)
  }
}
