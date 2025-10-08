import clsx from "clsx";

export function Card({ className, ...props }) {
  return <div className={clsx("rounded-xl border bg-white/5 text-white shadow", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={clsx("p-6", className)} {...props} />;
}
