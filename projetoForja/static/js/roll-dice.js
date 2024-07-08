function rollDice(sides) {
    const overlay = document.getElementById('dice-result-overlay');
    const diceAnimation = document.getElementById('dice-animation');
    const resultNumber = document.getElementById('result-number');
    const chatBox = document.getElementById('texto-reconhecido');
    const diceSound = document.getElementById('dice-sound'); // Elemento de áudio

    // Exibir overlay
    overlay.style.display = 'flex';

    // Exibir dado girando
    diceAnimation.innerHTML = '<i class="fa-solid fa-dice-d20 fa-spin-pulse" style="color:red"></i>';

    // Reproduzir som de rolagem de dados
    diceSound.currentTime = 0; // Reiniciar o áudio se já estiver em reprodução
    diceSound.play();

    // Simular tempo de rolagem
    setTimeout(() => {
        const result = Math.floor(Math.random() * sides) + 1;

        // Esconder dado e exibir número
        diceAnimation.innerHTML = ''; // Remover dado
        resultNumber.innerText = result; // Exibir número

        // Esconder número após 2 segundos
        setTimeout(() => {
            overlay.style.display = 'none';
            resultNumber.innerText = ''; // Remover número

            // Adicionar o resultado à caixa de texto
            chatBox.value += '\nResultado D' + sides + ': ' + result + '\n';
        }, 2000); // Duração da exibição do número
    }, 1000); // Duração da animação do dado
}
