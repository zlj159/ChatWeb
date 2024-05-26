import dynamic from "next/dynamic";
import {NextPage} from "next";


const AdminApp = dynamic(() => import("@/app/components/admin/admin"),{
    ssr: false
})

const Admin:NextPage = () => <AdminApp/>

export default Admin;