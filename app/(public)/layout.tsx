import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
