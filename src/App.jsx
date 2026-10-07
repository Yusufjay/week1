function Menyapa(){
  //1 function = 1 return
  return <h1>Haloo Perkenalkan</h1>;
}

function Biodata({nama}){
  //cara untuk beberapa statement
  //dengan <> ......</>
  return <>
  <table border={1}>
    <tr>
      <td>Nama</td>
      <td>NIM</td>
    </tr>
    <tr>
      <td>{nama}</td>
      <td>A11.2024.15706</td>
    </tr>
  </table>
  </>
}
// Tampilkan biodata anda
// Nama , NIM , dan Hobby
function App() {
    return  <>
        <Menyapa />
        <Biodata nama="M Yusuf Jaya S" />
    </>;
      
}
//perintah jadikan function utama 
export default App;
