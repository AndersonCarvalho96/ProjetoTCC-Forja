document.addEventListener('DOMContentLoaded', function () {
    // Ações para o botão de upload (desktop)
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

    // Ações para o botão de download (desktop)
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

    // Ações para o botão de upload (mobile)
    const uploadBtnMob = document.getElementById('upload-btnMob');
    const fileInputMob = document.getElementById('fileInputMob');
    const textoReconhecidoMob = document.getElementById('texto-reconhecido');

    if (uploadBtnMob && fileInputMob && textoReconhecidoMob) {
        uploadBtnMob.addEventListener('click', function () {
            fileInputMob.click();
        });

        fileInputMob.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const content = e.target.result;
                    textoReconhecidoMob.value = content;
                };
                reader.readAsText(file);
            }
        });
    }

    // Ações para o botão de download (mobile)
    document.getElementById('download-btnMob').addEventListener('click', function () {
        var downloadBtn = document.getElementById('download-btnMob');
        var dropdown = document.getElementById('formato-dropdownMob');

        // Esconde o botão "Baixar Conteúdo" e exibe o dropdown
        downloadBtn.style.display = 'none';
        dropdown.style.display = 'block';

        // Exibe os botões "Confirmar" e "Fechar"
        document.getElementById('confirmar-btnMob').style.display = 'inline-block';
        document.getElementById('fechar-btnMob').style.display = 'inline-block';
    });

    document.getElementById('fechar-btnMob').addEventListener('click', function () {
        var downloadBtn = document.getElementById('download-btnMob');
        var dropdown = document.getElementById('formato-dropdownMob');

        // Esconde o dropdown e exibe o botão "Baixar Conteúdo"
        dropdown.style.display = 'none';
        downloadBtn.style.display = 'block';

        // Esconde os botões "Confirmar" e "Fechar"
        document.getElementById('confirmar-btnMob').style.display = 'none';
        document.getElementById('fechar-btnMob').style.display = 'none';
    });

    document.getElementById('formato-selectMob').addEventListener('change', function () {
        // Exibe o botão "Confirmar" quando uma opção é selecionada
        document.getElementById('confirmar-btnMob').style.display = 'inline-block';
    });

    document.getElementById('confirmar-btnMob').addEventListener('click', function () {
        var formatoSelecionado = document.getElementById('formato-selectMob').value;
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

    document.getElementById('confirmar-btnMob').addEventListener('click', function () {
        // Oculta o dropdown quando o botão "Confirmar" é clicado
        document.getElementById('formato-dropdownMob').style.display = 'none';
        document.getElementById('download-btnMob').style.display = 'block';
    });
});
