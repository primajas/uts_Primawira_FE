## landing page
![landingpage](https://github.com/user-attachments/assets/6e3661cb-b23e-4138-9774-d70f269cfdda)
## contoh dashboard admin
![Screenshot 2025-02-13 191019](https://github.com/user-attachments/assets/75baebf9-7e3f-4fc2-a43d-b50f67b41adc)
## lokasi
![lok](https://github.com/user-attachments/assets/f56d6fa8-8f73-40db-a5d4-2ec4d6cbba3f)

#   1.User/Pembeli (Tambah, Edit, Hapus Pengguna)
### a. Tambah Pengguna

- Pengguna baru bisa mendaftar (sign up) dengan mengisi data seperti nama, email, password, dan alamat.
- Backend akan memvalidasi data, lalu membuat record baru di tabel User dengan Sequelize.
- Proses ini menyimpan data pengguna ke database dan mereturn data pengguna baru yang telah disimpan.

### b. Edit Pengguna
- Pengguna dapat mengedit data mereka (misalnya, mengganti nama atau alamat).
- Prosesnya adalah mengambil data pengguna yang sudah ada, mengubah data yang diinginkan, lalu mengupdate record di tabel User.
- Setelah update berhasil, pengguna akan menerima konfirmasi bahwa data telah diperbarui.
### c. Hapus Pengguna
- Admin atau pengguna dapat menghapus akun pengguna dari sistem.
- Saat pengguna dihapus, data terkait seperti transaksi juga dapat dihapus atau tetap ada tergantung pengaturan cascade di Sequelize.
- Record pengguna dihapus dari tabel User dan respon sukses akan diberikan.
# Hewan (Tambah, Edit, Hapus Hewan)
### a. Tambah Hewan
- Admin bisa menambah hewan baru ke daftar hewan yang dijual di toko.
- Admin mengisi data hewan seperti nama, jenis (misalnya anjing, kucing), harga, dan deskripsi.
- Backend menerima data ini dan menyimpannya ke tabel Hewan di database.
- Hewan yang baru ditambahkan akan muncul di halaman katalog hewan.
### b. Edit Hewan
- Admin bisa mengedit informasi hewan yang sudah ada, seperti mengubah harga atau deskripsi hewan.
- Proses ini melibatkan pengambilan record hewan berdasarkan id, mengupdate informasi, dan menyimpannya kembali ke database.
- Setelah berhasil diperbarui, informasi hewan akan ditampilkan dengan perubahan yang baru.
### c. Hapus Hewan
- Admin dapat menghapus hewan dari daftar toko jika hewan tersebut sudah terjual atau tidak lagi tersedia.
- Saat menghapus, record hewan dihapus dari tabel Hewan.
# Pakan Management (Tambah, Edit, Hapus Pakan)
### a. Tambah Pakan
- Admin bisa menambahkan produk pakan baru ke katalog pakan.
- Admin mengisi data seperti nama pakan, jenis pakan (misalnya pakan kucing, anjing), harga, dan jumlah stok.
- Backend menerima dan menyimpan data pakan baru ini ke tabel Pakan.
### b. Edit Pakan
- Admin bisa memperbarui informasi pakan yang sudah ada, seperti mengubah harga atau stok.
- Proses ini melibatkan pengambilan record pakan berdasarkan id dan mengupdate informasinya.
### c. Hapus Pakan
- Admin dapat menghapus produk pakan dari sistem, jika pakan tidak lagi dijual atau habis.
- Record pakan akan dihapus dari tabel Pakan.
# Transaksi Management (Tambah, Edit, Hapus Transaksi)
### a. Tambah Transaksi
- Setelah pengguna memilih hewan atau pakan yang akan dibeli, mereka akan membuat transaksi.
- Transaksi mencatat detail seperti UserId, daftar hewan yang dibeli, tanggal, dan total pembayaran.
- Data transaksi disimpan di tabel Transaksi dan hewan yang dibeli akan terkait dengan transaksi tersebut.
### b. Edit Transaksi
- Admin bisa memperbarui detail transaksi, seperti menyesuaikan total pembayaran jika ada perubahan harga atau produk.
- Prosesnya melibatkan pengambilan record transaksi berdasarkan id dan memperbarui informasinya.
### c. Hapus Transaksi
- Admin dapat menghapus transaksi dari sistem, biasanya jika transaksi dibatalkan atau terjadi kesalahan.
- Record transaksi dihapus dari tabel Transaksi, dan penghapusan bisa memengaruhi record hewan yang terkait.
## Kesimpulan
### Setiap bagian dari sistem ini memanfaatkan Sequelize ORM untuk menangani operasi CRUD (Create, Read, Update, Delete) dengan basis data relasional. Model-model pengguna, hewan, pakan, dan transaksi saling berhubungan, sehingga memungkinkan integrasi data yang mulus antara pengguna, barang yang dibeli, dan catatan transaksi.



https://images.bisnis.com/posts/2023/03/12/1636532/3._kucing_anggora__ciri,_jenis,_cara_merawat,_dan_harganya_-_daily_paws.jpg

https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/MTA-72896052/excel_pakan_kucing_-_excel_4_kg_bentuk_ikan_makanan_kucing_anggora_persia_makanan_kucing_higienis_makanan_kucing_original_full01_021gcnr.jpg
