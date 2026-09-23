//bedah data JSON array dari object

// array
const nilai = [100,20,80];

//destructuring array = membedah data array 
const nilai2 = nilai[1]; // ambil data ke 2, brrti index 1
console.log('Nilai ke 2 dari array: ${nilai2}');

//spread array = nambah / 
const nilai_new = [99];
const array_nilai_tambah = [...nilai_new, nilai];// ini mw menambahkan 
const tambah_dibelakang = [nilai, ...nilai_new];

console.log('kumpulan array nilai baru: ${array_nilai_tambah}');
console.log('kumpulan array nilai baru: ${array_nilai_tambah}');
//===========

//object
const mhs = {
    nama: " Yusuf",
    umur: 20,
    nilai: [90,90,100],
};

//destructuring object
const nama_ku = mhs.nama;//ambil value dari key nama, dari object mhs
const {namaku, umurku ,nilaiku } =mhs;// langsung buat banyak dari banyak key

console.log('Nama: ${namaku}, Umur boss: ${umurku}');

//spread object
const nimku = { nimku : "A11.2024.15706" };

const new_mhs = {
    ...nimku,
    ...mhs,
};

console.log(new_mhs); 

// array of object = artinya kumpulan objeck dalam array
const list_mhs = [
    {
        nama : "Yusuf",
        umur : 20,
    },
    {
        nama : "rohman",
        umur : 21,
    },
];

//destructuring array of object
const nama_mhs_kedua = list_mhs[1].nama;

console.log(nama_mhs_kedua);
//spread, tambah object ke array pf object
const mhs_anyar = {
    nama: "kak ros",
    umur: 76,
};

const list_mhs_anyar = [...list_mhs, mhs_anyar];

console.log(list_mhs_anyar);