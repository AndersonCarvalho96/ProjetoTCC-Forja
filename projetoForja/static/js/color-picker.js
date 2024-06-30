document.addEventListener('DOMContentLoaded', (event) => {
    const chatBox = document.querySelector('.chat-box');
    const colorPicker = document.getElementById('color-picker');

    // Define a cor padrão
    chatBox.style.color = '#ff7e15';

    // Adiciona um listener para o seletor de cor
    colorPicker.addEventListener('input', function () {
        chatBox.style.color = this.value;
    });
});
