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

closeBox(x, modalCon);
x2.addEventListener('click', () => {
  document.location.href = url;
  modalConEdit.style.display = "none";
});

btnB.addEventListener("click", () => {
  modalCon.style.display = "flex";
});

window.onclick = (event) => {
  if (event.target == modalCon) {
    modalCon.style.display = "none";
  }
}

btnModal.addEventListener("click", () => {
  let myArr = [];
  for (let i = 0; i < inputModals.length; i++) {
    myArr.push(inputModals[i].value);
  }
  const result = toObject(...myArr);
  fetch('http://localhost:5000/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        alert(data.message);
        document.location.href = url;
      } else { alert(data.message); }
    })
    .catch(err => {
      alert(err.message);
      document.location.href = url;
    });
});

window.onload = (e) => {
  e.preventDefault();
  fetch('http://localhost:5000/students')
    .then(res => res.json())
    .then(data => {
      const tBody = document.querySelector(".tbody");
      let container = '';
      const { students } = data.data;
      for (let i = 0; i < students.length; i++) {
        container += tableBody(students[i]);
      }
      tBody.innerHTML = container;
    });
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-actionb") || e.target.classList.contains("bi-trash3")) {
    const id = e.target.getAttribute("data-id");

    if (confirm("yakin? yang bener?")) {
      fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          document.location.href = url;
        })
        .catch(err => console.error(err));
    }
  }
  if(e.target.classList.contains("btn-actiona") || e.target.classList.contains("bi-pen")) {
    const id = e.target.getAttribute("data-id");

    fetch(`http://localhost:5000/students/${id}`)
    .then(res => res.json())
    .then(data => {
      const { student } = data.data;

      modalEdit.insertAdjacentHTML("beforeend", isiEditModal(student));
      const kelas = e.target.getAttribute("data-kelas"); document.querySelector(".kelas-edit").value = kelas;
      const jenis = e.target.getAttribute("data-jenis"); document.querySelector(".jenis-edit").value = jenis;
      modalConEdit.style.display = "flex";

      document.querySelector(".btn-modal-edit").addEventListener("click",() => {
        const inputModalsEdit = document.querySelectorAll(".input-modal-edit");

        let myArr = [];
        for (let i = 0; i < inputModalsEdit.length; i++) {
          myArr.push(inputModalsEdit[i].value);
        }
        const result = toObject(...myArr);

        fetch(`http://localhost:5000/students/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          document.location.href = url;
        })
        .catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));

  }
});