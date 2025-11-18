import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit2, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

export default function AdminTestimonials() {
  const [, setLocation] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    clientName: "",
    content: "",
    rating: 5,
    projectType: "",
    published: true,
  });

  // Vérifier l'authentification
  useEffect(() => {
    setIsAdmin(true); // Placeholder - à connecter avec l'authentification réelle
  }, []);

  const handleAdd = async () => {
    if (!formData.clientName || !formData.content) {
      toast.error("Le nom et le contenu sont requis");
      return;
    }
    try {
      toast.success("Témoignage ajouté avec succès");
      setFormData({
        clientName: "",
        content: "",
        rating: 5,
        projectType: "",
        published: true,
      });
      setIsAdding(false);
    } catch (error) {
      toast.error("Erreur lors de l'ajout du témoignage");
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return;
    try {
      toast.success("Témoignage supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression du témoignage");
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/admin")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestion des Témoignages
              </h1>
              <p className="text-gray-600 mt-1">
                Gérez les témoignages clients
              </p>
            </div>
          </div>

          {!isAdding && !editingId && (
            <Button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            >
              <Plus size={18} />
              Ajouter un Témoignage
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">
              {editingId ? "Modifier le Témoignage" : "Ajouter un Témoignage"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nom du client
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nom du client"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Témoignage
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                  placeholder="Contenu du témoignage"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type de projet
                  </label>
                  <input
                    type="text"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ex: Aménagement de combles"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Note (1-5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <option key={i} value={i}>
                        {i} étoile{i > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="rounded"
                />
                <label htmlFor="published" className="text-sm font-medium">
                  Publier ce témoignage
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({
                      clientName: "",
                      content: "",
                      rating: 5,
                      projectType: "",
                      published: true,
                    });
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Testimonials List */}
        <div className="space-y-4">
          <p className="text-foreground/60 text-center py-8">
            Aucun témoignage pour le moment
          </p>
        </div>
      </div>
    </div>
  );
}
