import React, { useState } from 'react';
import '../popup/index.css'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app-container">
      {}
      <i onClick={openModal} className="fas fa-question-circle open-modal-icon"></i>

      {}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Este é um Pop-up</h2>
            <p>Aqui está o conteúdo do pop-up. Você pode adicionar o que quiser!</p>
            <button onClick={closeModal} className="close-modal-button">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
