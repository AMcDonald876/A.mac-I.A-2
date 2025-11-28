function calculateCheckoutTotals() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  // Sum (price × quantity) for each item
  cart.forEach(item => {
    if (typeof item.price === 'number' && typeof item.quantity === 'number') {
      subtotal += item.price * item.quantity;
    }
  });

  //  Apply 13% tax
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  // Update summary table
  const subtotalEl = document.getElementById('checkout-subtotal');
  const taxEl = document.getElementById('checkout-tax');
  const totalEl = document.getElementById('checkout-total');
  const paymentEl = document.getElementById('payment'); // readonly field

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (totalEl) totalEl.innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
  if (paymentEl) paymentEl.value = total.toFixed(2); // auto-fill amount to pay
}

function loadCheckoutItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.getElementById('checkout-items');

  if (!tbody) return;

  tbody.innerHTML = '';

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#aaa;">Your cart is empty.</td></tr>`;
    calculateCheckoutTotals();
    return;
  }

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  calculateCheckoutTotals();
}

document.addEventListener('DOMContentLoaded', function () {
  // Load cart summary
  loadCheckoutItems();

  // I Handle "Confirm Order" form submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validate shipping fields
      const fullName = document.getElementById('full-name')?.value.trim();
      const address = document.getElementById('address')?.value.trim();

      if (!fullName) {
        alert('Full Name is required.');
        return;
      }
      if (!address) {
        alert('Shipping Address is required.');
        return;
      }

      // Success message + redirect
      alert(`✅ Order Confirmed!\nThank you, ${fullName}!\nYour items will be shipped to:\n${address}`);
      localStorage.removeItem('cart'); // Clear cart
      window.location.href = 'index.html';
    });
  }

  // Handle "Cancel" button
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      if (confirm('Cancel this order?')) {
        window.location.href = 'cart.html';
      }
    });
  }
});