export default function MargoumPattern({ className = "", opacity = 0.2, color = "#C9A24B" }: { className?: string, opacity?: number, color?: string }) {
  return (
    <div 
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23${color.replace('#', '')}' stroke-width='1' stroke-opacity='${opacity}'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}
    />
  );
}
