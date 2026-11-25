import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import MahasiswaTable from "@/Pages/Admin/Mahasiswa/MahasiswaTable";
import MahasiswaModal from "@/Pages/Admin/Mahasiswa/MahasiswaModal";

import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

const emptyForm = { id: null, nim: "", nama: "" };

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const fetchMahasiswa = async () => {
    try {
      const res = await getAllMahasiswa();
      setMahasiswa(res.data);
    } catch {
      toastError("Gagal mengambil data mahasiswa");
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setIsEdit(true);
    setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(async () => {
        try {
          await updateMahasiswa(form.id, { nim: form.nim, nama: form.nama });
          toastSuccess("Data berhasil diperbarui");
          closeModal();
          fetchMahasiswa();
        } catch {
          toastError("Gagal memperbarui data");
        }
      });
      return;
    }

    const exists = mahasiswa.find((m) => m.nim === form.nim);
    if (exists) {
      toastError("NIM sudah terdaftar!");
      return;
    }

    try {
      await storeMahasiswa({ nim: form.nim, nama: form.nama });
      toastSuccess("Data berhasil ditambahkan");
      closeModal();
      fetchMahasiswa();
    } catch {
      toastError("Gagal menambahkan data");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await deleteMahasiswa(id);
        toastSuccess("Data berhasil dihapus");
        fetchMahasiswa();
      } catch {
        toastError("Gagal menghapus data");
      }
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <MahasiswaTable
          data={mahasiswa}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
        />
      </Card>

      <MahasiswaModal
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;
