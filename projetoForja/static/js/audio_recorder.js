var recognition;
var textoReconhecidoElement;
var lastTranscription = '';

document.addEventListener('DOMContentLoaded', function () {
    textoReconhecidoElement = document.getElementById("texto-reconhecido");

    const recordButton = document.getElementById('record-button');
    const stopButton = document.getElementById('stop-button');
    const recordButtonMob = document.getElementById('record-buttonMob');
    const stopButtonMob = document.getElementById('stop-buttonMob');

    if (recordButton && stopButton) {
        recordButton.addEventListener('click', startRecording);
        stopButton.addEventListener('click', stopRecording);
    }

    if (recordButtonMob && stopButtonMob) {
        recordButtonMob.addEventListener('click', startRecordingMob);
        stopButtonMob.addEventListener('click', stopRecordingMob);
    }

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = function (event) {
            const result = event.results[event.results.length - 1][0].transcript;
            const isFinal = event.results[event.results.length - 1].isFinal;

            if (isFinal && result !== lastTranscription) {
                textoReconhecidoElement.value += result + '\n';
                lastTranscription = result;
            }
        };

        recognition.onerror = function (event) {
            console.error('Erro durante a gravação:', event.error);
        };
    } else {
        alert('Seu navegador não suporta a API de Reconhecimento de Fala do Web Speech.');
    }
});

function startRecording() {
    document.getElementById('record-button').disabled = true;
    document.getElementById('record-button').classList.add('gravando');
    document.getElementById('stop-button').disabled = false;

    if (recognition) {
        recognition.start();
    }
}

function stopRecording() {
    document.getElementById('record-button').disabled = false;
    document.getElementById('record-button').classList.remove('gravando');
    document.getElementById('stop-button').disabled = true;

    if (recognition) {
        recognition.stop();
    }
}

function startRecordingMob() {
    document.getElementById('record-buttonMob').disabled = true;
    document.getElementById('record-buttonMob').classList.add('gravando');
    document.getElementById('stop-buttonMob').disabled = false;

    if (recognition) {
        recognition.start();
    }
}

function stopRecordingMob() {
    document.getElementById('record-buttonMob').disabled = false;
    document.getElementById('record-buttonMob').classList.remove('gravando');
    document.getElementById('stop-buttonMob').disabled = true;

    if (recognition) {
        recognition.stop();
    }
}
