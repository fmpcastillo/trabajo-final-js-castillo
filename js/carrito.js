let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
       
        productosEnCarrito.forEach(producto => {
            
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="imagen-carrito-producto" src="${producto.imagen}" alt="">
                <div  class="carrito-producto-titulo">
                    <p>${producto.titulo}</p>
                </div>
                <div class="cantidad">
                    <p>Cantidad</p>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <p>Precio</p>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <p>Subtotal</p>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>
            `;
            contenedorCarritoProductos.append(div);
        })

    actualizarBotonesEliminar();
    actualizarTotal();
	
        
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar= document.querySelectorAll(".carrito-producto-eliminar");


    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });       
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}


botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire(
        '¿Estas seguro?',
        '¿sevana borrar todos tus productos?',
        'question'
      )

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}

function actualizarTotal() {
    const totalCalculado =  productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
   
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
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