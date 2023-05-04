let currentArrayIndex = 0;
let csvArray;
const verificarList = [];
const reporList = [];
const faltouList = [];

function parseCSV(text) {
  const rows = text.split('\n');
  const result = [];
  const startRow = rows[0].indexOf(',') > -1 ? 0 : 1;

  for (let i = startRow; i < rows.length; i++) {
    const cells = rows[i].split(';');''
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
    console.log(csvArray);

    const descricao = document.getElementById('descricao');
    const codigo = document.getElementById('codigo');
    const saldo = document.getElementById('saldo');
    const localizacao = document.getElementById('localizacao');
    const caixa = document.getElementById('caixa');
    const quantidade = document.getElementById('quantidade');

    updateHTML();

    

    document.getElementById('ok').addEventListener('click', function() {
      currentArrayIndex++;
      updateHTML();
    });

    document.getElementById('verificar').addEventListener('click', function() {
      const codigo = csvArray[currentArrayIndex][0];
      verificarList.push(codigo);
      console.log('Código adicionado à lista de verificar: ' + codigo);
      currentArrayIndex++;
      updateHTML();
    });
    
    document.getElementById('repor').addEventListener('click', function() {
      const codigo = csvArray[currentArrayIndex][0];
      reporList.push(codigo);
      console.log('Código adicionado à lista de repor: ' + codigo);
      currentArrayIndex++;
      updateHTML();
    });
    
    document.getElementById('faltou').addEventListener('click', function() {
      const codigo = csvArray[currentArrayIndex][0];
      faltouList.push(codigo);
      console.log('Código adicionado à lista de faltou: ' + codigo);
      currentArrayIndex++;
      updateHTML();
    });
  }
}

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

function updateHTML() {
  descricao.textContent = csvArray[currentArrayIndex][2];
  codigo.textContent = csvArray[currentArrayIndex][0];
  saldo.textContent = `saldo picking: ${csvArray[currentArrayIndex][5]}`;
  localizacao.textContent = csvArray[currentArrayIndex][4];
  
  const caixaStr = csvArray[currentArrayIndex][1];
  const lastNum = parseInt(caixaStr.substring(caixaStr.length - 2));
  caixa.textContent = `CAIXA: ${lastNum}`;
  
  quantidade.textContent = `QTD: ${csvArray[currentArrayIndex][3]}`;

  const arrayIndexElement = document.getElementById('array-index');
  const arrayLengthElement = document.getElementById('array-length');
  arrayIndexElement.textContent = currentArrayIndex + 1;
  arrayLengthElement.textContent = csvArray.length;
  
  if (currentArrayIndex === csvArray.length - 1) {
    const verificarListElement = document.getElementById('verificar-list');
    const reporListElement = document.getElementById('repor-list');
    const faltouListElement = document.getElementById('faltou-list');
    verificarListElement.innerHTML = '';
    reporListElement.innerHTML = '';
    faltouListElement.innerHTML = '';
    verificarList.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = item;
      verificarListElement.appendChild(li);
    });
    reporList.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = item;
      reporListElement.appendChild(li);
    });
    faltouList.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = item;
      faltouListElement.appendChild(li);
    });
  }
}


document.getElementById('verificar').addEventListener('click', function() {
  const codigo = csvArray[currentArrayIndex][0];
  verificarList.push(codigo);
  console.log('Código adicionado à lista de verificar: ' + codigo);
  const verificarListElement = document.getElementById('verificar-list');
  const li = document.createElement('li');
  li.textContent = codigo;
  verificarListElement.appendChild(li);
  currentArrayIndex++;
  updateHTML();
});

document.getElementById('repor').addEventListener('click', function() {
  const codigo = csvArray[currentArrayIndex][0];
  reporList.push(codigo);
  console.log('Código adicionado à lista de repor: ' + codigo);
  const reporListElement = document.getElementById('repor-list');
  const li = document.createElement('li');
  li.textContent = codigo;
  reporListElement.appendChild(li);
  currentArrayIndex++;
  updateHTML();
});

document.getElementById('faltou').addEventListener('click', function() {
  const codigo = csvArray[currentArrayIndex][0];
  faltouList.push(codigo);
  console.log('Código adicionado à lista de faltou: ' + codigo);
  const faltouListElement = document.getElementById('faltou-list');
  const li = document.createElement('li');
  li.textContent = codigo;
  faltouListElement.appendChild(li);
  currentArrayIndex++;
  updateHTML();
});

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'pt-BR';
recognition.start();

const recognition = new webkitSpeechRecognition();


recognition.onresult = function(event) {
  const speechResult = event.results[0][0].transcript.toLowerCase();
  if (speechResult.includes('verificar')) {
    document.getElementById('verificar').click();
  } else if (speechResult.includes('repor')) {
    document.getElementById('repor').click();
  } else if (speechResult.includes('ok')) {
    document.getElementById('ok').click();
  } else if (speechResult.includes('faltou')) {
    document.getElementById('faltou').click();
  }
};

recognition.onend = function(event) {
  recognition.start();
};

