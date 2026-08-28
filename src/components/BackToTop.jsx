export default function BackToTop() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="back-top"
      onClick={handleClick}
      aria-label="Voltar ao topo"
    >
      <span className="back-top__shine" />

      <span className="back-top__default">
        ↑
      </span>

      <span className="back-top__hover">
        ↑
      </span>
    </button>
  );
}