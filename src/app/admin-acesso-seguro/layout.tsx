import { Footer } from "@/components/store/footer";
import { AdminHeader } from "@/components/store/admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AdminHeader />
      {children}
      <Footer />
    </main>
  );
}
