interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={`container ${className}`.trim()}>
      {children}
    </Tag>
  );
}
