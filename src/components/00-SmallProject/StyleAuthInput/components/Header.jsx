import classes from "./Header.module.css";
export default function Header() {
  return (
    <header className={classes.header}>
      <img
        src="https://tse1.mm.bing.net/th/id/OIP.UmkY_56yUpwy7EjoyfBgoQHaE3?rs=1&pid=ImgDetMain"
        alt="A canvas"
      />
      <h1>ReactArt</h1>
      <p className={classes.paragraph}>
        A community of artists and art-lovers.
      </p>
    </header>
  );
}
