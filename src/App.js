import HewanList from "./components/hewan/HewanList";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./components/User/UserList";
import PakanList from "./components/Pakan/PakanList";
import TransaksiList from "./components/Transaksi.js/Transaksi";
import AddUser from "./components/User/AddUser";
import UserEdit from "./components/User/UserEdit";
import AddPakan from "./components/Pakan/AddPakan";
import AddHewan from "./components/hewan/AddHewan";
import EditHewan from "./components/hewan/EditHewan";
import EditPakan from "./components/Pakan/EditPakan";
import AddTransaksi from "./components/Transaksi.js/AddTransaksi";
import EditTransaksi from "./components/Transaksi.js/EditTransaksi";
// import EditUser from "./components/User/EditUser";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<UserList/>}/>
        <Route path="/user/add" element={<AddUser/>}/>
        <Route path="/user/edit/:id" element={<UserEdit/>}/>
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
