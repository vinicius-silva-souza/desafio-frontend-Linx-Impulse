var numPagina = 1;
var btnMaisProdutos = document.getElementById('btn-mais-produtos');

function carregarProdutos(produtos){
    var xhr = new XMLHttpRequest();
    var url = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${numPagina}`;
    xhr.responseType = "json";
    xhr.open('GET', url, true);
    xhr.send();
    xhr.addEventListener('load', ()=>{
        produtos(xhr.response)
        numPagina++;
    });
}

btnMaisProdutos.addEventListener('click', ()=>{
    carregarProdutos((produtos)=>{
        console.log(produtos);
    })
})

