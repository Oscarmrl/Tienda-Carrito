const producto = document.getElementById('producto')
const productoImagen = producto.querySelector('.producto__imagen')
const Thumbs = producto.querySelector('.producto__thumbs')

//color
const propiedadColor = producto.querySelector('#propiedad-color')


// cantidad 
const botonIncrementarCantidad = producto.querySelector('#incrementar-cantidad')
const botonDisminuirCantidad = producto.querySelector('#disminuir-cantidad')
const inputCantidad = producto.querySelector('#cantidad')







// cambiando imagen principal 
Thumbs.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const imagenSrc = e.target.src; // ruta completa de la imagen 


        const ultimoIndex = imagenSrc.lastIndexOf('/') //ubicacion de la ultima diagonal

        const nombreImagen = imagenSrc.substring(ultimoIndex + 1) //nombre de la imagen 


        productoImagen.src = `../img/tennis/${nombreImagen}` // cambiar la ruta de la imagen del producto

    }
})

//cambiando color
propiedadColor.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {

        productoImagen.src = `../img/tennis/${e.target.value}.jpg`

    }
})

//boton de incrementar 
botonIncrementarCantidad.addEventListener('click', (e) => {

    inputCantidad.value = parseInt(inputCantidad.value) + 1

})


botonDisminuirCantidad.addEventListener('click', (e) => {

    if (parseInt(inputCantidad.value) > 0) {
        inputCantidad.value = parseInt(inputCantidad.value) - 1
    }

})

