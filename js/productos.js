// Declaro una variable vacia para el carrito
let carrito = [];

// Creo los objetos de los productos
const Productos = [
    {
        id: 1,
        nombre: "BICICLETA GIANT TALON 1 29ER (2021)",
        precio: 213840,
        img: "img/bicicletas/destacada4.png",
        cantidad: 1
    },
    {
        id: 2,
        nombre: "BICICLETA GIANT TALON 0 29ER (2021)",
        precio: 269160,
        img: "img/bicicletas/destacada1.png",
        cantidad: 1
    },
    {
        id: 3,
        nombre: "BICICLETA GIANT TALON 3 29ER (2021)",
        precio: 90000,
        img: "img/bicicletas/destacada2.png",
        cantidad: 1
    },
    {
        id: 4,
        nombre: "BICICLETA GIANT XTC SLR 1 29ER (2021)",
        precio: 441840,
        img: "img/bicicletas/destacada3.png",
        cantidad: 1
    },
    {
        id: 5,
        nombre: "PARCHE RED SUN SOLO RS3601 X50 UND",
        precio: 177.87,
        img: "img/accesorios/accesorio1.png",
        cantidad: 1
    },
    {
        id: 6,
        nombre: "KIT DE LUCES SILICONA SBK JY-267-2B",
        precio: 404.80,
        img: "img/accesorios/accesorio2.png",
        cantidad: 1
    },
    {
        id: 7,
        nombre: "RODILLERAS DE ESPONJA GRUESA",
        precio: 2000,
        img: "img/accesorios/accesorio3.png",
        cantidad: 1
    },
    {
        id: 8,
        nombre: "CASCO DE CICLISMO DEPORTIVO MTB 3490",
        precio: 1780,
        img: "img/accesorios/accesorio4.png",
        cantidad: 1
    }
];

let numero_del_carrito = document.querySelector(".id_contador");
let contenedor = document.querySelector(".contenedor");
let PrecioTotal = document.querySelector(".PrecioTotal");
let btn_carrito = document.getElementById("mostrar_carrito");
let vaciar_carrito = document.querySelector(".vaciar_C");

document.addEventListener("DOMContentLoaded", function () {
    carrito = JSON.parse(localStorage.getItem("art_carrito")) || [];
    ver_carrito();
})

// creo un contenedor con los productos y los coloco en el html
for (let art of Productos) {
    const { id, nombre, precio, img, cantidad } = art; // 
    contenedor.innerHTML += `<div class="col d-flex align-items-center justify-content-around">
                                <div class="card d-flex align-items-center justify-content-center">
                                    <img src="${img}" class="card-img-top" alt="destacada4">
                                    <div class="card-body">
                                        <h5 class="card-title">${nombre}</h5>
                                        <p class="card-text">$ ${precio}</p>
                                        <button class="btn alinear-btn btn-primary" onclick="agregar_carrito(${id})">Comprar</button>
                                    </div>
                                </div>
                            </div>`

}

// creo la funcion para agregar productos al carrito

function agregar_carrito(id) {

    // declaro la variable si existe el articulo
    let existe_art = carrito.some(prod => prod.id === id) // con el metodo some busco si elemento existe en el carrito

    // realizo una condicion de si el articulo esta agregado se sume la cantidad en vez de repetirse
    if (existe_art) {
        let prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        let item = Productos.find((prod => prod.id === id)) // Busco el id del producto 
        carrito.push(item); // si encuantra el id lo agrega 

    }
    ver_carrito();
}

// muestro los productos agregados al carrito
function ver_carrito() {
    let tabla = document.getElementById("tbody");
    tabla.innerHTML = ""; // esto es para que no se repitan los articulos al cargarlos

    // recorro los productos 
    for (let prod of carrito) {
        const { id, nombre, precio, img, cantidad } = prod;

        let fila = document.createElement("div");
        fila.innerHTML = `<section class="h-100">
                          <div class="container">
                              <div class="row d-flex justify-content-center align-items-center">
                                  <div class="items_carrito">
                              
                                      <div class="card rounded-3 mb-4">
                                          <div class="card-body p-2">
                                              <div class="row d-flex justify-content-between align-items-center">
                                                  <div class="col-md-2 col-lg-2 col-xl-2">
                                                  <img src="${img} "class="img-fluid rounded-circle" alt="Cotton T-shirt">
                                              </div>
                                              <div class="col-md-5 col-lg-5 col-xl-5">
                                                    <p class="lead fw-normal mb-2">${nombre}</p>
                                              </div>
                                              <div class="col-md-1 col-lg-2 col-xl-1 d-flex justify-content-center">   
                                                    <h5 class="lead fw-normal mb-2">${cantidad}</h5>
                                              </div>
                                              <div class="col-md-2 col-lg-2 col-xl-2">
                                                    <h5 class="mb-0">${precio}</h5>
                                              </div>
                                              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <button class="btn btn-danger" onclick="borrar_producto(${id})"> ❎ </button>
                                              </div>

                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>    
                        </section>`;

        tabla.append(fila); // muestro el producto
    }

    // Si el carrito esta vacio que me lo muestre
    if (carrito.length === 0) {
        tabla.innerHTML = `<div class="mensaje-carrito">Tu carrito esta vacio</div>`;
    }

    // creo un acumulador de articulos para el carrito
    numero_del_carrito.textContent = carrito.length;

    // Calculo el total del carrito
    PrecioTotal.textContent = carrito.reduce((total, art) => total + art.cantidad * art.precio, 0);

    guardar_localStorage();
}

// creo la funcion para borrar articulo del carrito
function borrar_producto(id) {
    let guardarId = id; // guardo el id del articulo por borrar
    carrito = carrito.filter((eliminar) => eliminar.id !== guardarId);  //Traigo todos los productos menos el que cumpla la condicion
    ver_carrito();
}


// con esta funcion guardo los productos del carrito en el localstorage
function guardar_localStorage() {
    let art_local = JSON.stringify(carrito);
    localStorage.setItem("art_carrito", art_local);
}


// creo una funcion para ocultar el carrito
btn_carrito.addEventListener("click", function () {
    let carro = document.getElementById("carrito");

    if (carro.style.display != "none") {
        carro.style.display = "none";
    } else {
        carro.style.display = "block";

    }
})


