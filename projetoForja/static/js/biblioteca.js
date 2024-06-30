document.addEventListener('DOMContentLoaded', function () {
    // Captura os elementos do DOM
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const searchInput = document.getElementById('searchInput');
    const pdfContainer = document.getElementById('pdfContainer');
    const pdfCards = pdfContainer.querySelectorAll('.pdf-card');
    const dropdownButton = document.getElementById('dropdownMenuButton');

    // Adiciona eventos de clique aos itens do dropdown
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const filter = item.getAttribute('data-filter');
            dropdownButton.innerHTML = item.innerHTML; // Atualiza o ícone e o texto do botão dropdown
            filterPDFs(filter);
        });
    });

    // Adiciona evento de digitação ao campo de pesquisa
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filterPDFs(null, searchTerm);
    });

    // Função para filtrar os PDFs com base no filtro de pesquisa
    function filterPDFs(filter, searchTerm = '') {
        pdfCards.forEach(card => {
            const pdfName = card.querySelector('.pdf-name').textContent.toLowerCase();
            const pdfFilter = card.getAttribute('data-filter');

            const matchesFilter = !filter || filter === 'todos' || pdfFilter === filter;
            const matchesSearch = !searchTerm || pdfName.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
});
