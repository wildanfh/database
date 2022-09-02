const btn1 = document.querySelector(".btn-detail");
const ket = document.querySelector(".col.ket");

// btn1.addEventListener("click", () => {
//   ket.innerHTML = "LUNAS";
//   setTimeout(() => ket.innerHTML = "", 5000);
// });

const dataPerson = document.querySelector(".data-person");
const id = document.location.href.split("=").slice(-1)[0];
fetch(`http://localhost:5000/students/${id}`)
  .then(res => res.json())
  .then(data => {
    let container = '';
    const { student } = data.data;
    container += tableBody(student);
    dataPerson.innerHTML = container;
  })
  .catch(err => console.error(err));

function tableBody(data) {
  return `
  <tr class="row-person"><td class="col">Id Siswa : ${id}</td></tr>
  <tr class="row-person"><td class="col">Nama : ${data.nama}</td></tr>
  <tr class="row-person"><td class="col">Kelas : ${data.kelas}</td></tr>`
}


const tbody = document.querySelector(".tbody");
tbody.innerHTML = financeBody();



function financeBody(data) {
  let i;
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const year = new Date().getFullYear();
  const tgl_bayar = (data) ? data.tgl_bayar : '';
  const jumlah = (data) ? data.jumlah : '';
  let container = '';
  for (i = 0; i < 12; i++) {
    const string = `<tr class="row">
    <td class="col date">${month[i]}, ${year}</td>
    <td class="col">${tgl_bayar}</td>
    <td class="col">${jumlah}</td>
    <td class="col ket"></td>
    <td class="col"><a href="#" class="btn-detail">Bayar</a></td>
  </tr>`;
    container += string;
  }

  return container;
}

const modalCon = document.getElementById("myModal");
const x = document.getElementsByClassName("close")[0];
const btnDetail = document.querySelectorAll(".btn-detail");

window.onclick = (ev) => {
  if (ev.target == modalCon || ev.target == x) {
    modalCon.style.display = "none";
  }

  btnDetail.forEach(b => {
    if (ev.target == b) {
      document.querySelector(".input-modal#id").value = id;
      modalCon.style.display = "flex";
    }
  })

  if (ev.target == document.querySelector(".btn-modal")) {
   let a = document.querySelectorAll(".input-modal");
   const [, tgl, jumlah] = a;
   const data = {
    id: id,
    tgl: tgl.value,
    jumlah: jumlah.value,
   }
    fetch(`http://localhost:5000/finances`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  }
}

