import { cloneElement, isValidElement } from "react";
import clsx from "clsx";

const baseClasses =
  "inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

export function Button({ asChild = false, className, children, ...props }) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: clsx(baseClasses, className, children.props.className),
      ...props
    });
  }

  return (
    <button className={clsx(baseClasses, className)} {...props}>
      {children}
    </button>
  );
}
