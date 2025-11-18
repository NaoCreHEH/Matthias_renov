import Navigation from "@/components/Navigation";
import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = trpc.testimonials?.list?.useQuery?.() ?? { data: [], isLoading: false };
  const createTestimonialMutation = trpc.testimonials?.create?.useMutation?.();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    projectType: "",
    rating: 5,
    testimonial: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Veuillez entrer votre nom");
      return;
    }

    if (formData.testimonial.trim().length < 10) {
      toast.error("Le témoignage doit contenir au moins 10 caractères");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!createTestimonialMutation) {
        toast.error("Le service n'est pas disponible. Veuillez réessayer plus tard.");
        return;
      }

      await createTestimonialMutation.mutateAsync(formData);
      
      toast.success("Merci ! Votre témoignage a été envoyé et sera publié après validation.");
      
      // Reset form
      setFormData({
        name: "",
        title: "",
        projectType: "",
        rating: 5,
        testimonial: "",
      });
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error("Error submitting testimonial:", error);
    } finally {
      setIsSubmitting(false);
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Témoignages Clients</h1>
          <p className="text-xl text-primary-foreground/90">
            Découvrez ce que nos clients pensent de nos services
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">Chargement des témoignages...</p>
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial: any) => (
                <div
                  key={testimonial.id}
                  className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {renderStars(testimonial.rating || 5)}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 mb-6 italic leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Client Info */}
                  <div className="border-t pt-4">
                    <h3 className="font-bold text-primary mb-1">
                      {testimonial.name}
                    </h3>
                    {testimonial.title && (
                      <p className="text-sm text-foreground/60 mb-1">
                        {testimonial.title}
                      </p>
                    )}
                    {testimonial.projectType && (
                      <p className="text-sm text-accent font-medium">
                        Projet : {testimonial.projectType}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60">Aucun témoignage disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Partagez Votre Expérience</h2>
            <p className="text-foreground/70 mb-8">
              Vous avez travaillé avec nous ? Laissez-nous votre avis !
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Votre nom <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>

              {/* Title/Function Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  Titre / Fonction (optionnel)
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Propriétaire, Architecte, etc."
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              {/* Project Type Field */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                  Type de projet (optionnel)
                </label>
                <Input
                  id="projectType"
                  name="projectType"
                  type="text"
                  placeholder="Aménagement de combles, Rénovation cuisine, etc."
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              {/* Rating Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Votre note <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleRatingChange(i + 1)}
                      className="focus:outline-none transition"
                    >
                      <Star
                        size={32}
                        className={
                          i < formData.rating
                            ? "fill-accent text-accent cursor-pointer"
                            : "text-gray-300 cursor-pointer hover:text-gray-400"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Testimonial Field */}
              <div>
                <label htmlFor="testimonial" className="block text-sm font-medium text-foreground mb-2">
                  Votre témoignage <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="testimonial"
                  name="testimonial"
                  placeholder="Partagez votre expérience avec nous..."
                  value={formData.testimonial}
                  onChange={handleInputChange}
                  className="w-full min-h-[150px]"
                  required
                />
                <p className="text-xs text-foreground/50 mt-2">
                  Minimum 10 caractères
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-medium transition"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer mon témoignage"}
              </Button>

              {/* Info Message */}
              <p className="text-sm text-foreground/60 text-center">
                Votre témoignage sera publié après validation par notre équipe.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-auto">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 Rommelaere Rénov. Tous droits réservés.</p>
          <a
            href="https://www.facebook.com/people/Rommelaere-Renov/100064883967078/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
          >
            Suivez-nous sur Facebook
          </a>
        </div>
      </footer>
    </div>
  );
}
