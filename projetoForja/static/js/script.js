
// scripts.js

//botao voltar ao topo
window.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('todasfichas');
    var button = document.getElementById('voltar-ao-topo');

    formulario.addEventListener('scroll', function () {
        if (formulario.scrollTop > 100) {
            button.classList.add('mostrar');
        } else {
            button.classList.remove('mostrar');
        }
    });

    button.addEventListener('click', function () {
        formulario.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

//botao excluir ficha
document.addEventListener('DOMContentLoaded', function () {
    // Adiciona um ouvinte de evento para o botão de confirmação de exclusão
    document.getElementById('confirmDeleteButton').addEventListener('click', function () {
        // Obtém o ID da ficha a ser excluída
        var fichaId = document.getElementById('ficha_id').value;

        // Realiza uma requisição AJAX para excluir a ficha
        fetch(`/ficha/excluir/${fichaId}/`, {
            method: 'GET', // Altera o método para GET
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Obtém o token CSRF do cookie
            },
        })
            .then(response => {
                // Verifica se a resposta da requisição foi bem-sucedida
                if (response.ok) {
                    // Recarrega a página para refletir as alterações
                    location.reload();
                } else {
                    // Exibe uma mensagem de erro
                    console.error('Erro ao excluir a ficha:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Erro ao excluir a ficha:', error);
            });
    });
});

// Função para obter o token CSRF do cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Verifica se o cookie possui o nome procurado
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//botão zoom in
document.getElementById('zoom-in').addEventListener('click', function () {
    var chatContainer = document.getElementById('chat-container');
    var currentSize = parseInt(window.getComputedStyle(chatContainer).fontSize);
    chatContainer.style.fontSize = (currentSize + 1) + 'px';
});
//botão zoom out
document.getElementById('zoom-out').addEventListener('click', function () {
    var chatContainer = document.getElementById('chat-container');
    var currentSize = parseInt(window.getComputedStyle(chatContainer).fontSize);
    chatContainer.style.fontSize = (currentSize - 1) + 'px';
});

//legenda dos botões
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});


document.addEventListener('DOMContentLoaded', function () {
    // Ações para o botão de upload
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('fileInput');
    const textoReconhecido = document.getElementById('texto-reconhecido');

    if (uploadBtn && fileInput && textoReconhecido) {
        uploadBtn.addEventListener('click', function () {
            fileInput.click();
        });

        fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const content = e.target.result;
                    textoReconhecido.value = content;
                };
                reader.readAsText(file);
            }
        });
    }
});
// Ações para o botão de download
document.getElementById('download-btn').addEventListener('click', function () {
    var downloadBtn = document.getElementById('download-btn');
    var dropdown = document.getElementById('formato-dropdown');

    // Esconde o botão "Baixar Conteúdo" e exibe o dropdown
    downloadBtn.style.display = 'none';
    dropdown.style.display = 'block';

    // Exibe os botões "Confirmar" e "Fechar"
    document.getElementById('confirmar-btn').style.display = 'inline-block';
    document.getElementById('fechar-btn').style.display = 'inline-block';
});

document.getElementById('fechar-btn').addEventListener('click', function () {
    var downloadBtn = document.getElementById('download-btn');
    var dropdown = document.getElementById('formato-dropdown');

    // Esconde o dropdown e exibe o botão "Baixar Conteúdo"
    dropdown.style.display = 'none';
    downloadBtn.style.display = 'block';

    // Esconde os botões "Confirmar" e "Fechar"
    document.getElementById('confirmar-btn').style.display = 'none';
    document.getElementById('fechar-btn').style.display = 'none';
});

document.getElementById('formato-select').addEventListener('change', function () {
    // Exibe o botão "Confirmar" quando uma opção é selecionada
    document.getElementById('confirmar-btn').style.display = 'inline-block';
});

document.getElementById('confirmar-btn').addEventListener('click', function () {
    var formatoSelecionado = document.getElementById('formato-select').value;
    var chatContent = document.getElementById('texto-reconhecido').value;

    if (formatoSelecionado === 'txt') {
        // Cria um arquivo de texto
        var blob = new Blob([chatContent], { type: 'text/plain' });
        var filename = 'Forja Épica.txt';
        downloadBlob(blob, filename);
    } else if (formatoSelecionado === 'pdf') {
        // Cria um arquivo PDF
        criarPDF(chatContent);
    }
});

function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
window.jsPDF = window.jspdf.jsPDF;
function criarPDF(chatContent) {
    var doc = new jsPDF();
    doc.text(chatContent, 10, 10);
    var pdfBlob = doc.output('blob');
    var filename = 'Forja Épica.pdf';
    downloadBlob(pdfBlob, filename);
}
document.getElementById('confirmar-btn').addEventListener('click', function () {
    // Oculta o dropdown quando o botão "Confirmar" é clicado
    document.getElementById('formato-dropdown').style.display = 'none';
    document.getElementById('download-btn').style.display = 'block';
});


//Carregar ficha
function carregarFicha(id) {
    fetch(`/ficha/${id}/`)
        .then(response => response.json())
        .then(data => preencherFormulario(data))
        .catch(error => console.error('Erro ao carregar a ficha:', error));
}

function preencherFormulario(data) {
    try {
        document.getElementById('ficha_id').value = data.id || '';
        document.getElementById('nivel').value = data.nivel || '';
        document.getElementById('nome').value = data.nome || '';
        document.getElementById('classe').value = data.classe || '';
        document.getElementById('antecedente').value = data.antecedente || '';
        document.getElementById('jogador').value = data.jogador || '';
        document.getElementById('raca').value = data.raca || '';
        document.getElementById('alinhamento').value = data.alinhamento || '';
        document.getElementById('experiencia').value = data.experiencia || '';
        document.getElementById('forca').value = data.forca || '';
        document.getElementById('destreza').value = data.destreza || '';
        document.getElementById('constituicao').value = data.constituicao || '';
        document.getElementById('inteligencia').value = data.inteligencia || '';
        document.getElementById('sabedoria').value = data.sabedoria || '';
        document.getElementById('carisma').value = data.carisma || '';
        document.getElementById('inspiracao').value = data.inspiracao || '';
        document.getElementById('bonus_prof').value = data.bonus_prof || '';
        document.getElementById('salvaguardas').value = data.salvaguardas || '';
        document.getElementById('pericias').value = data.pericias || '';
        document.getElementById('sabedoria_passiva').value = data.sabedoria_passiva || '';
        document.getElementById('outras').value = data.outras || '';
        document.getElementById('ca').value = data.ca || '';
        document.getElementById('iniciativa').value = data.iniciativa || '';
        document.getElementById('deslocamento').value = data.deslocamento || '';
        document.getElementById('hp_max').value = data.hp_max || '';
        document.getElementById('hp').value = data.hp || '';
        document.getElementById('hp_temp').value = data.hp_temp || '';
        document.getElementById('dado_vida').value = data.dado_vida || '';
        // Atualizar os checkboxes de sucesso
        document.getElementById('sucesso1').checked = data.sucessos >= 1;
        document.getElementById('sucesso2').checked = data.sucessos >= 2;
        document.getElementById('sucesso3').checked = data.sucessos >= 3;

        // Atualizar os checkboxes de falha
        document.getElementById('falha1').checked = data.falhas >= 1;
        document.getElementById('falha2').checked = data.falhas >= 2;
        document.getElementById('falha3').checked = data.falhas >= 3;

        // Definir os campos ocultos com base nos dados de sucesso e falha
        document.getElementById('sucessos').value = data.sucessos || 0;
        document.getElementById('falhas').value = data.falhas || 0;

        document.getElementById('ataques_magias').value = data.ataques_magias || '';
        document.getElementById('historia').value = data.historia || '';
        document.getElementById('equipamento').value = data.equipamento || '';
        document.getElementById('tracos_personalidade').value = data.tracos_personalidade || '';
        document.getElementById('ideais').value = data.ideais || '';
        document.getElementById('vinculos').value = data.vinculos || '';
        document.getElementById('fraquezas').value = data.fraquezas || '';
        document.getElementById('caracteristicas_talentos').value = data.caracteristicas_talentos || '';
        document.getElementById('idade').value = data.idade || '';
        document.getElementById('altura').value = data.altura || '';
        document.getElementById('peso').value = data.peso || '';
        document.getElementById('olhos').value = data.olhos || '';
        document.getElementById('pele').value = data.pele || '';
        document.getElementById('cabelo').value = data.cabelo || '';
        document.getElementById('ali_org').value = data.ali_org || '';
        document.getElementById('caracteristicas_adc').value = data.caracteristicas_adc || '';
        document.getElementById('tesouro').value = data.tesouro || '';
        document.getElementById('classe_conjuradora').value = data.classe_conjuradora || '';
        document.getElementById('atrib_conjura').value = data.atrib_conjura || '';
        document.getElementById('cd_miss').value = data.cd_miss || '';
        document.getElementById('modificador_am').value = data.modificador_am || '';
        document.getElementById('truques').value = data.truques || '';
        document.getElementById('email').value = data.email || '';

    } catch (error) {
        console.error('Erro ao preencher o formulário:', error);
    }
}


//salvaguardas vs morte
function marcarSucesso() {
    let sucessos = 0;
    if (document.getElementById('sucesso1').checked) sucessos++;
    if (document.getElementById('sucesso2').checked) sucessos++;
    if (document.getElementById('sucesso3').checked) sucessos++;
    document.getElementById('sucessos').value = sucessos;
}

function marcarFalha() {
    let falhas = 0;
    if (document.getElementById('falha1').checked) falhas++;
    if (document.getElementById('falha2').checked) falhas++;
    if (document.getElementById('falha3').checked) falhas++;
    document.getElementById('falhas').value = falhas;
}

