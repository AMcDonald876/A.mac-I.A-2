// Highlight active page & Add to Cart

document.addEventListener('DOMContentLoaded', function () {
  // Highlight active page
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Add to Cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      alert(`${name} added to cart!`);
      // In a real app: update cart in localStorage
    });
  });
});