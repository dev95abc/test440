// app/components/NavbarServer.tsx
import { auth0 } from "@/lib/auth0";
import Navbar from "./Nabvar";

export default async function NavbarServer() {
    const session = await auth0.getSession();
    return <Navbar session={session} />;
}