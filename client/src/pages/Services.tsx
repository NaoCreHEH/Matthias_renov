import Navigation from "@/components/Navigation";
import { trpc } from "@/lib/trpc";
import { Wrench } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Helmet } from "react-helmet";

export default function Services() {
  const { data: services, isLoading } = trpc.content.getServices.useQuery();

  return (
    <>
    <Helmet>
  <title>Nos services – Rénovation intérieure à Mons | Gyproc, plafonnage & isolation</title>
  <meta
    name="description"
    content="Découvrez nos services de rénovation intérieure : gyproc, plafonnage, isolation, aménagement de combles et finitions. Intervention dans la région de Mons, Dour et Quévy."
  />
  <meta name="robots" content="index, follow" />
</Helmet>
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Nos Services</h1>
          <p className="text-xl text-primary-foreground/90">
            Découvrez l'ensemble de nos services spécialisés en aménagement de combles
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">Chargement des services...</p>
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition">
                  <div className="mb-4">
                         {/* Logique d'affichage de l'icône/emoji/texte */}
                    {service.icon ? (
                      // Si c'est un emoji ou un texte, on l'affiche en grand
                      <div className="text-accent text-4xl">
                        {service.icon}
                      </div>
                    ) : (
                      // Sinon, on utilise l'icône Wrench par défaut
                      <Wrench className="text-accent" size={32} />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary">{service.title}</h3>
                  <p className="text-foreground/80">{service.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60">Aucun service disponible pour le moment.</p>
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
    </>
  );
}
