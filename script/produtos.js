function carregarProdutos(produtos){
    var xhr = new XMLHttpRequest();
    var url = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page='
    xhr.open('GET', url, true);
    xhr.send();
    xhr.addEventListener('load', ()=>{
        produtos(xhr.response)
    });
}