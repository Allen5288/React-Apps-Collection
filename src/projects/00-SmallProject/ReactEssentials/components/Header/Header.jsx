import "./Header.css";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
  const description = reactDescriptions[genRandomInt(2)]; // it is the dynamic value

  return (
    <header id="essentials-header">
      <img
        src={
          "https://tse1.mm.bing.net/th/id/OIP.pzHXCpx440B8chQWxcL1DgHaEL?rs=1&pid=ImgDetMain"
        }
        alt="Stylized atom"
      />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}
