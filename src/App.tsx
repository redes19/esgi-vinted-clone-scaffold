export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold hover:text-teal-100">
            Vinted Clone
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="hover:text-teal-200">
              Accueil
            </a>
            <a href="/my-articles" className="hover:text-teal-200">
              Mes annonces
            </a>
            <a href="/favorites" className="hover:text-teal-200">
              Favoris
            </a>
            <a
              href="/publish"
              className="bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full hover:bg-teal-50"
            >
              Publier
            </a>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">
          Bienvenue sur le projet Vinted Clone !
        </h2>
        <p className="text-gray-600 mb-2">
          Ce scaffold contient tout le nécessaire pour démarrer. Consultez le
          fichier <code className="bg-gray-200 px-1 rounded">CONSIGNES.md</code>{" "}
          pour les instructions.
        </p>
        <p className="text-gray-500 text-sm mt-4">
          La page « Mes annonces » sera vide au démarrage — c'est normal. Créez
          votre première annonce pour la voir apparaître.
        </p>
        <p className="text-gray-400 text-xs mt-6">
          Remplacez ce contenu par votre application.
        </p>
      </main>
    </div>
  );
}
