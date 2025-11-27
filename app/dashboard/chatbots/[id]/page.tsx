import ChatbotSettingsForm from "./chatbot-settings-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChatbotSettingsForm id={id} />;
}
