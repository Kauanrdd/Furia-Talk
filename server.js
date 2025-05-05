const{WebSocketServer} = require ('ws')
const dotencv = require ('dotenv')

dotencv.config() 

const wss = new WebSocketServer({port: process.env.PORT || 8080})
wss.on("connection", (ws)=>{
    ws.on("error", console.error)



    ws.on("message", (data)=>{ //recebe os dados
        wss.clients.forEach((client) => client.send(data.toString())) //envia os dados para todos. // data foi tranformado em string.

    })
    console.log("conectado")
})

