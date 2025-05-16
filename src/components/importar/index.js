import * as XLSX from 'xlsx';
import { useState } from 'react';
import '../importar/ajuda.png'
function Importar({ setExcelData, setDataToFilter, setExcelTableData, showMessage, setTotalEntries }) {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      readExcel(file);
    }
  };
  const readExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      jsonData.shift();

      let defineLegicKey = jsonData.reduce((acc, current) => {
        return { ...acc, [current[2]]: current };
      }, {});

      let formatToFilter = jsonData.reduce((acc, current) => {
        return { ...acc, [current[0]]: current };
      }, {});
      setTotalEntries(jsonData.length);

      localStorage.setItem('gactiveImportedData', JSON.stringify(jsonData));
      setExcelData(defineLegicKey);
      setDataToFilter(formatToFilter);
      setExcelTableData(true);
      showMessage("Ficheiro importado com sucesso!");
    };
    reader.readAsBinaryString(file);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className='files-management-container'>
      <p>Importar Ficheiros</p>
      <input type='file' onChange={handleFileUpload} />

      {}
      <i onClick={openModal} className="fa fa-question-circle open-modal-icon" />

      {}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ajuda Importação de Ficheiro</h2>
            <p>- Aqui podes importar um ficheiro Excel contendo os códigos de barras ou Legic!</p>
            <p>- Lembra-te de que o ficheiro deve conter o Codigo de barras ou legic na 3 coluna para ser lido com sucesso!</p>
            <img src="ajuda.png" alt="Imagem de Ajuda"className="help-image"
            />
            <button onClick={closeModal} className="close-modal-button">
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Importar;
