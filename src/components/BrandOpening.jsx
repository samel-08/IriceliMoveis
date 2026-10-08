import logoLion from "../assets/brand-optimized/logo_leao.png.webp";
import "./BrandOpening.css";

export default function BrandOpening() {
  return (
    <div className="brand-opening" aria-hidden="true">
      <img src={logoLion} alt="" fetchPriority="high" loading="eager" decoding="async" />
    </div>
  );
}