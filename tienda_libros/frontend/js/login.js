document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        alert(data.message);

        if (response.status === 200) {
            if (data.rol === 'administrador') {
                window.location.href = 'admin.html'; // Redireccionar a la página de administrador si el rol es 'administrador'
            } else if (data.rol === 'cliente') {
                window.location.href = 'tienda.html'; // Redireccionar a la página de tienda si el rol es 'cliente'
            }
        }
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        alert('Error durante el inicio de sesión');
    }
});
