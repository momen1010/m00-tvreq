document.addEventListener('DOMContentLoaded', function(){
document.querySelectorAll('.add-cart').forEach(btn=>{
  btn.addEventListener('click', function(){
    const el = document.querySelector('.cart-count');
    el.textContent = parseInt(el.textContent||'0',10)+1;
    btn.textContent = '✓ تمت الإضافة';
    setTimeout(()=> btn.textContent = 'أضف إلى السلة',1200);
  });
});
const form = document.getElementById('subscribeForm');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if(!email) return alert('ادخل بريدًا صالحًا');
    alert('شكرًا! تم تسجيل ' + email);
    form.reset();
  });
}
});