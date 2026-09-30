export default function PearlButton({ href, children, className = "", target, rel }) {
  return (
    <a className={`pearl-cta ${className}`.trim()} href={href} target={target} rel={rel}>
      <span className="pearl-cta__wrap">
        <span className="pearl-cta__content">
          <span className="pearl-cta__icon pearl-cta__icon--default" aria-hidden="true">↗</span>
          <span className="pearl-cta__icon pearl-cta__icon--hover" aria-hidden="true">✦</span>
          {children}
        </span>
      </span>
    </a>
  );
}
