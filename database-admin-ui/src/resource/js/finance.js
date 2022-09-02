const input = document.querySelector(".input");
const inputCon = document.querySelector(".input-container");
const btnC = document.querySelector(".btn-header.c");
const btnA = document.querySelector(".btn-header.aa");


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

const request = async (url, ...body) => {
  const response = (body.length > 1) ? await fetch(url, {
    method: body[0],
    headers: {
      'Content-Type': 'application/json'
    },
    body: body[1],
  }) : await fetch(url);
  const json = await response.json();
  return json;
}

const getFinance = async (url) => {
  try {
    const result = await request(url);
    const tBody = document.querySelector(".tbody");
    let container = '';
    const { students } = result.data;
    for (let i = 0; i < students.length; i++) {
      container += tableBody(students[i]);
    }
    tBody.innerHTML = container;
  } catch (err) {
    console.log(err);
  }
}

getFinance("http://localhost:5000/students");
function tableBody(data) {
  return `<tr class="row">
  <td class="col">${data.id}</td>
  <td class="col">${data.nama}</td>
  <td class="col">${data.kelas}</td>
  <td class="col">3.000.000</td>
  <td class="col kurang">-3.000.000</td>
  <td class="col"><a href="financeDetail.html?id=${data.id}" class="btn-detail">Detail</a></td>
</tr>`;
}
