import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Layout;
