export default function GlassCard({
  as: Tag = 'div',
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'glass',
    'glass-card',
    interactive && 'glass-card--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}