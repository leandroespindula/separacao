let currentArrayIndex = 0; // declare currentArrayIndex as a global variable
let csvArray;


function parseCSV(text) {
  const rows = text.split('\n');
  const result = [];
  const startRow = rows[0].indexOf(',') > -1 ? 0 : 1; // check if the CSV file uses commas as delimiters

  for (let i = startRow; i < rows.length; i++) {
    const cells = rows[i].split(';');
    result.push(cells);
  }
  return result;
}

function importarCSV(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    const csvText = reader.result;
    csvArray = parseCSV(csvText);
    console.log(csvArray); // Exibe o array de arrays no console// Adicione este código dentro da função onload do FileReader

    const descricao = document.getElementById('descricao');
    const codigo = document.getElementById('codigo');
    const saldo = document.getElementById('saldo');
    const localizacao = document.getElementById('localizacao');
    const caixa = document.getElementById('caixa');
    const quantidade = document.getElementById('quantidade');

    // Update HTML with values from current CSV row
    updateHTML();

    document.getElementById('verificar').addEventListener('click', function() {
      currentArrayIndex++;
      updateHTML();
    });
    
    document.getElementById('repor').addEventListener('click', function() {
      currentArrayIndex++;
      updateHTML();
    });
    
    document.getElementById('ok').addEventListener('click', function() {
      currentArrayIndex++;
      updateHTML();
    });
    
    document.getElementById('faltou').addEventListener('click', function() {
      currentArrayIndex++;
      updateHTML();
    });
  }
}

// Add these two event listeners to your code
document.getElementById('next-btn').addEventListener('click', function() {
  if (currentArrayIndex < csvArray.length - 1) {
    currentArrayIndex++;
    updateHTML();
  }
});

document.getElementById('prev-btn').addEventListener('click', function() {
  if (currentArrayIndex > 0) {
    currentArrayIndex--;
    updateHTML();
  }
});

// This function updates the HTML elements with the values from the current CSV row
function updateHTML() {
  descricao.textContent = csvArray[currentArrayIndex][2];
  codigo.textContent = csvArray[currentArrayIndex][0];
  saldo.textContent = `saldo picking: ${csvArray[currentArrayIndex][5]}`;
  localizacao.textContent = csvArray[currentArrayIndex][4];
  
  const caixaStr = csvArray[currentArrayIndex][1];
  const lastNum = parseInt(caixaStr.substring(caixaStr.length - 2));
  caixa.textContent = `CAIXA: ${lastNum}`;
  
  quantidade.textContent = `QTD: ${csvArray[currentArrayIndex][3]}`;
}
