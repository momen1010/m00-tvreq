شرح مجلد images:
- قمت باستخدام روابط صور مباشرة من Unsplash داخل ملف index.html لعرض صور عالية الجودة.
- إذا حبيت تضع صورك المحلية بدل الروابط، أنشئ مجلد باسم "images" وضع صورك فيه (مثلاً jacket.jpg).
- ثم غيّر مسارات الصور داخل index.html من الروابط إلى: images/jacket.jpg
<!-- منتج جديد -->
<div class="bg-white rounded-2xl shadow hover:shadow-lg p-4">
  <img src="images/new-shirt.jpg" alt="قميص جديد" class="w-full h-64 object-cover rounded-lg">
  <div class="mt-3 font-medium">قميص صيفي جديد</div>
  <div class="text-gray-500 text-sm">599 ج.م</div>
</div>
