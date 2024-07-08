document.addEventListener('DOMContentLoaded', function () {
    // Captura os elementos do DOM
    const dropdownTogglePrincipal = document.querySelector('#dropdownMenuLinkPrincipal');
    const dropdownMenuPrincipal = document.querySelector('#dropdownMenuPrincipal');
    const dropdownItemsPrincipal = document.querySelectorAll('.dropdown-item-principal');

    // Adiciona evento de clique ao botão de toggle
    dropdownTogglePrincipal.addEventListener('click', function (event) {
        event.preventDefault();
        dropdownMenuPrincipal.classList.toggle('show'); // Alterna a visibilidade do dropdown
        dropdownMenuPrincipal.classList.toggle('hide'); // Alterna a visibilidade do dropdown
    });

    // Adiciona eventos de clique aos itens do dropdown
    dropdownItemsPrincipal.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const href = item.getAttribute('href');
            window.location.href = href; // Redireciona para a página ao clicar no item
        });
    });

    // Fecha o dropdown se o usuário clicar fora dele
    document.addEventListener('click', function (event) {
        if (!dropdownTogglePrincipal.contains(event.target) && !dropdownMenuPrincipal.contains(event.target)) {
            dropdownMenuPrincipal.classList.remove('show');
            dropdownMenuPrincipal.classList.add('hide');
        }
    });
});

