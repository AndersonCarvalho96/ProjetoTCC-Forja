var recognition;
var textoReconhecidoElement;
var lastTranscription = '';

document.addEventListener('DOMContentLoaded', function () {
    var recordButton = document.getElementById('record-button');
    var stopButton = document.getElementById('stop-button');
    textoReconhecidoElement = document.getElementById("texto-reconhecido");

    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = function (event) {
            var result = event.results[event.results.length - 1][0].transcript;
            var isFinal = event.results[event.results.length - 1].isFinal;

            if (isFinal && result !== lastTranscription) {
                if (textoReconhecidoElement) {
                    textoReconhecidoElement.value += result + '\n';
                    sendAudioToBackend(result);
                    lastTranscription = result;
                } else {
                    console.error("Elemento 'texto-reconhecido' não encontrado no DOM.");
                }
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

    recognition.start();
}

function stopRecording() {
    document.getElementById('record-button').disabled = false;
    document.getElementById('record-button').classList.remove('gravando');
    document.getElementById('stop-button').disabled = true;

    if (recognition) {
        recognition.stop();
    }
}

function sendAudioToBackend(audio) {
    var csrfToken = document.getElementById('csrf_token').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/record-and-recognize/', true);
    xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Áudio reconhecido com sucesso!', xhr.responseText);
            } else {
                console.error('Erro ao reconhecer o áudio', xhr.responseText);
            }
        }
    };
    xhr.send(JSON.stringify({ audio: audio }));
}
