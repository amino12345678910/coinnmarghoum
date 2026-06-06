export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xs font-semibold tracking-widest text-brass uppercase mb-4">
        {eyebrow}
      </span>
      <h2 className="font-heading text-4xl md:text-6xl text-deep-blue">
        {title}
      </h2>
    </div>
  );
}
