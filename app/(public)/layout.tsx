import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import AIChatWidget from '@/app/components/AIChatWidget';

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
      <AIChatWidget />
    </>
  );
}
