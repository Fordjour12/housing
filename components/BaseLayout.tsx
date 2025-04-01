// components/layouts/BaseLayout.tsx

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function BaseLayout({ children, header, sidebar }: BaseLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {header && header}
      <div className="flex-1 overflow-y-auto">
        <div className="flex h-full">
          {sidebar && <div className="border-r">{sidebar}</div>}
          <div className="flex-1">
            <div className="container mx-auto p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}