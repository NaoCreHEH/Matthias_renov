import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Edit2, Plus, Upload, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminProjects() {
  const [, setLocation] = useLocation();
  const { data: projects, refetch } = trpc.content.getProjects.useQuery();
  const createMutation = trpc.content.createProject.useMutation();
  const updateMutation = trpc.content.updateProject.useMutation();
  const deleteMutation = trpc.content.deleteProject.useMutation();
  const getImagesMutation = trpc.content.getProjectImages.useQuery;
  const createImageMutation = trpc.content.createProjectImage.useMutation();
  const deleteImageMutation = trpc.content.deleteProjectImage.useMutation();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedProjectForImages, setSelectedProjectForImages] = useState<number | null>(null);
  const [projectImages, setProjectImages] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAdd = async () => {
    if (!formData.title) {
      toast.error("Le titre est requis");
      return;
    }
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
      });

      // Ajouter les images uploadées
      if (uploadedImages.length > 0) {
        const newProject = await trpc.content.getProjects.useQuery().data?.find(
          (p) => p.title === formData.title
        );
        if (newProject) {
          for (const imageUrl of uploadedImages) {
            await createImageMutation.mutateAsync({
              projectId: newProject.id,
              imageUrl,
              order: uploadedImages.indexOf(imageUrl),
            });
          }
        }
      }

      toast.success("Réalisation ajoutée avec succès");
      setFormData({ title: "", description: "", imageUrl: "" });
      setUploadedImages([]);
      setIsAdding(false);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la réalisation");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateMutation.mutateAsync({
        id,
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
      });
      toast.success("Réalisation mise à jour avec succès");
      setFormData({ title: "", description: "", imageUrl: "" });
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de la réalisation");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Réalisation supprimée avec succès");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression de la réalisation");
    }
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description || "",
      imageUrl: project.imageUrl || "",
    });
  };

  const handleAddImage = async (projectId: number) => {
    setSelectedProjectForImages(projectId);
    // Charger les images du projet
    try {
      const images = await trpc.content.getProjectImages.useQuery(projectId).data || [];
      setProjectImages(images);
      setCurrentImageIndex(0);
    } catch (error) {
      console.error("Erreur lors du chargement des images:", error);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, projectId: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        try {
          await createImageMutation.mutateAsync({
            projectId,
            imageUrl: result,
            order: projectImages.length,
          });
          toast.success("Image ajoutée avec succès");
          setProjectImages([...projectImages, { id: Date.now(), projectId, imageUrl: result, order: projectImages.length }]);
          setIsUploading(false);
        } catch (error) {
          toast.error("Erreur lors de l'ajout de l'image");
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;
    try {
      await deleteImageMutation.mutateAsync(imageId);
      setProjectImages(projectImages.filter((img) => img.id !== imageId));
      toast.success("Image supprimée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Gérer les Réalisations</h2>
          <p className="text-foreground/60 mt-1">Gérez vos projets et leurs photos</p>
        </div>
        <div className="flex gap-2">
          {!isAdding && !editingId && !selectedProjectForImages && (
            <Button onClick={() => setIsAdding(true)} className="bg-accent text-white">
              <Plus size={20} className="mr-2" />
              Ajouter une Réalisation
            </Button>
          )}
          {selectedProjectForImages && (
            <Button
              variant="outline"
              onClick={() => setSelectedProjectForImages(null)}
            >
              <X size={20} className="mr-2" />
              Fermer
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => setLocation("/admin")}
          >
            Retour
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg border border-border">
          <h3 className="text-lg font-bold mb-4">
            {editingId ? "Modifier la Réalisation" : "Ajouter une Réalisation"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Titre du projet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={4}
                placeholder="Description du projet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image principale (URL)</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://exemple.com/image.jpg"
              />
              <p className="text-xs text-foreground/60 mt-2">
                Vous pourrez ajouter d'autres images après la création du projet
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => (editingId ? handleUpdate(editingId) : handleAdd())}
                className="bg-primary text-white"
                disabled={isUploading}
              >
                {editingId ? "Mettre à jour" : "Ajouter"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ title: "", description: "", imageUrl: "" });
                  setUploadedImages([]);
                }}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery Manager */}
      {selectedProjectForImages && (
        <div className="bg-gray-50 p-6 rounded-lg border border-border">
          <h3 className="text-lg font-bold mb-4">Gérer les images du projet</h3>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition">
              <div className="flex items-center gap-2 text-sm">
                <Upload size={16} />
                <span>Ajouter une image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUploadImage(e, selectedProjectForImages)}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          {/* Images Grid */}
          {projectImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projectImages.map((image, index) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={16} />
                  </button>
                  <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 text-center py-8">Aucune image pour ce projet</p>
          )}
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="bg-gray-50 p-6 rounded-lg border border-border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-foreground/80 mb-2">{project.description}</p>
                  {project.imageUrl && (
                    <p className="text-sm text-foreground/60">Image principale: {project.imageUrl.substring(0, 50)}...</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddImage(project.id)}
                    className="whitespace-nowrap"
                  >
                    <Upload size={16} className="mr-1" />
                    Images
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(project.id)}
                    className="text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-foreground/60 text-center py-8">Aucune réalisation pour le moment.</p>
        )}
      </div>
    </div>
  );
}
