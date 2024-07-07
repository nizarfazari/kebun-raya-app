import Footer from "~/components/home/footer";
import Navbar from "~/components/navbar";
import { useRouter } from 'next/router';


export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const is404 = router.route == '/_error';

  return (
    <>
      {!is404 && <Navbar />}
      <main >{children}</main>
      {!is404 && <Footer />}
    </>
  );
}