import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { LogIn, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet";

export default function Login() {
  const [, setLocation] = useLocation();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);

    try {
      // Utiliser une procédure tRPC pour l'authentification
      // Note: Cette procédure n'existe pas encore dans routers.ts, mais elle est nécessaire pour une connexion réelle.
      // Je vais simuler l'appel pour l'instant, mais il faudra l'implémenter côté serveur.
      // Si l'authentification est gérée par un service externe (comme Manus OAuth), cette logique doit être adaptée.

      // Pour l'instant, je vais conserver la simulation pour ne pas casser le build,
      // mais je vais ajouter un commentaire pour indiquer qu'une procédure tRPC est nécessaire.
      
      await trpc.auth.login.mutate({ email, password });
      refresh(); // Re-fetch user data to update authentication state
      setLocation("/admin");
      toast.success("Connexion réussie !");
    } catch (error) {
      setIsLoading(false);
      toast.error("Erreur lors de la connexion");
    }
  };

  return (
    <>
    <Helmet>
  <meta name="robots" content="noindex, nofollow" />
  <title>Connexion</title>
</Helmet>

    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container py-12 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
              <LogIn size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Connexion Admin</h1>
            <p className="text-gray-600 mt-2">
              Accédez à votre tableau de bord d'administration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rommelaere-renov.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white hover:bg-primary/90 py-2 rounded-lg font-medium"
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

    

          {/* Back Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft size={16} />
              Retour à l'accueil
            </button>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}
