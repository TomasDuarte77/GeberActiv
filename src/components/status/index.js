import { useState, useEffect } from 'react';

export default function Status() {
    const [statusData, setStatusData] = useState([]);
    const [legicCount, setLegicCount] = useState(0); 
    const [barcodeCount, setBarcodeCount] = useState(0);  
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        loadStatusData();
        loadLegicCount();   
        loadBarcodeCount(); 
    }, []);

    function loadStatusData() {
        let legicStatus = localStorage.getItem('gactiveImportedData');
        if (legicStatus) {
            let parsedData = JSON.parse(legicStatus);
            setStatusData(parsedData);
        }
    }

    function loadLegicCount() {
        let count = localStorage.getItem('legicCount') || 0;
        setLegicCount(parseInt(count));
    }

    function loadBarcodeCount() {
        let count = localStorage.getItem('barcodeCount') || 0;
        setBarcodeCount(parseInt(count));
    }

    function resetStatusData() {
        localStorage.removeItem('gactiveImportedData');
        localStorage.removeItem('legicCount'); 
        localStorage.removeItem('barcodeCount'); 
        setStatusData([]);
        setLegicCount(0);
        setBarcodeCount(0);
        window.location.reload();
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className='files-management-container'>
            <h2>Status das Leituras</h2>

            <p>Total de Legics registados: <strong>{legicCount}</strong></p>
            <p>Total de Códigos de Barras registados: <strong>{barcodeCount}</strong></p>

            <button className='clean-button' onClick={resetStatusData}>Limpar Lista</button>

            {statusData.length > 0 ? (
                <section className='import-data-table-section'>
                    <table className='import-data-table'>
                        <thead>
                            <tr>
                                <th>Número Colaborador</th>
                                <th>Nome</th>
                                <th>Código de Barras</th>
                                <th>Departamento</th>
                                <th>Forma de Convite</th> {}
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statusData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    <td>{data[2]}</td>
                                    <td>{data[3]}</td>
                                    <td>{["check_circle", "error", "warning"].includes(data[4]) ? "" : data[4]}</td>
                                    {}
                                    <td className='td-span'>
                                    {["check_circle", "error", "warning"].includes(data[data.length - 1]) ? (
                                        <span
                                            className="material-symbols-sharp"
                                            style={{ color: data[data.length - 1] === 'check_circle' ? 'green' : 'red' }}
                                        >
                                            {data[data.length - 1]}
                                        </span>
                                        ) : (
                                        <span className="material-symbols-sharp" style={{ color: 'gray' }}>help</span>
                                        )}

                                    {}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ) : (
                <p>Nenhum status disponível.</p>
            )}

            {}
            <i onClick={openModal} className="fa fa-question-circle open-modal-icon" />

            {}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Ajuda - Status</h2>
                        <p>- Nesta página, você pode ver o status das leituras de Legics e Códigos de Barras.</p>
                        <p>- A tabela exibe os dados importados, incluindo o número, nome, Legic ou código de barras, centro de custo, departamento e status.</p>
                        <p>- Você pode limpar todos os dados clicando em "Limpar Lista".</p>
                        <button onClick={closeModal} className="close-modal-button">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
