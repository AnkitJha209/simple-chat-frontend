import { useEffect, useRef, useState } from 'react'

function App() {
  //@ts-ignore
  const wsRef = useRef();
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<String[]>(['Hi there','Hello'])
  

  const sendMessage = () => {
    console.log('text send:', text)
    //@ts-ignore
    wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload: {
        "message": text
      }
    }))
    setText('')
  }
 
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (e) => {
      setMessages(message => [...message, e.data])
    }
    wsRef.current = ws
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "12345"
        }
      }))
    }
  },[])

  return (
    <div className='h-screen px-10 py-6 sm:px-12 md:px-52 sm:py-20 bg-gray-900 text-white flex flex-col justify-around'>
      <div className='h-[90vh] border-2 border-gray-400 rounded-xl p-5 overflow-y-auto'>
        {messages.map((m, idx) => (
          <div key={idx} className='bg-blue-500 px-5 py-2 rounded-lg mb-2 w-fit'>{m}</div>
        ))}
        </div>
      <div className='flex gap-2 justify-center mt-5 items-center'>
        <input type="text" className='bg-gray-200 text-gray-700 px-5 py-2 rounded-lg' value={text} onChange={(e) => setText(e.target.value)}/>
        <button className='bg-blue-700 px-5 py-2 rounded-lg' onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default App
