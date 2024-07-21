async function fetchLibros() {
    try {
        const response = await fetch('http://localhost:3000/libros');
        const libros = await response.json();
        const librosDiv = document.getElementById('libros');
        librosDiv.innerHTML = '';
        libros.forEach(libro => {
            const libroDiv = document.createElement('div');
            libroDiv.innerHTML = `
                <h3>${libro.titulo}</h3>
                <p>Autor: ${libro.autor}</p>
                <p>Precio: ${libro.precio}</p>
                <p>Stock: ${libro.stock}</p>
                <button onclick="verDetalle(${libro.id})">Ver Detalle</button>
            `;
            librosDiv.appendChild(libroDiv);
        });
    } catch (error) {
        console.error('Error al cargar los libros:', error);
    }
}

async function verDetalle(libroId) {
    try {
        const response = await fetch(`http://localhost:3000/libros/${libroId}`);
        const libro = await response.json();
        alert(`Detalles de ${libro.titulo}:\nAutor: ${libro.autor}\nPrecio: ${libro.precio}\nStock: ${libro.stock}`);
    } catch (error) {
        console.error('Error al cargar el detalle del libro:', error);
    }
}

fetchLibros();
