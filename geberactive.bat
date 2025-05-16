import { useState } from 'react';
import '../barcode/index.css';
import Notification from '../notification/index.js'; 
import { Logo } from '../logo/index.js';
import { Gauge } from '@mui/x-charts/Gauge';

function Barcode({ excelData, legicDB, setLegicDB }) {
  const [inputBarcode, setInputBarcode] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const [barcodeCount, setBarcodeCount] = useState(() => parseInt(localStorage.getItem('barcodeCount')) || 0);
  const totalExpectedBarcodes = 100;
  const progress = (barcodeCount / totalExpectedBarcodes) * 100;

  function showNotification(message, type = 'success') {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  }

  function handleBarcodeInput(barcode) {
    if (!excelData) {
      showNotification('Importe um ficheiro primeiro!', 'error');
      setInputBarcode('');
      return;
    }

    let userData = excelData[barcode];
    if (!userData) {
      showNotification('Este código de barras não existe!', 'error');
      setInputBarcode('');
      return;
    }

    let doubleVerify = legicDB.some(data => String(data[2]) === String(barcode));
    if (doubleVerify) {
      showNotification('Este código de barras já foi registado!', 'warning');
      setInputBarcode('');
      return;
    }

    const legicDBCopy = [...legicDB, userData];
    setLegicDB(legicDBCopy);
    localStorage.setItem('gactiveLegicReadData', JSON.stringify(legicDBCopy));

    let newBarcodeCount = barcodeCount + 1;
    setBarcodeCount(newBarcodeCount);
    localStorage.setItem('barcodeCount', newBarcodeCount);

    let getJsonArray = localStorage.getItem('gactiveImportedData');
    let jsonConvert = JSON.parse(getJsonArray) || {};

    let formatJson = Object.values(jsonConvert).reduce((acc, current) => {
      return { ...acc, [current[2]]: current };
    }, {});

    let getUserToStatus = formatJson[barcode];
    if (getUserToStatus) {
      getUserToStatus.push('check_circle'); 
    }

    localStorage.setItem('gactiveImportedData', JSON.stringify(jsonConvert));

    showNotification('Código de barras registado com sucesso!', 'success');
    setInputBarcode('');
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setInputBarcode(value);

    if (value.length === 8) {
      handleBarcodeInput(value);
    }
  }

  return (
    <div className="main-container">
      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ message: '', type: '', show: false })}
        />
      )}
  
      <p className="barcount">
        Total de Códigos de Barras registados: <strong>{barcodeCount}</strong>
      </p>
  
      <div className="logo">
        <Logo />
      </div>
  
      <div className="barcode-container">
        <p>Introduza o seu Código de Barras</p>
        <p>Total de Códigos de Barras registados: <strong>{barcodeCount}</strong>
      </p>
      <div className="progress-container">
        <Gauge 
          value={progress} 
          min={0}
          max={100}
          startAngle={-90} // Gauge semicircular
          endAngle={90} 
          size={200} 
          valueText={`${barcodeCount} / ${totalExpectedBarcodes}`} // Mostra "X / 100"
          sx={{
            '& .MuiGauge-valueArc': {
              stroke: "#1976D2", // Azul
            },
            '& .MuiGauge-referenceArc': {
              stroke: "#E0E0E0", // Cinza
            },
            '& .MuiGauge-valueText': {
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
        />
        <p>{Math.round(progress)}% concluído</p>
      </div>
    </div>
        <input 
          className="barcode-input" 
          type="number" 
          placeholder="Código de Barras" 
          onChange={handleInputChange}
          value={inputBarcode}
        />
      </div>
  );
  
  
}

export default Barcode;
