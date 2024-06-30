document.addEventListener('DOMContentLoaded', (event) => {
    const chatBox = document.querySelector('.chat-box');

    document.getElementById('modo-claro').addEventListener('click', function () {
        chatBox.classList.remove('modo-escuro', 'modo-alto-contraste');
        chatBox.classList.add('modo-claro');
    });

    document.getElementById('modo-escuro').addEventListener('click', function () {
        chatBox.classList.remove('modo-alto-contraste', 'modo-claro');
        chatBox.classList.add('modo-escuro');
    });

    document.getElementById('modo-alto-contraste').addEventListener('click', function () {
        chatBox.classList.remove('modo-escuro', 'modo-claro');
        chatBox.classList.add('modo-alto-contraste');
    });
});
