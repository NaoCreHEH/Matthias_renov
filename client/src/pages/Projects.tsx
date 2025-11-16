import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ImageCarousel from "@/components/ImageCarousel";
import { trpc } from "@/lib/trpc";
import SeoHelmet from "@/components/SeoHelmet";


export default function Projects() {
  const { data: projects, isLoading } = trpc.content.getProjects.useQuery();
  const [projectImagesMap, setProjectImagesMap] = useState<{ [key: number]: any[] }>({});

  // Charger les images pour chaque projet
  useEffect(() => {
    if (projects) {
      projects.forEach((project) => {
        const { data: images } = trpc.content.getProjectImages.useQuery(project.id);
        if (images) {
          setProjectImagesMap((prev) => ({
            ...prev,
            [project.id]: images,
          }));
        }
      });
    }
  }, [projects]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Nos Réalisations</h1>
          <p className="text-xl text-primary-foreground/90">
            Découvrez les projets que nous avons menés à bien
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">Chargement des réalisations...</p>
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-12">
              {projects.map((project) => {
                const images = projectImagesMap[project.id]?.map((img: any) => img.imageUrl) || [];
                const displayImages = images.length > 0 ? images : (project.imageUrl ? [project.imageUrl] : []);

                return (
                  <div key={project.id} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition">
                    {displayImages.length > 0 ? (
                    <ImageCarousel images={displayImages} title={project.title} />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Pas d'image disponible</p>
                    </div>
                  )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-primary">{project.title}</h3>
                      <p className="text-foreground/80">{project.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60">Aucune réalisation disponible pour le moment.</p>
            </div>
          )}
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
