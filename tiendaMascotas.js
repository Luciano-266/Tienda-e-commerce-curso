// Sistema Validacion

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Detener el envío automático para validar
            e.preventDefault();

            // Selección de campos
            const nombre = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const mensaje = this.querySelector('textarea');

            // validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // === Lógica de Validación ===

            if (nombre.value.trim().length < 3) {
                alert("Por favor, ingresa un nombre válido (mínimo 3 caracteres).");
                nombre.focus();
                return;
            }

            if (!emailRegex.test(email.value)) {
                alert("Por favor, ingresa un correo electrónico válido.");
                email.focus();
                return;
            }

            if (mensaje.value.trim().length < 10) {
                alert("El mensaje es muy corto. Cuéntanos un poco más sobre lo que necesitas.");
                mensaje.focus();
                return;
            }

            // --- Simulación de éxito ---

            // Cambiamos el estado del botón
            const btn = this.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Enviando...";
            btn.style.backgroundColor = "#acbd99";
            btn.disabled = true;

            // Simulamos una demora de red
            setTimeout(() => {
                alert(`¡Éxito! Gracias ${nombre.value}, nos pondremos en contacto contigo pronto.`);

                // Limpiar el formulario
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = "#333";
            }, 1500);
        });
    }
});


/**Cambio Pantalla */

// Función para regresar al inicio
function volver() {
    document.getElementById('vista-inicio').style.display = 'block';
    document.getElementById('vista-crud').style.display = 'none';
}

// Conectar las cards actuales con la función
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const nombre = card.querySelector('h3').innerText;
        abrirGestion(nombre);
    });
});

// 1. Declarar el carrito 
let carrito = [];

// Base de datos de ejemplo 
const baseDeDatos = {
    "Perro": [
        { id: 1, nombre: "Cama ortopedica ", precio: 35000, img: "https://www.clubdeperrosygatos.cl/wp-content/uploads/2024/05/cama-ortopedica-azul.webp" },
        { id: 2, nombre: "Alimento Pro Plan 15kg", precio: 52000, img: "https://i5.walmartimages.cl/asr/b58847fe-258e-4d40-9abc-c3d105eb4de6.24934200a8c57c7d9d2fba054740fa0f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
        { id: 3, nombre: "Juguete Mordedor", precio: 8000, img: "https://www.clubdeperrosygatos.cl/wp-content/uploads/2025/01/Juguete-Para-Perro-Mordedor-Tuerca-Spin-Fluor-1.webp" },
        { id: 4, nombre: "Correa (5 metros)", precio: 7000, img: "https://static.wixstatic.com/media/26ee3a_aa83895664cf4988b6fd91ac6db8aa1e~mv2.jpg/v1/fill/w_498,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26ee3a_aa83895664cf4988b6fd91ac6db8aa1e~mv2.jpg" },
        { id: 5, nombre: "Collar (Personalizado", precio: 6000, img: "https://i.ebayimg.com/images/g/fYoAAOSw54Fny-e2/s-l1600.webp" },
        { id: 6, nombre: "Peines", precio: 6500, img: "https://cdnx.jumpseller.com/cody-store/image/47224036/resize/640/500?1712004732" },
        { id: 7, nombre: "Shampoo", precio: 8000, img: "https://www.buddypet.cl/wp-content/uploads/2021/07/fotos-walmart13-600x600.png" },
        { id: 8, nombre: "Alimento Cachorros", precio: 45000, img: "https://ferosor.cl/307-large_default/alimento-para-perro-cachorro-fit-formula-saco-10-kg.jpg" }
    ],
    "Gato": [
        { id: 9, nombre: "Rascador Multinivel", precio: 45000, img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400" },
        { id: 10, nombre: "Comida premium", precio: 65000, img: "https://www.tusmascotas.cl/wp-content/uploads/2022/08/premier-gato.png" },
        { id: 11, nombre: "Camas ", precio: 45000, img: "https://arenaparamascotas.cl/wp-content/uploads/2024/03/casa-cama-rascador.webp" },
        { id: 12, nombre: "Arena Silica 5kg", precio: 15000, img: "https://http2.mlstatic.com/D_NQ_NP_2X_973345-MLA79657607861_092024-F.webp" }
    ],
    "Otros": [
        { id: 13, nombre: "Acuario de Vidrio", precio: 65000, img: "https://m.media-amazon.com/images/I/61z9cc4FmlL._AC_UF894,1000_QL80_.jpg" },
        { id: 14, nombre: "Alimento Comida Ave", precio: 55000, img: "https://http2.mlstatic.com/D_NQ_NP_937683-MLC46432246864_062021-O.webp" },
        { id: 15, nombre: "Rueda De Ejercicios", precio: 25000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaEMGd3gT2vNupccRFoNuzmTGIF6Pl36BMzQ&s" },
        { id: 6, nombre: "Jaula para Aves", precio: 29000, img: "https://pethome.cl/imagenes/productos/613CEL_1755698141.webp" }
    ]
};

// 2. Sistema de Validación y Configuración Inicial
document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const mensaje = this.querySelector('textarea');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nombre.value.trim().length < 3) {
                alert("Por favor, ingresa un nombre válido (mínimo 3 caracteres).");
                nombre.focus();
                return;
            }
            if (!emailRegex.test(email.value)) {
                alert("Por favor, ingresa un correo electrónico válido.");
                email.focus();
                return;
            }
            if (mensaje.value.trim().length < 10) {
                alert("El mensaje es muy corto. Cuéntanos un poco más.");
                mensaje.focus();
                return;
            }

            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Enviando...";
            btn.style.backgroundColor = "#acbd99";
            btn.disabled = true;

            setTimeout(() => {
                alert(`¡Éxito! Gracias ${nombre.value}, nos pondremos en contacto pronto.`);
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = "#333";
            }, 1500);
        });
    }

    // --- Conectar las cards de la tienda ---
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const nombre = card.querySelector('h3').innerText;
            abrirGestion(nombre);
        });
    });
});

// 3. Funciones de Navegación
function abrirGestion(nombreMascota) {
    document.getElementById('vista-inicio').style.display = 'none';
    document.getElementById('vista-crud').style.display = 'block';
    document.getElementById('nombre-mascota-seleccionada').innerText = nombreMascota;

    const grid = document.getElementById('grid-productos');
    grid.innerHTML = "";

    const productos = baseDeDatos[nombreMascota] || [];

    productos.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" alt="${p.nombre}" class="product-img">
                <div class="product-info">
                    <h3>${p.nombre}</h3>
                    <p class="product-price">$${p.precio.toLocaleString()}</p>
                    <button class="btn-comprar" onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
    });
    // Scroll hacia arriba para ver los productos
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
        alert("Tu carrito está vacío. ¡Elige algo para tu mascota!");
        return;
    }
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    alert(`🛒 RESUMEN DE COMPRA:\n------------------\nProductos: ${carrito.length}\nTotal: $${total.toLocaleString()}\n\n¡Gracias por comprar en PetWorld!`);

    carrito = [];
    document.getElementById('cart-count').innerText = "0";
}