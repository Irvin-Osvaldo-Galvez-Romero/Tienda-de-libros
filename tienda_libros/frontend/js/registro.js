document.getElementById('formRegistro').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registroUsername').value;
    const password = document.getElementById('registroPassword').value;

    const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);

    if (response.status === 200) {
        window.location.href = 'login.html'; // Redireccionar a la página de inicio de sesión si el registro es exitoso
    }
});
