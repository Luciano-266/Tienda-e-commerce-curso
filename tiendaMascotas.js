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

// Función para entrar a la sección de gestión
function abrirGestion(nombreMascota) {
    // 1. Ocultar la página de inicio
    document.getElementById('vista-inicio').style.display = 'none';

    // 2. Mostrar la sección de gestión/CRUD
    const seccionCrud = document.getElementById('vista-crud');
    seccionCrud.style.display = 'block';

    // 3. Cambiar el título según lo que presionaste
    document.getElementById('nombre-mascota-seleccionada').innerText = nombreMascota;
    document.getElementById('titulo-gestion').innerText = "Gestión de: " + nombreMascota;

    // (Aquí es donde más adelante harás el "Read" del CRUD)
    console.log("Cargando datos de " + nombreMascota);
}

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


// Base de datos de ejemplo (Hardcoded para que se vea lleno)
const baseDeDatos = {
    "Perro": [
        { id: "P-01", nombre: "Cama Ortopédica", precio: 35000, stock: "Disponible" },
        { id: "P-02", nombre: "Arnés Reflectante", precio: 12500, stock: "Disponible" },
        { id: "P-03", nombre: "Saco Alimento 15kg", precio: 52000, stock: "Disponible" }
    ],
    "Gato": [
        { id: "G-01", nombre: "Rascador Multinivel", precio: 45000, stock: "Disponible" },
        { id: "G-02", nombre: "Arena Biodegradable", precio: 18000, stock: "Agotado" },
        { id: "G-03", nombre: "Juguete con Catnip", precio: 5500, stock: "Disponible" }
    ],
    "Otros": [
        { id: "O-01", nombre: "Jaula Transportadora", precio: 28000, stock: "Disponible" },
        { id: "O-02", nombre: "Kit Acuario 20L", precio: 65000, stock: "Disponible" }
    ]
};

function abrirGestion(nombreMascota) {
    // Ocultar inicio y mostrar CRUD
    document.getElementById('vista-inicio').style.display = 'none';
    document.getElementById('vista-crud').style.display = 'block';

    // Actualizar textos
    document.getElementById('nombre-mascota-seleccionada').innerText = nombreMascota;

    // Generar las filas de la tabla
    const tabla = document.getElementById('cuerpo-tabla');
    tabla.innerHTML = ""; // Limpiar

    const productos = baseDeDatos[nombreMascota] || [];

    productos.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td style="color: #888; font-size: 12px;">${p.id}</td>
                <td style="font-weight: 500;">${p.nombre}</td>
                <td><span class="status-pill">${p.stock}</span></td>
                <td style="font-weight: bold;">$${p.precio.toLocaleString()}</td>
                <td>
                    <button class="btn-accion" title="Editar">📝</button>
                    <button class="btn-accion" title="Eliminar">🗑️</button>
                </td>
            </tr>
        `;
    });
}