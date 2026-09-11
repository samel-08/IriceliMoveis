import { motion, useReducedMotion } from "motion/react";
import "./FoldText.css";

export default function FoldText({ text = "", className = "" }) {
  const reduced = useReducedMotion();
  return <span className={`fold-text ${className}`}>
    <span className="fold-text__accessible">{text}</span>
    <span aria-hidden="true">
      {text.split(/(\s+)/).map((word, index) => /^\s+$/.test(word) ? word : (
        <motion.span key={index} className="fold-text__word"
          initial={reduced ? false : { rotateX: -80, opacity: 0, y: "0.2em" }}
          whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : Math.min(index * 0.035, 0.35), ease: [0.22, 1, 0.36, 1] }}>
          {word}
        </motion.span>
      ))}
    </span>
  </span>;
}
