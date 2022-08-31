const btn1 = document.querySelector(".btn-detail");
const ket = document.querySelector(".col.ket");

btn1.addEventListener("click", () => {
  ket.innerHTML = "LUNAS";
  setTimeout(() => ket.innerHTML = "", 5000);
});