
document.addEventListener('DOMContentLoaded', (event) => {
    var zoomInButton = document.getElementById('zoom-in');
    var zoomOutButton = document.getElementById('zoom-out');

    if (zoomInButton) {
        zoomInButton.addEventListener('click', function () {
            var chatBox = document.querySelector('.chat-box');
            if (chatBox) {
                var currentSize = parseInt(window.getComputedStyle(chatBox).fontSize);
                chatBox.style.fontSize = (currentSize + 1) + 'px';
            }
        });
    }

    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', function () {
            var chatBox = document.querySelector('.chat-box');
            if (chatBox) {
                var currentSize = parseInt(window.getComputedStyle(chatBox).fontSize);
                chatBox.style.fontSize = (currentSize - 1) + 'px';
            }
        });
    }
});

