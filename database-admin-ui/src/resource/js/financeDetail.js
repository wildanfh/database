const btn1 = document.querySelector(".btn-detail");
const ket = document.querySelector(".col.ket");

// btn1.addEventListener("click", () => {
//   ket.innerHTML = "LUNAS";
//   setTimeout(() => ket.innerHTML = "", 5000);
// });

function toFormatted(month) {
  const arr = month.split("-");
  const mon = arr[arr.length - 1];
  const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formatted = `${mL[mon - 1]}, ${arr[0]}`;
  return formatted;
}

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
fetch(`http://localhost:5000/finances/${id}`)
  .then(res => res.json())
  .then(data => {
    const { finance } = data.data;
    let container = '';
    for (i = 0; i < finance.length; i++) {
        container += financeBody(finance[i]);
    }
    tbody.innerHTML = container;
  })
  .catch(err => console.error(err))

  function lunasGak(duit) {
    let text, kelas;
    if (duit >= 500.000) {
       kelas = 'ket';
       text = 'LUNAS';
    } else {
      kelas = 'kur';
      let kurang = 500.000 - duit;
      text = `BELUM LUNAS, KURANG ${kurang} RIBU`;
    }
    return [kelas, text];
  }


function financeBody(data) {
  let func = lunasGak(data.jumlah);
  return `<tr class="row">
    <td class="col date col_bulan">${data.bulan}</td>
    <td class="col col_tgl">${data.tgl_bayar}</td>
    <td class="col col_jumlah">${data.jumlah}</td>
    <td class="col ${func[0]} col_ket">${func[1]}</td>
  </tr>`;
}

const modalCon = document.getElementById("myModal");
const x = document.getElementsByClassName("close")[0];

window.onclick = (ev) => {
  if (ev.target == modalCon || ev.target == x) {
    modalCon.style.display = "none";
  }
  const btnDetail = document.querySelectorAll(".btn-detail");
  btnDetail.forEach(b => {
    if (ev.target == b) {
      document.querySelector(".input-modal#id").value = id;
      modalCon.style.display = "flex";
    }
  });

  if (ev.target == document.querySelector(".btn-modal")) {
    let a = document.querySelectorAll(".input-modal");
    const [bulan, , tgl, jumlah] = a;
    console.log(toFormatted(bulan.value));
    const data = {
      bulan: toFormatted(bulan.value),
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

