// Cart Page JavaScript – DOM, Events, Logic

document.addEventListener('DOMContentLoaded', function () {
  // Event listener for "Clear All" button
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to clear your entire cart?')) {
        // IA2-Q2a: Clear cart from localStorage
        localStorage.removeItem('cart');
        loadCart(); // Refresh UI
      }
    });
  }

  // Load cart data on page load
  if (document.getElementById('cart-items')) {
    loadCart();
  }
});

// Load cart items and calculate totals
function loadCart() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.getElementById('cart-items');
  
  // IA2-Q2a: Get total elements
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');

  // Clear existing rows
  tbody.innerHTML = '';

  // Handle empty cart
  if (cart.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4" style="text-align:center; color:#aaa; font-style:italic;">Your cart is empty.</td>`;
    tbody.appendChild(row);
    
    // Reset totals
    subtotalEl.textContent = '$0.00';
    taxEl.textContent = '$0.00';
    totalEl.innerHTML = '<strong>$0.00</strong>';
    return;
  }

  // Populate table and calculate subtotal
  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    subtotal += parseFloat(itemTotal);

    //  Create table row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${itemTotal}</td>
    `;
    tbody.appendChild(row);
  });

// IA2-Q2d: Apply 13% tax and calculate total
  const tax = (subtotal * 0.13).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
  // Update DOM with totals
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax}`;
  totalEl.innerHTML = `<strong>$${total}</strong>`;
}

// Add this to the same script.js file (already covered in prior integration)
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