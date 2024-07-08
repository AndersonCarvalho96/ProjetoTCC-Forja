document.addEventListener('DOMContentLoaded', (event) => {
    const chatBox = document.querySelector('.chat-box');
    const fontDislexiaButton = document.getElementById('fonte-dislexia');
    const fontDropdownButton = document.querySelector('.font-selector-button');
    const fontDropdownMenu = document.querySelector('.dropdown-menu');
    const fontOptions = document.querySelectorAll('.dropdown-item');
    const colorPicker = document.getElementById('color-picker');
    let isDislexiaFont = false;
    let currentFontColor = '#ff7e15'; // Cor padrão
    let isFontDropdownOpen = false;

    // Função para alternar a fonte
    function changeFontFamily(fontFamily) {
        chatBox.style.fontFamily = fontFamily;
    }

    // Evento de clique para alternar a visibilidade do menu de opções de fonte
    fontDropdownButton.addEventListener('click', function () {
        if (!isFontDropdownOpen) {
            fontDropdownMenu.style.display = 'block';
            isFontDropdownOpen = true;
        } else {
            fontDropdownMenu.style.display = 'none';
            isFontDropdownOpen = false;
        }
    });

    // Eventos de clique para cada opção de fonte no dropdown
    fontOptions.forEach(option => {
        option.addEventListener('click', function () {
            const fontFamily = option.textContent;
            changeFontFamily(fontFamily);
        });
    });

    // Evento para alterar a cor da fonte
    colorPicker.addEventListener('input', function () {
        const fontColor = colorPicker.value;
        chatBox.style.color = fontColor;
    });

    // Evento de clique para alternar a fonte para dislexia
    fontDislexiaButton.addEventListener('click', function () {
        const dislexiaFontFamily = 'OpenDyslexic,sans-serif';
        changeFontFamily(dislexiaFontFamily);
    });
    // Função para alternar a fonte
    function toggleDislexiaFont() {
        if (!isDislexiaFont) {
            chatBox.style.fontFamily = 'OpenDyslexic, sans-serif';
            isDislexiaFont = true;
        } else {
            chatBox.style.fontFamily = 'Alfa Slab One, sans-serif';
            isDislexiaFont = false;
        }
    }

    // Evento de click no botão "Fonte Dislexia"
    document.getElementById('fonte-dislexia').addEventListener('click', function () {
        toggleDislexiaFont();
        // Mantém a cor atual ao alterar a fonte
        chatBox.style.color = currentFontColor;
    });

    // Evento para capturar a mudança de cor no color picker
    document.getElementById('color-picker').addEventListener('change', function (event) {
        currentFontColor = event.target.value;
        chatBox.style.color = currentFontColor;
    });

    // Evento de click no botão de configurações para abrir e fechar o menu
    let configuracoesMenu = document.getElementById('configuracoes-menu');
    let isConfigMenuOpen = false;
    document.getElementById('configuracoes-btn').addEventListener('click', function () {
        if (!isConfigMenuOpen) {
            configuracoesMenu.style.display = 'block';
            isConfigMenuOpen = true;
        } else {
            configuracoesMenu.style.display = 'none';
            isConfigMenuOpen = false;
        }
    });
    // Eventos de clique para cada opção de fonte no dropdown
    fontOptions.forEach(option => {
        option.addEventListener('click', function () {
            const fontFamily = option.textContent;
            changeFontFamily(fontFamily);
            // Fecha o dropdown ao selecionar uma fonte
            fontDropdownMenu.style.display = 'none';
            isFontDropdownOpen = false;
        });
    });

});
