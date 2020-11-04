// Consumindo API
const url = "https://br.ongame.net/api/challenge/items/";


//Função para inserir os itens da API no HTML

function inserirItens() {
    const recompensa = document.getElementById('recompensa');
    recompensa.innerHTML = '';

    for (const item of items) {
        const barra = item.percentage;
        const item2 = document.createElement('div');
        item2.classList.add('item');
        item2.id = item.id;

        // Div Imagens
        const itemImagem = document.createElement('div');
        itemImagem.classList.add('imagem');

        const itemImagem2 = document.createElement('img');
        itemImagem2.src = item.image;
        itemImagem2.style.width = "100%";
        itemImagem2.alt = 'item picture';
        itemImagem.appendChild(itemImagem2);

        // Descricao
        const itemDescricao = document.createElement('div');
        itemDescricao.classList.add('descricao');

        // SUPERIOR DIV OF DESCRIPTION
        const itemBtn = document.createElement('div');
        itemBtn.classList.add('btn');
        itemDescricao.appendChild(itemBtn)

        const itemNome = document.createElement('p');
        itemNome.classList.add('item-nome');
        itemNome.innerHTML = item.name;
        itemBtn.appendChild(itemNome);

        if (item.redeemed) {
            const itemResgate = document.createElement('div');
            itemResgate.classList.add('resgate');
            const rBtn = document.createElement('p');
            const rBtn2 = document.createElement('img');
            rBtn2.style.width = '30px';

            rBtn.innerHTML = "ITEM RESGATADO";

            itemBtn.appendChild(itemResgate);
            itemResgate.appendChild(rBtn2);
            itemResgate.appendChild(rBtn);
        } else if (item.percentage < 100) {
            const rBtn2 = document.createElement('button');
            const bar = document.createElement('span');

            rBtn2 .innerHTML = 'RESGATAR';
            rBtn2 .id = 'resgatarButton';
            itemBtn.appendChild(rBtn2 );

            bar.classList.add('barra');
            bar.style.width = barra + "%";
            itemDescricao.appendChild(bar);

        } else {
            const rBtn3 = document.createElement('button');
            const bar = document.createElement('span');


            rBtn3.innerHTML = 'RESGATAR';
            rBtn3.classList.add('btn-resgate');
            rBtn3.onclick = 'abrirModal()';
            rBtn3.addEventListener("click", () => {
                abrirModal(item2.id, itemImagem2.src, itemNome.innerHTML)
            }, false);
            itemBtn.appendChild(rBtn3);

            bar.classList.add('barra');
            bar.style.width = barra + "%";
            bar.classList.add('barra2');
            itemDescricao.appendChild(bar);

        }

        recompensa.appendChild(item2);
        item2.appendChild(itemImagem);
        item2.appendChild(itemDescricao);

    }
}


// Modal

function visivel() {
    const modal = document.getElementById('modal');
    const caixa = document.getElementById('caixa');

    caixa.style.display = 'none';
    modal.innerHTML = '';
    modal.style.display = 'none';

}

function abrirModal(id, image, name) {
    const caixa = document.getElementById('caixa');
    caixa.style.display = 'block';

    const modal = document.getElementById('modal');
    modal.style.display = 'flex';

    const tituloModal = document.createElement('h1');
    tituloModal.innerHTML = 'DESEJA RESGATAR?'
    modal.appendChild(tituloModal);

    const imagemModal = document.createElement('img');
    imagemModal.src = image;
    imagemModal.id = 'imagemModal';
    modal.appendChild(imagemModal);

    const nomeModal = document.createElement('p');
    nomeModal.innerHTML = name;
    nomeModal.id = 'nomeModal';
    modal.appendChild(nomeModal);

    const btnModal = document.createElement('div');
    btnModal.classList.add('btn-modal');
    btnModal.id = 'btnModal';
    modal.appendChild(btnModal);

    const simBtn = document.createElement('button');
    simBtn.addEventListener("click", () => {
        confirmRedeem(parseInt(id));
    }, false);
    simBtn.classList.add('btn-sim');
    simBtn.id = 'simBtn';
    simBtn.innerHTML = 'SIM';
    btnModal.appendChild(simBtn);

    const modalBtn = document.createElement('button');
    modalBtn.addEventListener("click", () => {
        visivel();
    }, false);
    modalBtn.classList.add('btn');
    modalBtn.id = 'modalBtn';
    modalBtn.innerHTML = 'NÃO';
    btnModal.appendChild(modalBtn);

}


// Manipulador de Eventos

var requisicao = new XMLHttpRequest();

requisicao.open("GET", url, true);
requisicao.onload = (paramentro) => {
    if (requisicao.readyState === 4 && requisicao.status === 200) {
        items = JSON.parse(requisicao.responseText);
        this.inserirItens();
    }
}

requisicao.send();