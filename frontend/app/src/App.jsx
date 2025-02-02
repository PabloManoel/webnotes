import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const saveNote = async () => {
    if (!title || !content) {
      alert('Por favor, preencha todos os campos antes de salvar.')
      return;
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8099/api/v1/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({title, content}),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar a anotacao. Tente novamente')
      }

      console.log(`Anotacao salva com sucesso`)
      alert('Anotacao salva com sucesso!')

      setTitle('')
      setContent('')
      
    } catch (err) {
      console.log(err)
      setError(err.message)
      alert(`Erro: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1>Web Notes</h1>
      <div>
        <label>title: </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <br />
        <br />
        <label>content: </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
        />
        <br/>
        <br/>
      </div>
      <button onClick={saveNote} disabled={isLoading}>
        {isLoading? 'Salvando...' : 'Salvar Anotação'}
      </button>
      { error && <p style={{ color: 'red'}}>Erro: {error}</p> }
    </>
  )
}

export default App
