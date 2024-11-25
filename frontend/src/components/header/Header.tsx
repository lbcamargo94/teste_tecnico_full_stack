import "./Header.css";
import Logo from "../../assets/images/logo-original.png";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="logo" className="logo-image" />
      </div>
      <div className="tittle">
        <h1 className="tittle-text">RIDE REQUEST</h1>
      </div>
    </div>
  );
}

export { Header };
