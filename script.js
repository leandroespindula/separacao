function importarCSV(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      const text = reader.result;
      const data = csvToObject(text);
      // Do something with the data
    };
    reader.readAsText(input.files[0]);
  }
  
let indice = 0;
let listaObjetos = [];

function atualizarCard() {
  const objetoAtual = listaObjetos[indice];
  document.getElementById("descricao").innerText = objetoAtual.descricao;
  document.getElementById("codigo").innerText = objetoAtual.codigo;
  document.getElementById("saldo").innerText = `saldo picking: ${objetoAtual.saldo}`;
  document.getElementById("localizacao").innerHTML = `${objetoAtual.localizacao} -- <span>QTD: ${objetoAtual.quantidade}</span>`;
}

function avancar() {
  if (indice < listaObjetos.length - 1) {
    indice++;
    atualizarCard();
  }
}

// código para importar o arquivo CSV e preencher a lista de objetos...

// atribui a função "avancar" ao botão "Próximo"
document.getElementById("proximo").addEventListener("click", avancar);
