function menuShow() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    
    
    if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenuButton.classList.remove('active');
    } else {
        mobileMenu.classList.add('open');
        mobileMenuButton.classList.add('active');
    }
}
