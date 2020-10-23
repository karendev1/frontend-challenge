"use strict";

// Consumindo API
var url = "https://br.ongame.net/api/challenge/items/"; // Criando e Inserindo div's e itens no html usando http request 

var requisicao = new XMLHttpRequest();
requisicao.open("GET", url, true);

requisicao.onload = function () {
  if (requisicao.readyState === 4 && requisicao.status === 200) {
    var items = JSON.parse(requisicao.responseText);
    var itensRecompensas = document.getElementById('itensRecompensas');

    var _loop = function _loop(item) {
      var percentage = items[item].percentage;
      var criarItem = document.createElement('div');
      criarItem.classList.add('item');
      criarItem.id = items[item].id; //Colocando Imagens

      var imagem = document.createElement('div');
      imagem.classList.add('imagem');
      var novaImagem = document.createElement('img');
      novaImagem.src = items[item].image;
      novaImagem.style.width = "100%";
      novaImagem.alt = 'item picture'; // INSERT IMAGE IN IMAGE DIV

      imagem.appendChild(novaImagem); // Descrição das recompensas

      var descricao = document.createElement('div');
      descricao.classList.add('descricao'); // Descrição das recompensas

      var btn = document.createElement('div');
      btn.classList.add('btn');
      descricao.appendChild(btn);
      var nome = document.createElement('p');
      nome.classList.add('item-name');
      nome.innerHTML = items[item].name;
      btn.appendChild(nome); //Barra de porcentagem e botões

      if (items[item].percentage < 100 && !items[item].redeemed) {
        var btn2 = document.createElement('button');
        var barra = document.createElement('span'); // Botão de Resgate

        btn2.innerHTML = 'RESGATAR';
        btn.appendChild(btn2); // Barra de porcentagem

        barra.classList.add('progress-bar');
        barra.style.width = percentage + "%";
        descricao.appendChild(barra);
      } else if (items[item].percentage == 100 && !items[item].redeemed) {
        var newCanReedemButton = document.createElement('button');

        var _barra = document.createElement('span');

        newCanReedemButton.innerHTML = 'RESGATAR';
        newCanReedemButton.classList.add('btn-resgate');
        newCanReedemButton.onclick = 'openConfirmModal()';
        newCanReedemButton.addEventListener("click", function () {
          openConfirmModal(criarItem.id, novaImagem.src, nome.innerHTML);
        }, false);
        btn.appendChild(newCanReedemButton);

        _barra.classList.add('progress-bar');

        _barra.style.width = percentage + "%";

        _barra.classList.add('can-reddem-progress-bar');

        descricao.appendChild(_barra);
      } else {
        var resgatado = document.createElement('div');
        resgatado.classList.add('resgate');
        var newReedemedButton = document.createElement('p');
        var newDoneIcon = document.createElement('img');
        newDoneIcon.style.width = '24px';
        newReedemedButton.innerHTML = "ITEM RESGATADO";
        btn.appendChild(resgatado);
        resgatado.appendChild(newReedemedButton);
      } // PROGRESS BAR 


      if (!items[item].redeemed) {}

      if (items[item].percentage == 100 && !items[item].redeemed) {}

      itensRecompensas.appendChild(criarItem);
      criarItem.appendChild(imagem);
      criarItem.appendChild(descricao);
    };

    for (var item in items) {
      _loop(item);
    } // console.log(items);

  } else {
    console.log('erroy');
  }
};

requisicao.send(); // Definições do Modal

function openConfirmModal(id, image, name) {
  var caixaPreta = document.getElementById('caixaPreta');
  caixaPreta.style.display = 'block';
  var modalDiv = document.getElementById('modal');
  modalDiv.style.display = 'flex';
  var modalImageItem = document.createElement('img');
  modalImageItem.src = image;
  modalImageItem.id = 'modalImageItem';
  modalDiv.appendChild(modalImageItem);
  var modalNameItem = document.createElement('p');
  modalNameItem.innerHTML = name;
  modalNameItem.id = 'modalNameItem';
  modalDiv.appendChild(modalNameItem);
  var modalButtonsDiv = document.createElement('div');
  modalButtonsDiv.classList.add('modal-buttons-div');
  modalButtonsDiv.id = 'modalButtonsDiv';
  modalDiv.appendChild(modalButtonsDiv);
  var modalConfirmButton = document.createElement('button');
  modalConfirmButton.id = 'confirmButton';
  modalConfirmButton.classList.add('confirm-button');
  modalConfirmButton.id = 'modalConfirmButton';
  modalConfirmButton.innerHTML = 'SIM';
  modalButtonsDiv.appendChild(modalConfirmButton);
  var modalDenyButton = document.createElement('button');
  modalDenyButton.id = 'denyButton';
  modalDenyButton.addEventListener("click", function () {
    denyReedem();
  }, false);
  modalDenyButton.classList.add('deny-button');
  modalDenyButton.id = 'modalDenyButton';
  modalDenyButton.innerHTML = 'NÃO';
  modalButtonsDiv.appendChild(modalDenyButton);
}

function denyReedem() {
  var modalDiv = document.getElementById('modal');
  var caixaPreta = document.getElementById('caixaPreta');
  var modalImageItem = document.getElementById('modalImageItem');
  var modalButtonsDiv = document.getElementById('modalButtonsDiv');
  var modalNameItem = document.getElementById('modalNameItem');
  caixaPreta.style.display = 'none';
  modalDiv.style.display = 'none';
  modalButtonsDiv.remove();
  modalImageItem.remove();
  modalNameItem.remove();
}