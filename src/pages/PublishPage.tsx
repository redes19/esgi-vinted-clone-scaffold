import CreateArticleForm from "../components/CreateArticleForm";

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Publier une annonce
        </h1>

        <CreateArticleForm
          title=""
          description=""
          price={0}
          category=""
          size=""
          condition=""
          imageUrl=""
        />
      </div>
    </div>
  );
}
