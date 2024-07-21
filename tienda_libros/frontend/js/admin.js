async function fetchLibros() {
    const response = await fetch('http://localhost:3000/libros');
    const libros = await response.json();
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = ''; // Limpiar el contenido actual de la tabla
    libros.forEach(libro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.precio}</td>
            <td>${libro.stock}</td>
            <td>
                <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
                <button onclick="mostrarFormularioActualizar(${libro.id})">Actualizar</button>
            </td>
        `;
        cuerpoTabla.appendChild(row);
    });
}

async function agregarLibro(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    const response = await fetch('http://localhost:3000/libros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, precio, stock })
    });

    const data = await response.json();
    alert(data.message);
    fetchLibros();
}

async function eliminarLibro(id) {
    const response = await fetch(`http://localhost:3000/libros/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    alert(data.message);
    fetchLibros();
}

function mostrarFormularioActualizar(id) {
    const form = document.getElementById(`formActualizar${id}`);
    form.style.display = 'block';
}

async function actualizarLibro(id) {
    const titulo = document.getElementById(`titulo${id}`).value;
    const autor = document.getElementById(`autor${id}`).value;
    const precio = document.getElementById(`precio${id}`).value;
    const stock = document.getElementById(`stock${id}`).value;

    const response = await fetch(`http://localhost:3000/libros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, precio, stock })
    });

    const data = await response.json();
    alert(data.message);
    fetchLibros();
}

function irACRUDUsuarios() {
    window.location.href = 'crud_usuarios.html';
}

document.getElementById('formAgregarLibro').addEventListener('submit', agregarLibro);
fetchLibros();
