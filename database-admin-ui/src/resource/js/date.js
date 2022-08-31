const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();


const bulan = ['January', 'February', 'Maret', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];
bulan.forEach(b => {
  // console.log(`${b}, ${year}`)
  document.querySelectorAll(".col.date").forEach(d => {
    d.innerHTML = `${bulan[month]}, ${year}`;
  });
});
