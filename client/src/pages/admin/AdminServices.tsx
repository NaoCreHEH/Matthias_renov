import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Edit2, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function AdminServices() {
  const [, setLocation] = useLocation();
  const { data: services, refetch } = trpc.content.getServices.useQuery();
  const createMutation = trpc.content.createService.useMutation();
  const updateMutation = trpc.content.updateService.useMutation();
  const deleteMutation = trpc.content.deleteService.useMutation();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const handleAdd = async () => {
    if (!formData.title) {
      toast.error("Le titre est requis");
      return;
    }
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
      });
      toast.success("Service ajouté avec succès");
      setFormData({ title: "", description: "", icon: "" });
      setIsAdding(false);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de l'ajout du service");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateMutation.mutateAsync({
        id,
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
      });
      toast.success("Service mis à jour avec succès");
      setFormData({ title: "", description: "", icon: "" });
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du service");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Service supprimé avec succès");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression du service");
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description || "",
      icon: service.icon || "",
    });
  };

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
                Gestion des Services
              </h1>
              <p className="text-gray-600 mt-1">
                {services?.length || 0} service(s)
              </p>
            </div>
          </div>

          {!isAdding && !editingId && (
            <Button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            >
              <Plus size={18} />
              Ajouter un Service
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? "Modifier le Service" : "Ajouter un Service"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Titre du service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                  placeholder="Description du service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icône (emoji ou URL)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="🛠️ ou https://..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() =>
                    editingId ? handleUpdate(editingId) : handleAdd()
                  }
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ title: "", description: "", icon: "" });
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Services Grid */}
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                      className="flex items-center gap-1"
                    >
                      <Edit2 size={16} />
                      Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-gray-600 text-lg">
              Aucun service pour le moment.
            </p>
            <Button
              onClick={() => setIsAdding(true)}
              className="mt-4 bg-primary text-white hover:bg-primary/90"
            >
              <Plus size={18} className="mr-2" />
              Créer le premier service
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
