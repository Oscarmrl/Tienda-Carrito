'use strict';

const producto$1 = document.getElementById('producto');
const productoImagen = producto$1.querySelector('.producto__imagen');
const Thumbs = producto$1.querySelector('.producto__thumbs');

//color
const propiedadColor = producto$1.querySelector('#propiedad-color');


// cantidad 
const botonIncrementarCantidad = producto$1.querySelector('#incrementar-cantidad');
const botonDisminuirCantidad = producto$1.querySelector('#disminuir-cantidad');
const inputCantidad = producto$1.querySelector('#cantidad');







// cambiando imagen principal 
Thumbs.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const imagenSrc = e.target.src; // ruta completa de la imagen 


        const ultimoIndex = imagenSrc.lastIndexOf('/'); //ubicacion de la ultima diagonal

        const nombreImagen = imagenSrc.substring(ultimoIndex + 1); //nombre de la imagen 


        productoImagen.src = `../img/tennis/${nombreImagen}`; // cambiar la ruta de la imagen del producto

    }
});

//cambiando color
propiedadColor.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {

        productoImagen.src = `../img/tennis/${e.target.value}.jpg`;

    }
});

//boton de incrementar 
botonIncrementarCantidad.addEventListener('click', (e) => {

    inputCantidad.value = parseInt(inputCantidad.value) + 1;

});


botonDisminuirCantidad.addEventListener('click', (e) => {

    if (parseInt(inputCantidad.value) > 0) {
        inputCantidad.value = parseInt(inputCantidad.value) - 1;
    }

});

var data = {
    productos: [
        {
            id: '1',
            nombre: 'Tennis Converse Standard.',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 500.0,
            colores: ['rojo', 'negro', 'amarillo'],
            tamaños: ['1,5', '2', '2,5', '3', '4']
        },

        {
            id: '2',
            nombre: 'Tennis Converse 2000.',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 450.0,
            colores: ['rojo', 'negro', 'amarillo'],
            tamaños: ['1,5', '2', '2,5', '3', '4']
        }
    ]
};

//Accediendo a los botones para agregar al carrito
const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
const producto = document.getElementById('producto');
let carrito = [];
let notificacion = document.getElementById('notificacion');
//añadiendo api para formato de moneda
const FormatearMoneda = new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' });



const ventanaCarrito = document.getElementById('carrito');
const renderCarrito = () => {

    //Eliminacion de productos anteriores
    const productosAnterirores = ventanaCarrito.querySelectorAll('.carrito__producto');
    productosAnterirores.forEach((producto) => producto.remove());


    ventanaCarrito.classList.add('carrito--active');

    let total = 0;

    if (carrito.length < 1) {
        ventanaCarrito.classList.add('carrito--vacio');
    } else {
        ventanaCarrito.classList.remove('carrito--vacio');



        carrito.forEach((productoCarrito) => {
            // obtenemos el precio del archivo.js
            data.productos.forEach((productoBaseDatos) => {
                if (productoBaseDatos.id === productoCarrito.id) {
                    productoCarrito.precio = productoBaseDatos.precio;


                    total += productoBaseDatos.precio * productoCarrito.cantidad;
                }
            });


            let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;

            if (productoCarrito.color === 'rojo') {
                thumbSrc = '../img/tennis/rojo.jpg';
            } else if (productoCarrito.color === 'amarillo') {
                thumbSrc = '../img/tennis/amarillo.jpg';
            }


            //creamos la plantilla a insertar en el div
            const plantillaProducto = `
        <div class="carrito__producto-info">
        <img src="${thumbSrc}" alt="" class="carrito__thumb" />
        <div>
            <p class="carrito__producto-nombre">
                <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
            </p>
            <p class="carrito__producto-propiedades">
                Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${productoCarrito.color}</span>
            </p>
        </div>
    </div>
    <div class="carrito__producto-contenedor-precio">
        <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                />
            </svg>
        </button>
        <p class="carrito__producto-precio">${FormatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
    </div>
</div> -->`;

            //creamos un div
            const itemCarrito = document.createElement('div');

            //le agregamos la clase al div  que creamos
            itemCarrito.classList.add('carrito__producto');

            //usando la plantilla
            itemCarrito.innerHTML = plantillaProducto;

            //agregamos el producto a la ventana del carrito
            ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
        });

        ventanaCarrito.querySelector('.carrito__total').innerText = FormatearMoneda.format(total);

    }
};



//Abrir carrito
botonesAbrirCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {

        renderCarrito();

    });
});


//Cerrar carrito
botonesCerrarCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {

        ventanaCarrito.classList.remove('carrito--active');

    });
});



//btn Agregar al carrito
btnAgregarCarrito.addEventListener('click', (e) => {
    const id = producto.dataset.productoId;
    const nombre = producto.querySelector('.producto__nombre').innerText;
    const cantidad = parseInt(producto.querySelector('#cantidad').value);
    const color = producto.querySelector('#propiedad-color input:checked').value;
    const tamaño = producto.querySelector('#propiedad-tamaño input:checked').value;


    if (carrito.length > 0) {
        let productoEnCarrito = false;


        carrito.forEach(item => {
            if (item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño) {
                item.cantidad += cantidad;
                productoEnCarrito = true;
            }
        });

        if (!productoEnCarrito) {
            carrito.push({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                tamaño: tamaño,
            });
        }

    } else {

        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño,
        });
    }

    notificacion.classList.add('notificacion--active');


    let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;

    if (color === 'rojo') {
        thumbSrc = '../img/tennis/rojo.jpg';

    } else if (color === 'amarillo') {
        thumbSrc = '../img/tennis/amarillo.jpg';
    }

    notificacion.querySelector('img').src = thumbSrc;

    /*  setTimeout(function () {
  
          notificacion.classList.remove('notificacion--active')
      }, 5000)
      */


    setTimeout(() => {
        notificacion.classList.remove('notificacion--active');
    }, 5000);

});

//Botones de eliminar articulos del carrito
ventanaCarrito.addEventListener('click', (e) => {
    if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {

        const producto = e.target.closest('.carrito__producto');
        const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);



        carrito = carrito.filter((item, index) => {
            if (index !== indexProducto) {
                return item

            }
        });

        renderCarrito();
    }
});
