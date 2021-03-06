function productsRequest(data){
    var xhr = new XMLHttpRequest();
    var url = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';
    xhr.responseType = "json";
    xhr.open('GET', url, true);
    xhr.send();
    xhr.addEventListener('load', ()=>{
        data(xhr.response)
    });
}

function createCards(description, image, count, value, name, oldPrice, price){
    var element = document.getElementById("produtos-container");
    var createdElement = document.createElement('div');
    element = element.appendChild(createdElement);
    element.setAttribute('class', 'produto');
    createdElement = document.createElement('img');
    element =  element.appendChild(createdElement);
    element.setAttribute('class', 'img-produto');
    element.setAttribute('src', image);
    createdElement = document.createElement('div');
    element = element.insertAdjacentElement('afterend', createdElement);
    element.setAttribute('class', 'info-produto');
    createdElement = document.createElement('p');
    element = element.appendChild(createdElement);
    element.setAttribute('class', 'nome-produto');
    element.innerText = name;
    createdElement = document.createElement('p');
    element = element.insertAdjacentElement('afterend', createdElement);
    element.setAttribute('class', 'descricao-produto');
    element.innerText = description;
    createdElement = document.createElement('small');
    element = element.insertAdjacentElement('afterend', createdElement);
    element.setAttribute('class', 'preco-produto');
    element.innerText = `De: R$${oldPrice}`;
    createdElement = document.createElement('strong');
    element = element.insertAdjacentElement('afterend', createdElement);
    element.setAttribute('class', 'oferta-produto');
    element.innerText = `Por: R$${price}`;
    createdElement = document.createElement('small');
    element = element.insertAdjacentElement('afterend', createdElement);
    element.setAttribute('class', 'parcela-produto');
    element.innerText = `ou ${count}x de R$${value}`
    createdElement = document.createElement('button');
    element = element.insertAdjacentElement('afterend', createdElement);
    element.setAttribute('class', 'btn-comprar-produto btn');
    element.setAttribute('type', 'button');
    element.innerText = 'Comprar'
}

function loadProductsAnimation(run = true){
    const modal = document.querySelector('.modal-container');
    if(run){
        let createdElement = document.createElement('div');
        let element = document.body.appendChild(createdElement);
        element.setAttribute('class', 'modal-container');
        createdElement = document.createElement('div');
        element = element.appendChild(createdElement);
        element.setAttribute('class', 'modal-content');
        createdElement = document.createElement('h1');
        createdElement = element.insertAdjacentElement('beforeend', createdElement);
        createdElement.setAttribute('class', 'modal-title');
        createdElement.innerText = 'Carregando';
        createdElement = document.createElement('span');
        createdElement = element.insertAdjacentElement('beforeend', createdElement);
        createdElement.setAttribute('class', 'modal-loader');
        createdElement = document.createElement('p');
        createdElement = element.insertAdjacentElement('beforeend', createdElement);
        createdElement.setAttribute('class', 'modal-msg');
        createdElement.innerText = 'Aguarde, requisição em andamento';
    } else {
        if(modal !== null){
            document.body.removeChild(modal);
        }
    }
}

function request(){
    loadProductsAnimation();
    productsRequest((produtos)=>{
        var json = produtos;
        var produtos = json.products;
        produtos.forEach((element)=> {
           createCards(
               element.description,
               element.image,
               element.installments.count,
               element.installments.value,
               element.name,
               element.oldPrice,
               element.price
           )
        });
        loadProductsAnimation(false);
    })
}

const btnMaisProdutos = document.getElementById('btn-mais-produtos');
window.addEventListener('load', request);
btnMaisProdutos.addEventListener('click', request);