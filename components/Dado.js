export default function Dado({ valor }) {
  if (!valor) {
    return (
      <img className="dado" src="/dice/dado-vazio.svg" alt="Dado ainda não lançado" />
    );
  }

  return (
    <img className="dado" src={`/dice/dado-${valor}.svg`} alt={`Dado ${valor}`} />
  );
}
