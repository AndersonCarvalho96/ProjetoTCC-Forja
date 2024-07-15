# ProjetoTCC-Forja
 
## Plataforma digital que utiliza da transcrição de fala para texto em tempo real para aprimorar a experiência dos jogadores de RPG (Role Playing Gaming) de mesa
Este repositório contém o código-fonte e a documentação para o Trabalho de Conclusão de Curso (TCC) intitulado "Forja Épica de Aventuras". O sistema foi desenvolvido como parte dos requisitos para obtenção do grau de Tecnólogo em Análise e Desenvolvimento de Sistemas.

## Descrição
O projeto visa facilitar a captura de diálogos, eventos e descrições narrativas em texto digital durante o jogo. Isso não só facilita a documentação e o acompanhamento da história em andamento, mas também torna a sessão acessível para pessoas com deficiência auditiva. 

## Funcionalidades Principais
Transcrição de Fala: Capacidade de gravar e transcrever fala para texto em tempo real.
Cadastro de Usuários: Permite o registro e login de usuários.
Gestão de Fichas: Facilita a criação, edição e visualização de fichas de personagens.
Serviços de RPG: Inclui lançador de dados, gerador de nomes aleatórios e mais.

## Tecnologias Utilizadas
Django: Framework web utilizado para o backend.
SQLite: Banco de dados para armazenamento.
HTML, CSS, JavaScript: Tecnologias para o frontend.

## Construção do Código
Para o desenvolvimento da plataforma "Forja Épica de Aventuras", foi adotado o modelo MTV (Model-Template-View) do framework Django. A escolha deste modelo deve-se à sua eficiência e simplicidade na separação das responsabilidades do código, o que facilita a manutenção e a escalabilidade do projeto.

### Modelo (Model):

Os modelos representam a estrutura dos dados e a lógica de negócios da aplicação. Em Django, os modelos são definidos como classes Python, e cada modelo é mapeado para uma tabela de banco de dados.

### Template (Template):

Os templates são responsáveis pela camada de apresentação da aplicação. Utilizando a linguagem de templates do Django, é possível criar páginas HTML dinâmicas que exibem os dados fornecidos pelas views.

### Visão (View):

As views tratam das requisições HTTP, processam os dados de acordo com a lógica de negócios e retornam as respostas adequadas (normalmente, páginas HTML renderizadas com dados contextuais).

Além do Django, utilizou-se extensivamente o JavaScript para a construção das funcionalidades interativas da plataforma. A funcionalidade principal de transcrição de fala foi implementada no arquivo audio_recorder.js. Este script utiliza APIs modernas para capturar áudio do microfone do usuário, processá-lo e transcrevê-lo em tempo real, proporcionando uma experiência acessível e inclusiva para jogadores de RPG.

## Estrutura de Diretórios do Projeto

Para uma melhor compreensão da organização do código, segue a estrutura de diretórios do projeto "Forja Épica de Aventuras":

projetoForja/

├── app_Forja/

│ ├── templates/

│ ├── forms.py

│ ├── models.py

│ └── views.py

│

├── projetoForja/

│ ├── settings.py

│ └── urls.py

│

├── static/

│ ├── css/

│ ├── imagens/

│ ├── js/

│ │ └── audio_recorder.js

│ ├── pdfs/

│ └── sons/

│

└── db.sqlite3

A raiz do projeto contém os diretórios principais e arquivos de configuração essenciais para o funcionamento da plataforma. Aqui, estão localizados os diretórios que armazenam o código da aplicação, os arquivos estáticos e o banco de dados.

O diretório `app_Forja` contém as funcionalidades específicas da aplicação, como formulários, modelos e views.

- `forms.py`: Define os formulários da aplicação, onde são especificados os campos e a lógica de validação.

- `models.py`: Contém as definições de modelos, que representam a estrutura dos dados e são mapeados para tabelas no banco de dados.

- `views.py`: Contém as views, que processam as requisições HTTP, executam a lógica de negócios e retornam respostas adequadas, geralmente páginas HTML renderizadas com dados contextuais.

O diretório `templates` armazena os templates HTML usados para renderizar as páginas da aplicação. Estes templates utilizam a linguagem de templates do Django para gerar páginas HTML dinâmicas que exibem os dados fornecidos pelas views.

O diretório `projetoForja` é o núcleo do projeto, contendo os principais componentes do framework Django, incluindo configurações de projeto, URLs e arquivos de configuração do ambiente.

O diretório `static` contém arquivos estáticos que são servidos diretamente aos navegadores dos usuários. Estes arquivos incluem folhas de estilo CSS, imagens, scripts JavaScript, PDFs e arquivos de som.

- `css/style.css`: Folha de estilos CSS usada para definir a aparência visual da aplicação.

- `imagens`: Diretório que contém as imagens usadas na aplicação, como ícones e gráficos.

- `js`: Diretório que contém arquivos JavaScript responsáveis pela interatividade da aplicação.

- `pdfs`: Diretório que armazena arquivos PDF usados na aplicação.

- `sons`: Diretório que armazena arquivos de som usados na aplicação.

O `db.sqlite3` é um arquivo de banco de dados SQLite que armazena os dados da aplicação, incluindo informações sobre usuários, sessões de RPG, e outros dados persistentes.



## Código Principal de Transcrição de Fala (audio_recorder.js):

var recognition;
var textoReconhecidoElement;
var lastTranscription = ' ';

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


Este trecho proporciona uma visão geral da estrutura do código, servindo como modelo para outros desenvolvimentos. A escolha do modelo MTV do Django e a utilização de JavaScript para funcionalidades interativas destacam a flexibilidade e a modernidade das tecnologias empregadas.


## Autor
Anderson Moreira Carvalho

## Agradecimentos
Agradeço à minha família, amigos e orientadora por todo o apoio durante este projeto.
