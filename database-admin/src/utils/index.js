const mapDBToModel = ({
  id_siswa,
  id_kelas,
  nama,
  jenis_kelamin,
  tempat_lahir,
  tanggal_lahir,
  sekolah_asal,
  alamat,
  no_hp, }) => ({
    id: id_siswa,
    kelas: id_kelas,
    nama,
    jenisKelamin: jenis_kelamin,
    tempatLahir: tempat_lahir,
    tanggalLahir: tanggal_lahir,
    sekolahAsal: sekolah_asal,
    alamat,
    noHandphone: parseInt(no_hp),
  });

module.exports = { mapDBToModel };