import Nav from "../Nav/Nav";
import MobileNav from "../MobileNav/MobileNav";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Nav />
      <MobileNav />
    </header>
  );
};

export default Header;
