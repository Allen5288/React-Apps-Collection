export default function CoreConcept(props) {
  return (
    <li>
      <img src={props.image} alt={props.title} onError={e => { e.target.onerror=null; e.target.src='/placeholder.png'; }} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}
