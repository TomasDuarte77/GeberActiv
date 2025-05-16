import { useState, useEffect } from 'react';
import '../sorteio/sorteio.css'
import { isPointScaleConfig } from '@mui/x-charts/internals';

export default function Sorteio() {
    const [participantes, setParticipantes] = useState([]);
    const [sorteado, setSorteado] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('gactiveImportedData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const validos = parsedData.filter(data => data[data.length - 1] === 'check_circle');
            setParticipantes(validos);
        }
    }, []);

    function realizarSorteio() { 
        if (participantes.length === 0) {
            setSorteado('Nenhum participante válido.');
            return;
        }
        const indexAleatorio = Math.floor(Math.random() * participantes.length);
        setSorteado(participantes[indexAleatorio]);
    }

    return (
        <section className="sorteio-container">
            <h2>Sorteio de Participantes</h2>
            <p>Total de participantes válidos: <strong>{participantes.length}</strong></p>
            <button onClick={realizarSorteio}>Sortear</button>

            {sorteado && (
                <div className="resultado-sorteio">
                    <h3>Resultado:</h3>
                    {typeof sorteado === 'string' ? (
                        <p>{sorteado}</p>
                    ) : (
                        <ul>
                            <li><strong>Número:</strong> {sorteado[0]}</li>
                            <li><strong>Nome:</strong> {sorteado[1]}</li>
                            <li><strong>Código de Barras:</strong> {sorteado[2]}</li>
                            <li><strong>Departamento:</strong> {sorteado[3]}</li>
                        </ul>
                    )}
                </div>
            )}
        </section>
    );
}
