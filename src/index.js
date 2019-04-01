const { Wechaty } = require('wechaty')
const R = require('ramda')
const neteaseHandler = require('./netease')

const bot = new Wechaty()
neteaseHandler.init().then(() => {
  bot // Global Instance
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
  .on('login',            user => console.log(`User ${user} logined`))
  .on('message', messageHandler)
.start()
})

let ROOM_TOPIC = '花式抖腿交流.'; 
const NEM_REG = /http\:\/\/music\.163\.com\/song\/([0-9]*)?\//
const PLAYLIST_ID = '2736466091'

async function messageHandler(message) {
  const room = message.room()
  const topic = await room.topic()
  if(topic !== ROOM_TOPIC){
    return
  }
  const originText = R.pathOr('', ['payload', 'text'])(message)

  console.log(`netease:${originText.match(NEM_REG)}`)
  console.log(`room: ${room}`)
  if(originText.match(NEM_REG)){
    neteaseHandler.addTrackTopPlaylist(PLAYLIST_ID, originText.match(NEM_REG)[1]).then(()=> {
      console.log('成功添加歌曲到歌单')
    })
  }
}
