// 1. Declarar el carrito 
let carrito = [];

// Base de datos ACTUALIZADA para Tienda de Ropa
const baseDeDatos = {
    "MUJER": [
        { id: 1, nombre: "Vestido Floral", precio: 35000, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400" },
        { id: 2, nombre: "Chaqueta Denim", precio: 45000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTolNo7lssUDeAzfVDUuwR-Y-yHs-yzKb9HhA&s" },
        { id: 3, nombre: "Jeans Slim Fit", precio: 28000, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400" },
        { id: 4, nombre: "Blusa Seda", precio: 22000, img: "https://m.media-amazon.com/images/I/51UuREJfouL._AC_UY1000_.jpg" }
    ],
    "HOMBRE": [
        { id: 5, nombre: "Camisa Oxford", precio: 32000, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" },
        { id: 6, nombre: "Polerón Hoodie", precio: 40000, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" },
        { id: 7, nombre: "Pantalón Cargo", precio: 35000, img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d7a3e4e0f17b5a378e475567270a13eb.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp" },
        { id: 8, nombre: "Zapatillas Urban", precio: 55000, img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400" }
    ],
    "ACCESORIOS": [
        { id: 9, nombre: "Reloj Minimal", precio: 45000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" },
        { id: 10, nombre: "Gafas de Sol", precio: 15000, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400" },
        { id: 11, nombre: "Bolso de Cuero", precio: 65000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI0YPFozz7uCM6QjpLyjglFlmUc6g9qMB04w&s" },
        { id: 12, nombre: "Cinturón Piel", precio: 12000, img: "https://media.falabella.com/falabellaCL/17664996_1/w=1500,h=1500,fit=cover" }
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