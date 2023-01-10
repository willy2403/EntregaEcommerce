const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

//==========//
const cartinfo = document.querySelector('.cart-product')
const rowproduct = document.querySelector('.row-product')

// lista de todos los contenedores 
const productlist = document.querySelector('.remeras_menu')

//Variable de arreglo de productos 
let allproducts = []

const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productlist.addEventListener('click',e => {
    
    if(e.target.classList.contains('btn_add')){
        const product = e.target.parentElement

        const infoProduct ={
            quantity: 1,
            title: product.querySelector('h4').textContent,
            price: product.querySelector('p').textContent,
        }

        const exits = allproducts.some(product => product.title === infoProduct.title)

        if(exits){
            const products = allproducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                } else{
                    return product
                }
            })
            allproducts = [...products]

        } else{
            allproducts = [...allproducts, infoProduct]
        }


        showHTML();
    }
    
});

rowproduct.addEventListener('click', e => {
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allproducts = allproducts.filter(product => product.title !== title);

        showHTML()
    }
})

//funcion para mostrar HTML
const showHTML = () => {
	if (!allproducts.length) {
		cartEmpty.classList.remove('hidden');
		rowproduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowproduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

//limpiar html
    rowproduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0; 

    allproducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = ` 
            <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
    
    `;  
        rowproduct.append(containerProduct); 
        
        total = total + parseInt(product.quantity * product.price.slice(1))
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};