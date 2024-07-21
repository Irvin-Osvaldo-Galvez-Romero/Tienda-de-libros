document.addEventListener('DOMContentLoaded', () => {
    fetchLibros();
    
    document.getElementById('formAgregarLibro').addEventListener('submit', async (event) => {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const precio = document.getElementById('precio').value;
        const stock = document.getElementById('stock').value;

        try {
            const response = await fetch('http://localhost:3000/libros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo, autor, precio, stock })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            alert(data.message);
            fetchLibros(); // Actualizar la tabla después de agregar un libro
        } catch (error) {
            console.error('Error al agregar el libro:', error);
            alert('Error al agregar el libro');
        }
    });
});

async function fetchLibros() {
    try {
        const response = await fetch('http://localhost:3000/libros');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const libros = await response.json();
        mostrarLibros(libros);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        alert('Error al obtener los libros');
    }
}

function mostrarLibros(libros) {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = ''; // Limpiar el contenido actual de la tabla
    libros.forEach(libro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.precio}</td>
            <td>${libro.stock}</td>
        `;
        cuerpoTabla.appendChild(row);
    });
}