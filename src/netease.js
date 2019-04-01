const fetch = require('node-fetch')

const SERVER_URL = 'http://localhost:3000'
module.exports = {
  init: () => {
    return fetch(`${SERVER_URL}/cellphone?phone=&password=`)
  },
  addTrackTopPlaylist: (pid, track_id) => {
    console.log(`api: ${SERVER_URL}/playlist/tracks?op=add&pid=${pid}&tracks=${track_id}`)
    return fetch(`${SERVER_URL}/playlist/tracks?op=add&pid=${pid}&tracks=${track_id}`)
  }
}