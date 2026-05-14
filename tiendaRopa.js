// 1. Declarar el carrito 
let carrito = [];

// Base de datos ACTUALIZADA para Tienda de Ropa
const baseDeDatos = {
    "MUJER": [
        { id: 1, nombre: "Vestido Floral", precio: 35000, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400" },
        { id: 2, nombre: "Chaqueta Denim", precio: 45000, img: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=400" },
        { id: 3, nombre: "Jeans Slim Fit", precio: 28000, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400" },
        { id: 4, nombre: "Blusa Seda", precio: 22000, img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=400" }
    ],
    "HOMBRE": [
        { id: 5, nombre: "Camisa Oxford", precio: 32000, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" },
        { id: 6, nombre: "Polerón Hoodie", precio: 40000, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" },
        { id: 7, nombre: "Pantalón Chino", precio: 35000, img: "https://images.unsplash.com/photo-1473966968600-fa804b868ba2?auto=format&fit=crop&q=80&w=400" },
        { id: 8, nombre: "Zapatillas Urban", precio: 55000, img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400" }
    ],
    "ACCESORIOS": [
        { id: 9, nombre: "Reloj Minimal", precio: 45000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" },
        { id: 10, nombre: "Gafas de Sol", precio: 15000, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400" },
        { id: 11, nombre: "Bolso de Cuero", precio: 65000, img: "https://images.unsplash.com/photo-1584917033904-49399ce4a98d?auto=format&fit=crop&q=80&w=400" },
        { id: 12, nombre: "Cinturón Piel", precio: 12000, img: "https://images.unsplash.com/photo-1624222247344-550fb8ecf7c4?auto=format&fit=crop&q=80&w=400" }
    ]
};

// 2. Sistema de Configuración Inicial
document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nombre.value.trim().length < 3) {
                alert("Por favor, ingresa un nombre válido.");
                nombre.focus();
                return;
            }
            if (!emailRegex.test(email.value)) {
                alert("Por favor, ingresa un correo válido.");
                email.focus();
                return;
            }

            const btn = this.querySelector('button');
            btn.innerText = "Enviando...";
            btn.disabled = true;

            setTimeout(() => {
                alert(`¡Éxito! Gracias ${nombre.value}, nos pondremos en contacto pronto.`);
                contactForm.reset();
                btn.innerText = "Enviar";
                btn.disabled = false;
            }, 1500);
        });
    }

    // --- Conectar las cards de la tienda ---
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const nombreCategoria = card.querySelector('h3').innerText.trim();
            abrirGestion(nombreCategoria);
        });
    });
});

// 3. Funciones de Navegación
function abrirGestion(categoriaRecibida) {
    const categoria = categoriaRecibida.trim();

    const vistaInicio = document.getElementById('vista-inicio');
    const vistaCrud = document.getElementById('vista-crud');
    const nombreEtiqueta = document.getElementById('nombre-mascota-seleccionada');
    const tituloGestion = document.getElementById('titulo-gestion');
    const grid = document.getElementById('grid-productos');

    // Cambiar de pantalla
    vistaInicio.style.display = 'none';
    vistaCrud.style.display = 'block';

    // Actualizar títulos
    nombreEtiqueta.innerText = categoria;
    tituloGestion.innerText = "COLECCIÓN " + categoria.toUpperCase();

    // Limpiar el grid
    grid.innerHTML = "";

    // Buscar productos
    const productos = baseDeDatos[categoria];

    if (productos && productos.length > 0) {
        productos.forEach(p => {
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.nombre}" class="product-img">
                    <div class="product-info">
                        <h3>${p.nombre}</h3>
                        <p class="product-price">$${p.precio.toLocaleString()}</p>
                        <button class="btn-comprar" onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">
                            Añadir a la Bolsa
                        </button>
                    </div>
                </div>
            `;
        });
    } else {
        grid.innerHTML = `<p style="text-align:center; width:100%;">No se encontraron productos en la categoría: ${categoria}</p>`;
    }
    window.scrollTo(0, 0);
}

function volver() {
    document.getElementById('vista-inicio').style.display = 'block';
    document.getElementById('vista-crud').style.display = 'none';
}

// 4. Lógica del Carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    document.getElementById('cart-count').innerText = carrito.length;
    console.log(`Agregado: ${nombre}`);
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu bolsa está vacía. ¡Elige algo que te guste!");
        return;
    }
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    alert(`🛍️ RESUMEN DE TU ORDEN:\n------------------\nProductos: ${carrito.length}\nTotal: $${total.toLocaleString()}\n\n¡Gracias por elegir StyleFlow!`);

    carrito = [];
    document.getElementById('cart-count').innerText = "0";
}