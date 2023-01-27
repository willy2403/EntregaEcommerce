
//Array de productos 
const productos = [
    {
        id: "remeras-01",
        titulo: "Remera 01",
        imagen: "./imagenes/remeras/01.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 3500
    },
    {
        id: "remeras-02",
        titulo: "Remera 02",
        imagen: "./imagenes/remeras/02.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 3400
    },  
    {
        id: "remeras-03",
        titulo: "Remera 03",
        imagen: "./imagenes/remeras/03.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 3500
    },  
    {
        id: "remeras-04",
        titulo: "Remera 04",
        imagen: "./imagenes/remeras/04.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 3500
    },    
    {
        id: "remeras-05",
        titulo: "Remera 05",
        imagen: "./imagenes/remeras/05.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 3200
    },   
    {
        id: "remeras-06",
        titulo: "Remera 06",
        imagen: "./imagenes/remeras/06.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 3500
    },
    {
        id: "remeras-07",
        titulo: "Remera 07",
        imagen: "./imagenes/remeras/07.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 3000
    },   
    {
        id: "remeras-08",
        titulo: "Remera 08",
        imagen: "./imagenes/remeras/08.jpg",
        categoria:{
            nombre: "remeras",
            id: "remeras"
        },
        precio: 4500
    },
    {
        id: "pantalon-01",
        titulo: "Pantalon 01",
        imagen: "./imagenes/pantalones/01.jpg",
        categoria:{
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 5500
    },
    {
        id: "pantalon-02",
        titulo: "Pantalon 02",
        imagen: "./imagenes/pantalones/02.jpg",
        categoria:{
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 4500
    },
    {
        id: "pantalon-03",
        titulo: "Pantalon 03",
        imagen: "./imagenes/pantalones/03.jpg",
        categoria:{
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 4000
    },{
        id: "pantalon-04",
        titulo: "Pantalon 04",
        imagen: "./imagenes/pantalones/04.jpg",
        categoria:{
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 6000
    },
    {
        id: "pantalon-05",
        titulo: "Pantalon 05",
        imagen: "./imagenes/pantalones/05.jpg",
        categoria:{
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 5500
    },
]
//=======//
const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('#numerito');

//carga de productos
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>  
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});
// boton de agregar al carrito

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll('.producto-agregar');
   
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito(); 

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}