import ChatbotCustomizer from "./chatbot-customizer";

export default async function CustomizePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Customize Widget</h2>
        <p className="text-muted-foreground">
          Design your chat widget and see changes in real-time.
        </p>
      </div>
      <ChatbotCustomizer id={params.id} />
    </div>
  );
}
