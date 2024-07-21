
async function fetchUsuarios() {
    const response = await fetch('http://localhost:3000/usuarios');
    const usuarios = await response.json();
    const cuerpoTablaUsuarios = document.getElementById('cuerpoTablaUsuarios');
    cuerpoTablaUsuarios.innerHTML = ''; // Limpiar el contenido actual de la tabla
    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.username}</td>
            <td>${usuario.password}</td>
            <td>
                <select id="rolUsuario${usuario.id}">
                    <option value="administrador">Administrador</option>
                    <option value="cliente">Cliente</option>
                </select>
            </td>
            <td>
                <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                <button onclick="actualizarRol(event, ${usuario.id})">Actualizar Rol</button>
            </td>
        `;
        cuerpoTablaUsuarios.appendChild(row);
    });
}

async function agregarUsuario(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
    fetchUsuarios();
}

async function eliminarUsuario(id) {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    alert(data.message);
    fetchUsuarios();
}

async function actualizarRol(event, id) {
    event.preventDefault();
    const nuevoRol = document.getElementById(`rolUsuario${id}`).value;

    const response = await fetch(`http://localhost:3000/usuarios/${id}/rol`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rol: nuevoRol })
    });

    const data = await response.json();
    alert(data.message);
    fetchUsuarios();
}


function regresarAAdmin() {
    window.location.href = 'admin.html';
}

document.getElementById('formAgregarUsuario').addEventListener('submit', agregarUsuario);
fetchUsuarios();
