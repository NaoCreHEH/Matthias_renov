import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit2, Trash2, Star, Check, X } from "lucide-react";
import { toast } from "sonner";

interface TestimonialForm {
  name: string;
  title?: string;
  projectType?: string;
  rating: number;
  testimonial: string;
}

export default function AdminTestimonials() {
  const [, setLocation] = useLocation();
  const { data: pendingTestimonials = [], isLoading, refetch } = trpc.testimonials?.getPending?.useQuery?.() ?? { data: [], isLoading: false, refetch: () => {} };
  const approveMutation = trpc.testimonials?.approve?.useMutation?.();
  const rejectMutation = trpc.testimonials?.reject?.useMutation?.();
  const deleteMutation = trpc.testimonials?.delete?.useMutation?.();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<TestimonialForm>({
    name: "",
    title: "",
    projectType: "",
    rating: 5,
    testimonial: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleApprove = async (id: number) => {
    try {
      if (!approveMutation) {
        toast.error("Le service n'est pas disponible");
        return;
      }
      await approveMutation.mutateAsync(id);
      toast.success("Témoignage approuvé avec succès");
      refetch?.();
    } catch (error) {
      toast.error("Erreur lors de l'approbation du témoignage");
      console.error(error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      if (!rejectMutation) {
        toast.error("Le service n'est pas disponible");
        return;
      }
      await rejectMutation.mutateAsync(id);
      toast.success("Témoignage rejeté");
      refetch?.();
    } catch (error) {
      toast.error("Erreur lors du rejet du témoignage");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return;
    try {
      if (!deleteMutation) {
        toast.error("Le service n'est pas disponible");
        return;
      }
      await deleteMutation.mutateAsync(id);
      toast.success("Témoignage supprimé avec succès");
      refetch?.();
    } catch (error) {
      toast.error("Erreur lors de la suppression du témoignage");
      console.error(error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-accent text-accent" : "text-gray-300"}
      />
    ));
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
                Gestion des Témoignages
              </h1>
              <p className="text-gray-600 mt-1">
                Approuvez ou rejetez les témoignages clients en attente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-foreground/60">Chargement des témoignages en attente...</p>
          </div>
        )}

        {/* Pending Testimonials List */}
        {!isLoading && pendingTestimonials && pendingTestimonials.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">
              Témoignages en Attente ({pendingTestimonials.length})
            </h2>
            {pendingTestimonials.map((testimonial: any) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary">
                      {testimonial.name}
                    </h3>
                    {testimonial.title && (
                      <p className="text-sm text-foreground/60">
                        {testimonial.title}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {testimonial.projectType && (
                  <p className="text-sm text-accent font-medium mb-3">
                    Projet : {testimonial.projectType}
                  </p>
                )}

                <p className="text-foreground/80 mb-4 italic leading-relaxed">
                  "{testimonial.testimonial}"
                </p>

                <p className="text-xs text-foreground/50 mb-4">
                  Soumis le {new Date(testimonial.createdAt).toLocaleDateString('fr-FR')}
                </p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(testimonial.id)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check size={16} />
                    Approuver
                  </Button>
                  <Button
                    onClick={() => handleReject(testimonial.id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <X size={16} />
                    Rejeter
                  </Button>
                  <Button
                    onClick={() => handleDelete(testimonial.id)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : !isLoading ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">
              Aucun témoignage en attente de validation
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
