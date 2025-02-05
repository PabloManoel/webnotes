import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListNotes() {

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:8099/api/v1/notes');
                if (!response.ok) {
                    throw new Error('Erro ao buscar as anotacoes.');
                }

                const responseBody = await response.json();
                setNotes(responseBody.data)
            } catch(err){
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (isLoading) return <p>Carregando...</p>
    if (error) return <p style={{ color: 'red'}}>Erro: {error}</p>

    return (
        <div>
            <h1>Lista de Anotacoes</h1>
            <ul>
                {
                    notes.map((note) => (
                        <li key={note.id}>
                            <Link to={`/read/${note.id}`}>{note.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}

export default ListNotes;