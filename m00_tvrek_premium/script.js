// script.js - small interactions for m00 tvrek
document.addEventListener('DOMContentLoaded', function () {
  console.log('m00 tvrek premium loaded');

  // Simple add-to-cart visual counter
  const cartCount = document.querySelector('.cart-count');
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      let current = parseInt(cartCount.textContent || '0', 10);
      cartCount.textContent = current + 1;
      // small animation
      btn.textContent = '✓ تمت الإضافة';
      setTimeout(() => btn.textContent = 'أضف إلى السلة', 1500);
    });
  });

  // Newsletter form
  const form = document.getElementById('subscribeForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      if (!email) return alert('من فضلك أدخل بريدًا إلكترونيًا صالحًا.');
      alert('شكرًا! تم تسجيل ' + email);
      form.reset();
    });
  }
});
