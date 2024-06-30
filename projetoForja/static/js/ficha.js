//--------------------Ficha de Personagem ---------------------
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
//botao voltar ao topo
(function () {
    // Adiciona um event listener para o scroll
    window.addEventListener('DOMContentLoaded', function () {
        var formulario = document.getElementById('todasfichas');
        var button = document.getElementById('voltar-ao-topo');

        if (formulario && button) {
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
        }
    });
})();

//Botao mobile para o fim da pagina
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOM Funcionou!');
        const scrollToBottomButton = document.getElementById('scrollToBottomButton');
        scrollToBottomButton.addEventListener('click', function () {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth' // Adiciona um efeito de rolagem suave
            });
        });
    });
})();

//Botao excluir ficha
// Adiciona um event listener para o botão de confirmação de exclusão de ficha
document.addEventListener('DOMContentLoaded', function () {
    var confirmDeleteButton = document.getElementById('confirmDeleteButton');
    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', function () {
            var fichaId = document.getElementById('ficha_id').value;
            if (fichaId) {
                // Realiza uma requisição AJAX para excluir a ficha
                fetch(`/ficha/excluir/${fichaId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
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
            }
        });
    }
});


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



//Gerador de nomes
document.addEventListener('DOMContentLoaded', function () {

    const nomes = {
        'Anão': {
            'Masculinos': [
                "Thorin", "Gimli", "Durin", "Balin", "Dwalin",
                "Razzleflame Sparkling Wisdom", "Stonebeard Ironforge", "Steelhammer Battleborn", "Fireforge Mountainheart",
                "Goldendust Ironbeard", "Adrik", "Alberich", "Baern", "Barendd", "Brottor", "Dain", "Darrak", "Delg", "Eberk",
                "Einkil", "Fargrim", "Flint", "Gardain", "Harbek", "Kildrak", "Morgran", "Orsik", "Oskar", "Rangrim", "Rurik",
                "Taklinn", "Thoradin", "Thrain", "Tordek", "Traubon"
            ],
            'Femininos': [
                "Artin", "Audhild", "Bardryn", "Dagnal", "Diesa", "Eldeth", "Falkrunn", "Finellen", "Gunnloda", "Gurdren", "Helja",
                "Hlin", "Kathra", "Kristryd", "Ilde", "Liftrasa", "Mardred", "Riswynn", "Sannl", "Torbera", "Torgga", "Vistra", "Elda",
                "Runa", "Estrid"
            ],
        },
        'Elfo': {
            'Masculinos': [
                "Legolas", "Thranduil", "Galadriel", "Arwen", "Celeborn", "Silverleaf Starlight Serenade",
                "Moonshadow Whispering Wind", "Sunfire Dawnblade", "Starglow Forestsong", "Eveningstar Evergreen",
                "Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan",
                "Galinndan", "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren",
                "Quarion", "Riardon", "Rolen", "Soveliss"
            ],
            'Femininos': [
                "Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna",
                "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna",
                "Sariel", "Shanairra", "Shava", "Silaqui", "Thia"
            ],
        },
        'Humano': {
            'Masculinos': [
                "Aelar", "Ander", "Benn", "Daren", "Darvin", "Brightblade Stormlight", "Stormrage Swiftwind", "Dawnseeker Daybreak",
                "Silvermoon Sunstrike", "Ravenclaw Nightfall", "Hal", "Hans", "Ivan", "Jarett", "Kevan", "Lyle", "Merric",
                "Norrin", "Orin", "Pavel", "Quinn", "Rickard"
            ],
            'Femininos': [
                "Aia", "Alys", "Betha", "Catelyn", "Darla", "Eliza", "Fiona", "Gwen", "Haleth", "Jess", "Kara", "Keira", "Lara",
                "Miri", "Nara", "Olivia", "Paela", "Rina", "Sara", "Tessa", "Una", "Vasha", "Willa", "Yara",
                "Zara"
            ],
        },
        'Halfling': {
            'Masculinos': [
                "Alton", "Ander", "Cade", "Callus", "Corrin", "Lightfoot Swiftstride", "Greenleaf Merrysong",
                "Brandybuck Hilltopper", "Took Morningdew", "Underhill Thistledown", "Davin", "Dell", "Hargen", "Jebeddo",
                "Milo", "Osborn", "Perrin", "Reed", "Roscoe", "Wellby"
            ],
            'Femininos': [
                "Andry", "Bree", "Callie", "Cora", "Euphemia", "Jillian", "Kithri", "Lavinia", "Lidda", "Merla",
                "Nedda", "Paela", "Portia", "Seraphina", "Shaena", "Trym", "Vani", "Verna", "Fenna", "Bella", "Tyna",
                "Sybil", "Laila", "Rana", "Keira"
            ],
        },
        'Draconato': {
            'Masculinos': [
                "Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh",
                "Edward Flameheart", "Lucas Bronzeclaw", "Gabriel Frostwing", "Matthew Mountainbane", "Andrew Silvermoon",
                "Mehen", "Nadarr", "Pandjed", "Patrin", "Rhogar", "Astaroth", "Charizard", "Draxxus", "Emberclaw", "Frostfire",
                "Gorefang", "Ignatius", "Kazrogal", "Moltres", "Ragestorm",
                "Scorchwing", "Thornax", "Vermithrax", "Vulcan", "Zephyros",
            ],
            'Femininos': [
                "Akra", "Biri", "Daar", "Farideh", "Harann",
                "Havilar", "Jheri", "Kava", "Korinn", "Mishann",
                "Nala", "Perra", "Raiann", "Sora", "Surina", "Thava", "Uadjit", "Vezera",
                "Asharra", "Blazewind", "Cinderflame", "Emberglow", "Frostbite",
                "Infernia", "Lavalash", "Moltenheart", "Pyra", "Seara",
                "Stormclaw", "Tiamat", "Valkyrie", "Vermilion", "Volcania",
            ],
        },
        'Gnomo': {
            'Masculinos': [
                "Alston", "Alvyn", "Boddynock", "Brocc", "Burgell",
                "James Brightspark", "Robert Glitterflame", "John Sparklefire", "Charles Radiantglow", "Matthew Shimmerflare",
                "Dimble", "Eldon", "Fonkin", "Frug", "Gerbo",
                "Fizzlebang", "Glimmerglint", "Razzlewhiz", "Wizzlefizz", "Blinkbonk",
                "Fizzlespark", "Gimblewidget", "Jinglewhistle", "Nimblefingers", "Sprocketgear",
                "Tinkertop", "Whizbang", "Zigzaggle", "Bopbop", "Dazzlegleam",
                "Fidgetspinner", "Gadgetspark", "Jazzlejolt", "Nogglewrench", "Paddlepop",
            ],
            'Femininos': [
                "Bimpnottin", "Breena", "Caramip", "Carlin", "Donella", "Duvamil", "Ella", "Ellyjobell", "Ellywick", "Lilli",
                "Loopmottin", "Lorilla", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn", "Shamil", "Tana", "Waywocket",
                "Zanna", "Drusil", "Fennel", "Quinella", "Fizzleglimmer", "Glimmerdazzle", "Jinglefizzle", "Paddlepop", "Wizzlefizz",
                "Blinkieboop", "Dazzlewhiz", "Fiddlefaddle", "Jazzlespark", "Nibbletwist", "Paddlewaggle", "Sizzlepop",
                "Twinkletoes", "Whizzlebang", "Zapzippity", "Babblewobble", "Dingleberry", "Fiddlesticks", "Jigglyj"
            ],
        },
        'Meio-Elfo': {
            'Masculinos': [
                "Arannis", "Berrian", "Carric", "Dayereth", "Enialis", "Jameson Starwood", "Roberton Silvermoon",
                "Johnathon Sunblade", "Charleson Moonshadow", "Mattheon Evenstar", "Alaric", "Arvad", "Brander", "Caelan", "Darrion",
                "Eldar", "Faelar", "Galar", "Halvar", "Ithric", "Kaelen", "Lethar", "Marvan", "Neldor", "Othar",
                "Raelan", "Silvar", "Thrandor", "Ulric", "Valadan"
            ],
            'Femininos': [
                "Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua",
                "Bethrynna", "Caelynn", "Drusilia", "Enna", "Felosial",
                "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Sariel",
                "Shanairra", "Shava", "Silaqui", "Thia", "Vadania",
                "Alaria", "Aravara", "Brialla", "Caeris", "Doria",
                "Elenia", "Faelara", "Gwynneth", "Hylia", "Ilaria",
                "Kaelith", "Lyaria", "Mira", "Nimue", "Oria",
                "Rivara", "Saradia", "Talara", "Valira", "Ylara"
            ],
        },
        'Meio-Orc': {
            'Masculinos': [
                "Dench", "Feng", "Gell", "Henk", "Holg",
                "Gorak Battlefury", "Drog Ironhide", "Grul Rockcrusher", "Throk Bonecrusher", "Morg Fleshripper",
                "Gharzuk", "Thrazg", "Durgok", "Gornak", "Grash", "Ugol",
                "Kruk", "Borog", "Hrogar", "Thokk", "Razgul", "Throg",
                "Garash", "Drogan", "Drarok", "Vrag", "Gorak", "Narbul",
                "Rugul", "Mogul", "Snagul", "Zarg", "Grom"
            ],
            'Femininos': [
                "Baggi", "Emen", "Harg", "Lug", "Neega",
                "Ohr", "Rog", "Ronk", "Sreg", "Tug", "Turk", "Zark", "Drubag", "Hurgul", "Snagga", "Drogga", "Thogga", "Mozgul",
                "Gruna", "Lugha", "Shogga", "Brogga", "Razga", "Dushka",
                "Zorga", "Krulga", "Ghulga", "Mazga", "Ghoga", "Gragga",
                "Grogga", "Shugha", "Skagra", "Thurka", "Lugda"
            ],
        },
        'Tiefling': {
            'Masculinos': [
                "Mephistopheles", "Asmodeus", "Baalzebul", "Levistus", "Mammon",
                "Damien Hellfire", "Lucifer Brimstone", "Azazel Shadowflame", "Lilith Nightshade", "Baphomet Infernus",
                "Azazel", "Mephisto", "Malphas", "Belial", "Beelzebub",
                "Abaddon", "Lucifer", "Asmodeus", "Diablo", "Balor",
                "Naberius", "Bael", "Leviathan", "Andras", "Amon",
                "Barbatos", "Bathin", "Furfur", "Geryon", "Naphula"
            ],
            'Femininos': [
                "Farideh", "Havilar", "Hennah", "Kallista", "Rakshasa",
                "Raiann", "Sora", "Surina", "Thava", "Uadjit", "Vezera", "Lilith", "Succubus", "Banshee", "Morrigan", "Salamandra",
                "Jezebeth", "Serpentina", "Lamia", "Medusa", "Morana",
                "Nebiros", "Nyssa", "Rahab", "Succor", "Taranis",
                "Valkyrie", "Vasilisa", "Vetala", "Vritra", "Xaphan"
            ],
            //Total de 517 nomes
        },
    };

    function gerarNome() {
        const race = document.getElementById('race').value;
        const gender = document.getElementById('gender').value;
        let listaNomes;

        if (gender === 'Masculino' || gender === 'Feminino') {
            listaNomes = nomes[race][`${gender}s`];
        } else {
            const nomesMasculinos = nomes[race]['Masculinos'];
            const nomesFemininos = nomes[race]['Femininos'];

            // Verificar se os nomes masculinos e femininos estão definidos
            if (nomesMasculinos && nomesFemininos) {
                listaNomes = nomesMasculinos.concat(nomesFemininos);
            } else {
                console.error('Nomes masculinos ou femininos não estão definidos.');
                return;
            }
        }

        const nomeGerado = getRandomName(listaNomes);
        document.querySelector('#modal-gerador #resultado').innerText = nomeGerado;
        document.querySelector('#gerador-nomes #resultado').innerText = nomeGerado;

        if (nomeGerado !== '') {
            document.querySelector('#modal-gerador #selecionarNome').style.display = 'block';
            document.querySelector('#gerador-nomes #selecionarNome').style.display = 'block';
        } else {
            document.querySelector('#modal-gerador #selecionarNome').style.display = 'none';
            document.querySelector('#gerador-nomes #selecionarNome').style.display = 'none';
        }
    }

    function getRandomName(lista) {
        // Verificar se a lista de nomes está definida e não vazia
        if (lista && lista.length > 0) {
            return lista[Math.floor(Math.random() * lista.length)];
        } else {
            console.error('Lista de nomes vazia ou indefinida.');
            return 'Nome não disponível';
        }
    }

    document.querySelector('#modal-gerador #gerarNome').addEventListener('click', gerarNome);
    document.querySelector('#gerador-nomes #gerarNome').addEventListener('click', gerarNome);

    document.querySelector('#modal-gerador #selecionarNome').addEventListener('click', function () {
        const nomeGerado = document.querySelector('#modal-gerador #resultado').innerText;
        document.getElementById('nome').value = nomeGerado;
        document.getElementById('modal-gerador').style.display = 'none';
    });
    document.querySelector('#gerador-nomes #selecionarNome').addEventListener('click', function () {
        const nomeGerado = document.querySelector('#gerador-nomes #resultado').innerText;
        document.getElementById('nome').value = nomeGerado;
    });

    // Código para abrir e fechar o modal
    const abrirModal = document.getElementById('abrirModal');
    const modal = document.getElementById('modal-gerador');
    const fechar = document.querySelector('#modal-gerador .fechar');

    abrirModal.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    fechar.addEventListener('click', function () {
        modal.style.display = 'none';
    });
});

document.getElementById('selecionarNome').addEventListener('click', function () {
    const nomeGerado = document.getElementById('resultado').innerText;
    document.getElementById('nome').value = nomeGerado.replace('Nome gerado: ', '');
});
