document.addEventListener('DOMContentLoaded', (event) => {
    const chatBox = document.querySelector('.chat-box');
    const colorPicker = document.getElementById('color-picker');

    // Define a cor padrão
    colorPicker.value = '#ff7e15';
    chatBox.style.color = colorPicker.value;

    // Adiciona um listener para o seletor de cor
    colorPicker.addEventListener('input', function () {
        chatBox.style.color = this.value;
        chatBox.classList.add('custom-color');
    });
});
