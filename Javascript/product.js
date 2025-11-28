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
    });
  });
  // IA2-Q2a, IA2-Q2b, IA2-Q2d: Shared Cart Logic – Products ↔ Cart

// ================
// ADD TO CART (Products Page)
// ================
document.addEventListener('DOMContentLoaded', function () {
  // Handle "Add to Cart" clicks on Products page
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));

      if (!name || isNaN(price)) {
        alert('Product data is missing.');
        return;
      }

      // IA2-Q2d: Get or create cart in localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // IA2-Q2d: Check if item already exists
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));

      // IA2-Q2c: DOM feedback
      alert(`${name} added to cart!`);
    });
  });

  // ================
  // LOAD CART (Cart Page)
  // ================
  if (document.getElementById('cart-items')) {
    loadCart();
  }

  // ================
  // CLEAR CART (Cart Page)
  // ================
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (confirm('Clear your entire cart?')) {
        localStorage.removeItem('cart');
        loadCart(); // Refresh UI
      }
    });
  }
});

// Function to display cart items + calculate totals
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');

  // Clear table
  tbody.innerHTML = '';

  // Handle empty cart
  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Your cart is empty.</td></tr>`;
    subtotalEl.textContent = '$0.00';
    taxEl.textContent = '$0.00';
    totalEl.innerHTML = '<strong>$0.00</strong>';
    return;
  }

  // Populate table + calculate subtotal
  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    subtotal += parseFloat(itemTotal);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${itemTotal}</td>
    `;
    tbody.appendChild(row);
  });

  // Update DOM
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax}`;
  totalEl.innerHTML = `<strong>$${total}</strong>`;
}
});

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', function () {
    const name = this.getAttribute('data-name');
    const price = parseFloat(this.getAttribute('data-price'));
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === name);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});