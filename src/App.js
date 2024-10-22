import HewanList from "./components/hewan/HewanList";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PakanList from "./components/Pakan/PakanList";
import TransaksiList from "./components/Transaksi.js/Transaksi";
import AddPakan from "./components/Pakan/AddPakan";
import AddHewan from "./components/hewan/AddHewan";
import EditHewan from "./components/hewan/EditHewan";
import EditPakan from "./components/Pakan/EditPakan";
import AddTransaksi from "./components/Transaksi.js/AddTransaksi";
import EditTransaksi from "./components/Transaksi.js/EditTransaksi";
import AddPembeli from "./components/User/AddPembeli";
import PembeliList from "./components/User/PembeliList";
import EditPembeli from "./components/User/EditPembeli";
// import EditUser from "./components/User/EditUser";

export default function App() {
  return (
    <>
    <BrowserRouter basename="/uts_Primawira_FE/">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pembeli" element={<PembeliList/>}/>
        <Route path="/pembeli/add" element={<AddPembeli/>}/>
        <Route path="/pembeli/edit/:id" element={<EditPembeli/>}/>
        <Route path="/hewan" element={<HewanList/>}/>
        <Route path="/hewan/add" element={<AddHewan/>}/>
        <Route path="/hewan/edit/:id" element={<EditHewan/>}/>
        <Route path="/pakan" element={<PakanList/>}/>
        <Route path="/pakan/add" element={<AddPakan/>}/>
        <Route path="/pakan/edit/:id" element={<EditPakan/>}/>
        <Route path="/trans" element={<TransaksiList/>}/>
        <Route path="/trans/add" element={<AddTransaksi/>}/>
        <Route path="/trans/edit/:id" element={<EditTransaksi/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
