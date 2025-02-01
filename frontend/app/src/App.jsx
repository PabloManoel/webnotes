import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const saveNote = () => {
    console.log(' Anotacao salva:', {title, content})
    alert(`Anotação salva!\nTítulo: ${title}`)
  }

  return (
    <>
      <h1>Web Notes</h1>
      <div>
        <label>title: </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label>content: </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br/>
        <br/>
      </div>
      <button onClick={saveNote}>salvar anotacao</button>
    </>
  )
}

export default App
