import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [webSocket, setWebSocket] = useState<WebSocket>()
  const [text, setText] = useState('')

  const sendMessage = () => {
    console.log('text send:', text)
    webSocket?.send(text)
    setText('')
  }
 
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (e) => {
      console.log(e.data)
    }
    setWebSocket(ws)
  },[])

  return (
    <>
      <h2>
        A Simple Chat App
      </h2>
      <input type='text' placeholder='type message here' onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default App
