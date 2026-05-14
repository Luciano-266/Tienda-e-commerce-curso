// 1. Carrito y Base de Datos
let carrito = [];

const baseDeDatos = {
    "Mujer": [
        { id: 1, nombre: "Vestido Floral Verano", precio: 35000, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400" },
        { id: 2, nombre: "Chaqueta de Cuero", precio: 85000, img: "https://images.unsplash.com/photo-1521223344201-d169129f7b7d?auto=format&fit=crop&q=80&w=400" },
        { id: 3, nombre: "Jeans High Waist", precio: 28000, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400" },
        { id: 4, nombre: "Blusa Seda Blanca", precio: 22000, img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=400" }
    ],
    "Hombre": [
        { id: 5, nombre: "Camisa Oxford Azul", precio: 32000, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" },
        { id: 6, nombre: "Polerón Hoodie Negro", precio: 40000, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" },
        { id: 7, nombre: "Pantalón Chino Beige", precio: 35000, img: "https://images.unsplash.com/photo-1473966968600-fa804b868ba2?auto=format&fit=crop&q=80&w=400" },
        { id: 8, nombre: "Zapatillas Urbanas", precio: 55000, img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400" }
    ],
    "Accesorios": [
        { id: 9, nombre: "Reloj Minimalista", precio: 45000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" },
        { id: 10, nombre: "Gafas de Sol Retro", precio: 15000, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400" },
        { id: 11, nombre: "Bolso de Mano Piel", precio: 65000, img: "https://images.unsplash.com/photo-1584917033904-49399ce4a98d?auto=format&fit=crop&q=80&w=400" }
    ]
};

// 2. Inicialización y Eventos
document.addEventListener('DOMContentLoaded', () => {
    // Formulario de Contacto
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = this.querySelector('input[type="text"]').value;
            const btn = this.querySelector('button');
            btn.innerText = "Enviando...";
            btn.disabled = true;

            setTimeout(() => {
                alert(`¡Gracias ${nombre}! Hemos recibido tu consulta sobre estilo.`);
                contactForm.reset();
                btn.innerText = "Enviar";
                btn.disabled = false;
            }, 1500);
        });
    }

    // Eventos de las Cards de Categoría
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const categoria = card.querySelector('h3').innerText;
            abrirGestion(categoria);
        });
    });
});

// 3. Navegación
function abrirGestion(categoria) {
    document.getElementById('vista-inicio').style.display = 'none';
    document.getElementById('vista-crud').style.display = 'block';
    document.getElementById('nombre-mascota-seleccionada').innerText = categoria;

    const grid = document.getElementById('grid-productos');
    grid.innerHTML = "";

    const productos = baseDeDatos[categoria] || [];

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
    window.scrollTo(0, 0);
}

function volver() {
    document.getElementById('vista-inicio').style.display = 'block';
    document.getElementById('vista-crud').style.display = 'none';
}

// 4. Carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    document.getElementById('cart-count').innerText = carrito.length;
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("La bolsa está vacía. ¡Elige algo que combine contigo!");
        return;
    }
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    alert(`🛍️ RESUMEN DE TU BOLSA:\n------------------\nArtículos: ${carrito.length}\nTotal: $${total.toLocaleString()}\n\n¡Gracias por elegir StyleFlow!`);
    carrito = [];
    document.getElementById('cart-count').innerText = "0";
}