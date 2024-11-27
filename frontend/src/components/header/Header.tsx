import "./Header.css";
// import Logo from "../../assets/images/logo-original.png";

function Header() {
  return (
    <header className="flex flex-col items-center justify-between align-middle min-w-full h-20 bg-blue-950 px-3 py-1 shadow">
      <div className="box-border">
        {/* <img src={Logo} alt="logo" className="w-full" /> */}
        <h1 className="tittle-text">RIDE REQUEST</h1>
      </div>
    </header>
  );
}

export { Header };
