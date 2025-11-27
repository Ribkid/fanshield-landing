import ChatbotNav from "./chatbot-nav";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col h-full">
      <ChatbotNav id={id} />
      <div className="flex-1 overflow-auto bg-muted/10 p-6">{children}</div>
    </div>
  );
}
