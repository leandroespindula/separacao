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
    const csvArray = parseCSV(csvText);
    console.log(csvArray); // Exibe o array de arrays no console// Adicione este código dentro da função onload do FileReader

    let currentArrayIndex = 0;

    const descricao = document.getElementById('descricao');
    const codigo = document.getElementById('codigo');
    const saldo = document.getElementById('saldo');
    const localizacao = document.getElementById('localizacao');
    const caixa = document.getElementById('caixa');
    const quantidade = document.getElementById('quantidade');

    document.getElementById('verificar').addEventListener('click', function() {
      descricao.textContent = csvArray[currentArrayIndex][2];
      codigo.textContent = csvArray[currentArrayIndex][0];
      saldo.textContent = `saldo picking: ${csvArray[currentArrayIndex][5]}`;
      localizacao.textContent = csvArray[currentArrayIndex][4];
      
      const caixaStr = csvArray[currentArrayIndex][1];
      console.log(caixaStr)
      const lastNum = parseInt(caixaStr.substring(caixaStr.length - 2));
      console.log(lastNum)
      caixa.textContent = `CAIXA: ${lastNum}`;
      
      quantidade.textContent = `QTD: ${csvArray[currentArrayIndex][3]}`;
      currentArrayIndex++;
    });
    
    
    
    document.getElementById('repor').addEventListener('click', function() {
      // lógica do botão Repor
      descricao.textContent = csvArray[currentArrayIndex][2];
      codigo.textContent = csvArray[currentArrayIndex][0];
      saldo.textContent = csvArray[currentArrayIndex][5];
      localizacao.textContent = csvArray[currentArrayIndex][4];
      caixa.textContent = `CAIXA: ${csvArray[currentArrayIndex][1]}`;
      quantidade.textContent = csvArray[currentArrayIndex][3];
      currentArrayIndex++;
    });
    
    document.getElementById('ok').addEventListener('click', function() {
      // lógica do botão OK
      descricao.textContent = csvArray[currentArrayIndex][2];
      codigo.textContent = csvArray[currentArrayIndex][0];
      saldo.textContent = csvArray[currentArrayIndex][5];
      localizacao.textContent = csvArray[currentArrayIndex][4];
      caixa.textContent = `CAIXA: ${csvArray[currentArrayIndex][1]}`;
      quantidade.textContent = csvArray[currentArrayIndex][3];
      currentArrayIndex++;
    });
    
    document.getElementById('faltou').addEventListener('click', function() {
      // lógica do botão Faltou
      descricao.textContent = csvArray[currentArrayIndex][2];
      codigo.textContent = csvArray[currentArrayIndex][0];
      saldo.textContent = csvArray[currentArrayIndex][5];
      localizacao.textContent = csvArray[currentArrayIndex][4];
      caixa.textContent = `CAIXA: ${csvArray[currentArrayIndex][1]}`;
      quantidade.textContent = csvArray[currentArrayIndex][3];
      currentArrayIndex++;
    });
    
  }
}
