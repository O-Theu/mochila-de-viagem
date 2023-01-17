const form = document.getElementById('novoItem');
const listaItems = document.querySelector('.lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.map((item) => criarElemento(item))

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = e.target.elements['nome'];
    const quantidade = e.target.elements['quantidade'];

    const existe = itens.find(item => item.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);

        itens[itens.findIndex(item => item.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1: 0;
        criarElemento(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criarElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const quantidadeItem = document.createElement('strong');
    quantidadeItem.dataset.id = item.id;
    quantidadeItem.innerHTML = item.quantidade;

    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

    listaItems.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}


function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(item => item.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}

// function criarItemLista(nome, quantidade) {
//     listaItems.innerHTML += `
//         <li class="item"><strong>${quantidade}</strong>${nome}</li>
//     `
// } 