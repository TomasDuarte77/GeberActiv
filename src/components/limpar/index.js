import { useState } from 'react';
import '../limpar/index.css';

export default function Limpar() {
    const [isCleaning, setIsCleaning] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const limparDados = () => {
        setIsCleaning(true);
        localStorage.removeItem('gactiveImportedData');
        localStorage.removeItem('legicCount');
        localStorage.removeItem('barcodeCount');
        localStorage.removeItem('gactiveLegicReadData');
        
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const handleConfirm = () => {
        setShowConfirmation(true); 
    };

    const handleCancel = () => {
        setShowConfirmation(false); 
    };

  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className="limpar-container">
            <p className="clean-text">Se quiser limpar os dados, limpe aqui:</p>
            
            {showConfirmation ? (
                <div className="confirmation-message">
                    <p>Deseja realmente limpar todos os dados?</p>
                    <button className="confirm-button" onClick={limparDados}>Sim, Limpar</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
                </div>
            ) : (
                <button className="clean-button" onClick={handleConfirm}>
                    Limpar Tudo
                </button>
            )}

            {}
            <i onClick={openModal} className="fa fa-question-circle open-modal-icon" />

            {}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Ajuda Limpar Dados</h2>
                        <p>- Aqui você pode limpar todos os dados armazenados no sistema.</p>
                        <p>- Atenção: Ao clicar em "Sim, Limpar", todos os dados serão apagados permanentemente!</p>
                        <button onClick={closeModal} className="close-modal-button">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
