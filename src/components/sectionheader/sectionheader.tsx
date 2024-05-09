type SectionHeaderProps = {
  text: string;
};

export default function SectionHeader(props: SectionHeaderProps) {
  return <h2 className="font-heading text-xl font-semibold">{props.text}</h2>;
}
