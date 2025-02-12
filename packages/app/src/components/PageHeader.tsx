import React from "react";

export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <div>
          <small className="text-sm font-medium leading-none">{subtitle}</small>
        </div>
      )}
      {children}
    </div>
  );
}
