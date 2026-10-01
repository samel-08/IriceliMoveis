export const navigation = [
  { id: "projetos", href: "#projetos", label: "Projetos" },
  { id: "diferenciais", href: "#diferenciais", label: "Diferenciais" },
  { id: "processo", href: "#processo", label: "Processo" },
  { id: "contato", href: "#contato", label: "Contato" },
];

export const phoneLabel = "(41) 98813-2385";
const phone = "5541988132385";
const defaultMessage = "Olá! Vi os projetos no site da Iriceli Móveis e gostaria de solicitar um orçamento.";

export function whatsappLink(message = defaultMessage) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
