
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

import { mahasiswaList } from "@/Data/Dummy";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const fetchMahasiswa = async () => {
	  // bisa disimulasikan delay atau nanti diganti fetch API
	  setMahasiswa(mahasiswaList);
	};

  useEffect(() => {
    const timer = setTimeout(() => fetchMahasiswa(), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const [form, setForm] = useState({ nim: "", nama: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editNim, setEditNim] = useState(null);

  const navigate = useNavigate();

  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
  };

  const updateMahasiswa = (nim, newData) => {
    const updated = mahasiswa.map((mhs) =>
      mhs.nim === nim ? { ...mhs, ...newData } : mhs
    );
    setMahasiswa(updated);
  };

  const deleteMahasiswa = (nim) => {
    const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
    setMahasiswa(filtered);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setIsEdit(false);
    setEditNim(null);
    setForm({ nim: "", nama: "" });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(() => {
        updateMahasiswa(editNim, form);
        toastSuccess("Data berhasil diperbarui");
        setForm({ nim: "", nama: "" });
        setIsEdit(false);
        setIsModalOpen(false);
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      addMahasiswa(form);
      toastSuccess("Data berhasil ditambahkan");
      setForm({ nim: "", nama: "" });
      setIsModalOpen(false);
    }
  };

  const handleEdit = (mhs) => {
    setIsEdit(true);
    setEditNim(mhs.nim);
    setForm({ nim: mhs.nim, nama: mhs.nama });
    setIsModalOpen(true);
  };

  const handleDelete = (nim) => {
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>

          <Button onClick={openAddModal}>
            + Tambah Mahasiswa
          </Button>
        </div>

        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {mahasiswa.map((mhs, index) => (
              <tr
                key={mhs.nim}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }
              >
                <td className="py-2 px-4">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.nama}</td>

                <td className="py-2 px-4 text-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/mahasiswa/${mhs.nim}`)
                    }
                  >
                    Detail
                  </Button>

                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(mhs)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      handleDelete(mhs.nim)
                    }
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
              </h2>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-red-500 text-xl"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 space-y-4"
            >
              <div>
                <Label htmlFor="nim">NIM</Label>
                <Input
                  type="text"
                  name="nim"
                  value={form.nim}
                  onChange={handleChange}
                  readOnly={isEdit}
                  placeholder="Masukkan NIM"
                  required
                />
              </div>

              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan Nama"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </Button>

                <Button type="submit">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Mahasiswa;
