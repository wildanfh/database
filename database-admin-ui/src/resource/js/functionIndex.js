function tableBody(data) {
  return `<tr class="row">
    <td class="col"><p class="p-child id">${data.id}</p></td>
    <td class="col"><p class="p-child">${data.kelas}</p></td>
    <td class="col nama"><p class="p-child">${data.nama}</p></td>
    <td class="col"><p class="p-child">${data.jenisKelamin}</p></td>
    <td class="col"><p class="p-child">${data.tempatLahir}</p></td>
    <td class="col"><p class="p-child">${data.tanggalLahir}</p></td>
    <td class="col"><p class="p-child">${data.sekolahAsal}</p></td>
    <td class="col alamat"><p class="p-child">${data.alamat}</p></td>
    <td class="col"><p class="p-child">${data.noHandphone}</p></td>
    <td class="col"><p class="p-child bta">
      <a href="#" class="btn-action btn-actiona a" data-id=${data.id}><i class="bi bi-pen" data-id=${data.id} data-jenis=${data.jenisKelamin} data-kelas=${data.kelas}></i></a>
      <a href="#" class="btn-action btn-actionb b" data-id=${data.id}><i class="bi bi-trash3" data-id=${data.id}></i></a>
    </p></td>
  </tr>`;
}

function isiEditModal(data) {
  return `<form class="form-modal">
    <label for="nama" class="label-modal">Nama :</label>
    <input type="text" class="input-modal-edit" id="nama" placeholder="Nama Lengkap" required value=${data.nama}>

    <label for="kelas" class="label-modal">Kelas :</label>
    <select name="Kelas" id="kelas" class="input-modal-edit kelas-edit" required>
      <option value="B001" class="option">B001</option>
      <option value="B002" class="option">B002</option>
      <option value="B003" class="option">B003</option>
      <option value="B004" class="option">B004</option>
      <option value="B005" class="option">B005</option>
      <option value="B006" class="option">B006</option>
    </select>

    <label for="jenis_kelamin" class="label-modal">Jenis Kelamin :</label>
    <select name="Jenis Kelamin" id="jenis_kelamin" class="input-modal-edit jenis-edit" required>
      <option value="laki-laki" class="option">Laki-laki</option>
      <option value="perempuan" class="option">Perempuan</option>
    </select>

    <label for="tempat_lahir" class="label-modal">Tempat Lahir :</label>
    <input type="text" class="input-modal-edit" id="tempat_lahir" placeholder="Tempat Lahir" required value=${data.tempatLahir}>

    <label for="tanggal_lahir" class="label-modal">Tanggal Lahir :</label>
    <input type="date" class="input-modal-edit tanggal-edit" id="tanggal_lahir" required value=${data.tanggalLahir}>

    <label for="sekolah_asal" class="label-modal">Sekolah Asal :</label>
    <input type="text" class="input-modal-edit" id="sekolah_asal" placeholder="Sekolah Asal" required value=${data.sekolahAsal}>

    <label for="alamat" class="label-modal">Alamat :</label>
    <input type="text" class="input-modal-edit" id="alamat" placeholder="Alamat" required value=${data.alamat}>

    <label for="no_handphone" class="label-modal">No Handphone :</label>
    <input type="text" class="input-modal-edit" id="no_handphone" placeholder="No Handphone" required value=${data.noHandphone}>
    <p class="btn-modal-edit">Submit</p>
  </form>`;
}

const closeBox = (a, b) => {
  a.addEventListener('click', () => {
    b.style.display = "none";
  });
}

function toObject(a, b, c, d, e, f, g, h) {
  const myObj = {
    id_kelas: b,
    nama: a,
    jenis_kelamin: c,
    tempat_lahir: d,
    tanggal_lahir: e,
    sekolah_asal: f,
    alamat: g,
    no_hp: h,
  };

  return myObj;
}
