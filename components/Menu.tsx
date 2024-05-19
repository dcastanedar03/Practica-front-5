import { FunctionComponent } from "preact";

const Menu: FunctionComponent = () => {
  return (
    <nav className="arcade-menu">
      <a href="/" className="arcade-link">
        <i className="arcade-icon"></i>
        <span className="arcade-text">Films</span>
      </a>
      <a href="/project" className="arcade-link">
        <i className="arcade-icon"></i>
        <span className="arcade-text">Projects</span>
      </a>
    </nav>
  );
};

export default Menu;
