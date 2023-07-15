
    let productos = [];
    fetch("./js/productos.json")
        .then(respuesta => respuesta.json())
        .then (data => {
            productos =data;
            cargarProductos(productos); 
        })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal =  document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".boton-agregar");
const numerito =  document.querySelector("#numerito");


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



// llamar categorias
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

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

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
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

function obtenerDolar(){
    const URLDOLAR ='https://api.bluelytics.com.ar/v2/latest';
    fetch(URLDOLAR)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            const cotizacionesBlue = datos.blue;
            document.getElementById('cotizaciones').innerText=`Dolar compra: ${cotizacionesBlue.value_buy} - Dolar venta: ${cotizacionesBlue.value_sell}`;
        })
}

obtenerDolar();




