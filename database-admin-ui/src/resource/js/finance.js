input.addEventListener("focus", function () {
  btnC.classList.add("fokus");
});

input.addEventListener("focusout", function () {
  btnC.classList.remove("fokus");
  inputCon.classList.remove("flex");
  btnA.classList.remove("flex");
});

btnA.addEventListener("click", () => {
  inputCon.classList.add("flex");
  btnA.classList.add("flex");
  input.focus();
});