const productos = [
            {
            id: "remera-01",
            titulo: "remera 01",
            imagen: "./img/remeras/reme01.jpg",
            categoria: {
                nombre: "Remeras",
                id: "remeras"
            },
            precio: 1200
            },

            {
            id: "remera-02",
            titulo: "remera 02",
            imagen: "./img/remeras/reme02.jpg",
            categoria: {
                nombre: "Remeras",
                id: "remeras"
            },
            precio:1200
           },

            {
            id: "remera-03",
            titulo: "remera 03",
            imagen: "./img/remeras/reme03.jpg",
            categoria: {
                nombre: "Remeras",
                id: "remeras"
            },
            precio: 1200
            },

            {
            id: "remera-04",
            titulo: "remera 04",
            imagen: "./img/remeras/reme04.jpg",
            categoria: {
                nombre: "Remeras",
                id: "remeras"
            },
            precio: 1200
            },
                    
            {
            id: "pantalon-01",
            titulo: "Jean 01",
            imagen: "./img/pantalones/jean01.jpg",
            categoria: {
                nombre: "Pantalones",
                id: "pantalones"
            },
            precio: 2000
            },

            {
            id: "pantalon-02",
            titulo: "Jean 02",
            imagen: "./img/pantalones/jean02.jpg",
            categoria: {
                nombre: "Pantalones",
                id: "pantalones"
            },
            precio: 2000
            },
            
            {
            id: "pantalon-03",
            titulo: "Jean 03",
            imagen: "./img/pantalones/jean03.jpg",
            categoria: {
                nombre: "Pantalones",
                id: "pantalones"
            },
            precio: 2000
            },
            
            {
            id: "pantalon-04",
            titulo: "Jean 04",
            imagen: "./img/pantalones/jean04.jpg",
            categoria: {
                nombre: "Pantalones",
                id: "pantalones"
            },
            precio: 2000
            }  
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal =  document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".boton-agregar");
const numerito =  document.querySelector ("#numerito");


// for que recorre todo los productos
function cargarProductos (productosElegidos)  {
contenedorProductos.innerHTML ="";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =`
            <img class="imagen-producto" src="${producto.imagen}" alt="">
            <div class="producto-descripcion">
                <p class="titulo-producto">${producto.titulo}</p>
                <p class="precio">$${producto.precio}</p>
                <button class="boton-agregar" id="${producto.id}">agregar</button>
            </div>
         `;
         contenedorProductos.append(div);

     })
     actualizarBotones();
    
}
cargarProductos(productos); 


// llamar categorias
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        

        if (e.currentTarget.id != "todos") {
        const productoCategoria = productos.find(producto => producto.categoria.id  === e.currentTarget.id);
        tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
        } else {
        tituloPrincipal.innerText = "Todos los productos";
       
        cargarProductos(productos); 
        }
    })    
});

// botones agregar
function actualizarBotones() {
    botonesAgregar = document.querySelectorAll(".boton-agregar");

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

// array que suma los productos al carrito


 function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton )) {
        const index = productosEnCarrito.findIndex(producto => producto.id ===idBoton );
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad =1;
        productosEnCarrito.push(productoAgregado);

    }
    actualizarNumerito();
  
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
 }
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;

}





