// Client ID: ly0hp7u958epoyb5d8sajdln9refq0
// Client Secret: io3jtssrsm18w4q607m61muabxylni
import axios from "axios"

var access_token = ''
const client_id = 'ly0hp7u958epoyb5d8sajdln9refq0'
const client_secret = 'io3jtssrsm18w4q607m61muabxylni'

const authenticate = async () => {
  const base_url = 'https://id.twitch.tv/oauth2/token'

  await axios.post(`${base_url}?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`)
  .then((response) => {
    console.log(response)
    access_token = response.data['access_token']
  })
}

const search = (search_text) => {
  authenticate().then(() => {
    axios.post(`https://api.igdb.com/v4/search`, 
    `fields *; search "${search_text}";`, 
    {headers: {'Client-ID': client_id, 'Authentication': `Bearer ${access_token}`}})
    .then((response) => {
      console.log(response)
    })
  })
}

export default search
