import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


function ReadNote() {
    const { id } = useParams(); // Pega o ID da URL
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchNote = async () => {
            
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8099/api/v1/notes/${id}`)
                if (!response.ok) {
                    throw new Error('Erro ao buscar a anotacao.');
                }
                const reponseData = await response.json();
                console.log(reponseData.data.content)
                setNote(reponseData.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchNote();

    }, []);

    console.log(`isLoading = ${isLoading}`)
    console.log(`error = ${error}`)
    console.log(`note = ${note}`)

    if (isLoading) return <p>Carregando...</p>
    if (error) return <p style={{ color: 'red'}}>Erro: {error}</p>
    if (!note) return <p>Nenhuma anotacao encontrada.</p>

    return (
        <div>
            <h1>{note.title}</h1>
            <br />
            <p>{note.content}</p>
        </div>
    )
}

export default ReadNote;