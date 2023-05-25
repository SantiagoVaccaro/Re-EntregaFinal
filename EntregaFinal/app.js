// Declaramos un array de objetos
const stockProductos = [
    {
        id: 1,
        nombre: "I Celeron",
        cantidad: 1,
        desc: "Microprocesador Intel Celeron",
        precio: 10000,
        img: "img/iCeleron.jpg",
    },
    {
        id: 2,
        nombre: "I3",
        cantidad: 1,
        desc: "Microprocesador Intel Core 3",
        precio: 15000,
        img: "img/i3.jpg",
    },
    {
        id: 3,
        nombre: "I5",
        cantidad: 1,
        desc: "Microprocesador Intel Core 5",
        precio: 20000,
        img: "img/i5.jpg",
    },
    {
        id: 4,
        nombre: "I7",
        cantidad: 1,
        desc: "Microprocesador Intel Core 7",
        precio: 30000,
        img: "img/i7.jpg",
    },
    {
        id: 5,
        nombre: "I9",
        cantidad: 1,
        desc: "Microprocesador Intel Core 9",
        precio: 40000,
        img: "img/i9.jpg",
    },
    {
        id: 6,
        nombre: "Amd Apu",
        cantidad: 1,
        desc: "Microprocesador Amd Apu",
        precio: 10000,
        img: "img/amd.jpg",
    },
    {
        id: 7,
        nombre: "R3",
        cantidad: 1,
        desc: "Microprocesador Ryzen 3",
        precio: 15000,
        img: "img/ryzen3.jpg",
    },
    {
        id: 8,
        nombre: "R5",
        cantidad: 1,
        desc: "Microprocesador Ryzen 5",
        precio: 20000,
        img: "img/ryzen5.jpg",
    },
    {
        id: 9,
        nombre: "R7",
        cantidad: 1,
        desc: "Microprocesador Ryzen 7",
        precio: 25000,
        img: "img/ryzen7.jpg",
    },
    {
        id: 10,
        nombre: "R9",
        cantidad: 1,
        desc: "Microprocesador Ryzen 9",
        precio: 30000,
        img: "img/ryzen9.jpg",
    },
];

// Declaramos un Array vacio para utilizar luego
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

// Podemos ver como se va agregando al LocalStorage desde la pagina
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});

if (formulario) {
    formulario.addEventListener('submit', enviarCompra)
}

// Funcion para vaciar el carrito
if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = [];
        mostrarCarrito();
    });
}

// Funcion para procesar la compra y que advierta si el carrito esta vacio
if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            location.href = "compra.html";
        }
    });
}

// Recorremos el Array de Productos para agregar de manera sistematica los nuevos objetos (Es mas limpio y ordenado de ver)
stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
        contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
});


// Creamos una funcion para agregar un producto y que si se repite, no se modifique el numero que se ve en el CARRITO, pero si cuando lo abrimos al mismo
const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }
    mostrarCarrito()

};

// Creamos una funcion para mostrar los productos que vamos seleccionanando (se ve en el carrito)
const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const { id, nombre, precio, desc, img, cantidad } = prod;
            console.log(modalBody);
            modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
        });
    }

    if (carrito.length === 0) {
        console.log("Nada");
        modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
        console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
            (acc, prod) => acc + prod.cantidad * prod.precio,
            0
        );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Creamos una funcion para eliminar un producto si asi lo deseamos. Luego llama a la funcion y muestra los productos que quedaron (en el carrito)
function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
}

// Creamos una funcion para poder ver, desde adentro del CARRITO, los productos que tenemos. Tambien se pueden eliminar desde ahi
function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { id, nombre, precio, img, cantidad } = prod;
        if (listaCompra) {
            const row = document.createElement("tr");
            row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
            listaCompra.appendChild(row);
        }
    });
    totalProceso.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
    );
}

// Con la siguiente funcion, creamos el boton de enviarCompra. Le agregamos un estilo con el spinner. Tambien se envian las compras realizadas a mi e-mail(santiagovaccaro97@gmail.com). Utilice EMAIL.JS
function enviarCompra(e) {
    e.preventDefault()
    const persona = document.querySelector('#persona').value
    const email = document.querySelector('#correo').value

    if (email === '' || persona == '') {
        Swal.fire({
            title: "¡Debes completar tu email y nombre!",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    } else {

        const btn = document.getElementById('button');

        // document.getElementById('procesar-pago')
        //  .addEventListener('submit', function(event) {
        //    event.preventDefault();

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_0bwjwfk';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Finalizar compra';
                alert('Enviado!');
            }, (err) => {
                btn.value = 'Finalizar compra';
                alert(JSON.stringify(err));
            });

        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        setTimeout(() => {
            spinner.classList.add('d-none')
            spinner.classList.remove('d-flex')
            formulario.reset()

            const alertExito = document.createElement('p')
            alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
            alertExito.textContent = 'Compra realizada correctamente'
            formulario.appendChild(alertExito)

            setTimeout(() => {
                alertExito.remove()
            }, 3000)


        }, 3000)
    }
    localStorage.clear()

}