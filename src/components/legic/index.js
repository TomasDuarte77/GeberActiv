import { useState } from 'react';
import '../legic/index.css';
import Notification from '../notification/index.js';
import { Logo } from '../logo/index.js';

function Legic({ excelData, legicDB, setLegicDB }) {
  const [inputLegic, setInputLegic] = useState('');
  const [legicCount, setLegicCount] = useState(() => {
    return parseInt(localStorage.getItem('legicCount')) || 0;
  });
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showNotification(message, type = 'success') {
    setNotification({ message, type, show: true });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  }

  function handleLegicInput(legic) {
    if (!excelData) {
      showNotification('Importe um ficheiro primeiro!', 'error');
      setInputLegic('');
      return;
    }

    let legicArray = legic.split('');
    legicArray.shift(); 
    const legicCode = legicArray.join('');
    let userData = excelData[legicCode];

    if (!userData) {
      showNotification('Este Legic não existe!', 'error');
      setInputLegic('');
      return;
    }

    let doubleVerify = legicDB.some(data => data[2] === legicCode);
    if (doubleVerify) {
      showNotification('Este Legic já foi registado!', 'warning');
      setInputLegic('');
      return;
    }

    const legicDBCopy = [...legicDB, userData];
    setLegicDB(legicDBCopy);
    localStorage.setItem('gactiveLegicReadData', JSON.stringify(legicDBCopy));

    let newLegicCount = legicCount + 1;
    setLegicCount(newLegicCount);
    localStorage.setItem('legicCount', newLegicCount);

    let getJsonArray = localStorage.getItem('gactiveImportedData');
    let jsonConvert = JSON.parse(getJsonArray) || {};
    let formatJson = Object.values(jsonConvert).reduce((acc, current) => {
      return { ...acc, [current[2]]: current };
    }, {});

    let getUserToStatus = formatJson[legicCode];
    if (getUserToStatus) {
      getUserToStatus.push('check_circle');
    }

    localStorage.setItem('gactiveImportedData', JSON.stringify(jsonConvert));
    setInputLegic('');

 
    const personName = userData[1];


    showNotification(`Legic de ${personName} inserido com sucesso!`, 'success');
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setInputLegic(value);

    if (value.length === 6) {
      handleLegicInput(value);
    }
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='main-container'>
      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ message: '', type: '', show: false })}
        />
      )}

      <div className="logo">
        <Logo />
      </div>

      <div className="legic-container">
        <p>Introduza o seu Número de Legic</p>
        <p>Total de Legics registados: <strong>{legicCount}</strong></p>
        <input 
          className='legic-input' 
          type='number' 
          placeholder='Legic' 
          onChange={handleInputChange} 
          value={inputLegic}
        />
      </div>

      <i onClick={openModal} className="fa fa-question-circle open-modal-icon" />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ajuda Legic</h2>
            <p>-Aqui podes inserir manualmente o seu número de Legic com 6 dígitos!</p>
            <p>Lembra-te, o Legic só é válido quando tiveres importado um ficheiro Excel com esse código de Legic!</p>
            <button onClick={closeModal} className="close-modal-button">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Legic;
