const nav = document.querySelector(".nav");
nav.innerHTML = `<button class="hamburger">
<span></span>
<span></span>
<span></span>
</button>

<ul class="nav-ul">
<a href="#" class="nav-link act">
  <i class="bi bi-house"></i>
  <p class="">Beranda</p>
</a>
<a href="#" class="nav-link">
  <i class="bi bi-person-check"></i>
  <p>Data Siswa</p>
</a>
<a href="#" class="nav-link">
  <i class="bi bi-folder2-open"></i>
  <p>Arsip</p>
</a>
<a href="#" class="nav-link">
  <i class="bi bi-wallet"></i>
  <p>Keuangan</p>
</a>
</ul>`