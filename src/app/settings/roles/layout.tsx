export default function RolesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <main className="flex h-full w-full justify-center">
      {children}
      {modal}
    </main>
  );
}
