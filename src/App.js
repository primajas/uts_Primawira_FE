import HewanList from "./components/hewan/HewanList";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PakanList from "./components/Pakan/PakanList";
import AddPakan from "./components/Pakan/AddPakan";
import AddHewan from "./components/hewan/AddHewan";
import EditHewan from "./components/hewan/EditHewan";
import EditPakan from "./components/Pakan/EditPakan";
import AddTransaksi from "./components/Transaksi.js/AddTransaksi";
import EditTransaksi from "./components/Transaksi.js/EditTransaksi";
import PembeliList from "./components/User/PembeliList";
import EditPembeli from "./components/User/EditPembeli";
import Login from "./components/Login";
import Register from "./components/Register";
import PembayaranBerhasil from "./components/Hero/Berhasil";
// import PageAdmin from "./components/PageAdmin";
// import Layout from "./components/Dasboard/Layout";
import Transaksi from "./components/Transaksi.js/Transaksi";
import Dashboard from "./components/Dasboard/Dasboard";
// import First from "./components/Dasboard/First";
import DashboardLayout from "./components/Dasboard/Dasboard";
// import EditUser from "./components/User/EditUser";

export default function App() {
  return (
    <>
    <BrowserRouter basename="/uts_Primawira_FE/">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/* <Route path="/pembeli" element={<PembeliList/>}/>
        <Route path="/add" element={<AddPembeli/>}/>
        <Route path="/pembeli/edit/:id" element={<EditPembeli/>}/> */}
        {/* <Route path="/hewan" element={<HewanList/>}/> */}
        <Route path="/dashboard/hewan/add/" element={<AddHewan/>}/>
        <Route path="/admin/edit/:id" element={<EditHewan/>}/>
        {/* <Route path="/pakan" element={<PakanList/>}/> */}
        <Route path="/pakan/add" element={<AddPakan/>}/>
        <Route path="/pakan/edit/:id" element={<EditPakan/>}/>
        {/* <Route path="/trans" element={<TransaksiList/>}/> */}
        <Route path="/trans/add" element={<AddTransaksi/>}/>
        <Route path="/trans/edit/:id" element={<EditTransaksi/>}/>
        <Route path="/ber" element={<PembayaranBerhasil/>}/>
        
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route path="hewan" element={<HewanList />} />
          <Route path="pakan" element={<PakanList />} />
          <Route path="trans" element={<Transaksi />} />
          <Route path="customer" element={<PembeliList />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
