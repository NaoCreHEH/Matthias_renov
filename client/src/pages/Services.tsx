import Navigation from "@/components/Navigation";
import { trpc } from "@/lib/trpc";
import { Wrench } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

const serviceLinks: Record<string, string> = {
  gyproc: "/gyproc-mons",
  plafonnage: "/plafonnage-mons",
  enduit: "/enduits-finitions-mons",
  enduits: "/enduits-finitions-mons",
  finitions: "/enduits-finitions-mons",
};


export default function Services() {
  const { data: services, isLoading } = trpc.content.getServices.useQuery();

  return (
    <>
      <Helmet>
        <title>
          Services de rénovation intérieure à Mons – Gyproc, plafonnage & isolation | Rommelaere Rénov
        </title>
        <link rel="canonical" href="https://rommelaere-renov.be/services" />

        <meta
          name="description"
          content="Découvrez les services de Rommelaere Rénov : gyproc, cloisons, plafonnage, isolation intérieure, aménagement de combles et finitions dans la région de Mons, Dour, Quévy et le Borinage."
        />
        <meta
          name="keywords"
          content="services rénovation Mons, gyproc Mons, plafonnage Mons, isolation intérieure Mons, aménagement de combles Mons, rénovation Dour, rénovation Quévy"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Services de rénovation intérieure à Mons – Gyproc, plafonnage & isolation"
        />
        <meta
          property="og:description"
          content="Rommelaere Rénov propose des services complets de rénovation intérieure : gyproc, plafonnage, isolation, aménagement de combles et finitions dans la région de Mons."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rommelaere-renov.be/services" />
        <meta property="og:image" content="/image2vector.svg" />
        <meta property="og:locale" content="fr_BE" />
        <meta property="og:site_name" content="Rommelaere Rénov" />

      </Helmet>

      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />

        {/* Header */}
        <section className="bg-primary text-white py-16">
          <div className="container">
            {/* H1 optimisé SEO */}
            <h1 className="text-4xl font-bold mb-4">
              Nos services de rénovation intérieure à Mons, Dour et Quévy
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-3">
              Gyproc, plafonnage, isolation, aménagement de combles et finitions soignées.
            </p>
            <p className="text-base text-primary-foreground/80 max-w-2xl">
              Rommelaere Rénov vous accompagne pour tous vos travaux de rénovation intérieure
              dans la région de Mons et du Borinage : création de cloisons, faux plafonds, retouches
              de plafonnage, isolation intérieure et aménagement d&apos;espaces.
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
                {services.map((service) => {
                  const serviceKey = Object.keys(serviceLinks).find((key) =>
                    service.title.toLowerCase().includes(key)
                  );

                  return (
                    <div
                      key={service.id}
                      className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition"
                    >
                      <div className="mb-4">
                        {service.icon ? (
                          <div className="text-accent text-4xl">{service.icon}</div>
                        ) : (
                          <Wrench className="text-accent" size={32} />
                        )}
                      </div>

                      <h2 className="text-2xl font-bold mb-3 text-primary">{service.title}</h2>

                      <p className="text-foreground/80 mb-4">{service.description}</p>

                      {serviceKey && (
                        <Link href={serviceLinks[serviceKey]}>
                          <button className="mt-2 text-primary underline hover:text-accent">
                            En savoir plus →
                          </button>
                        </Link>
                      )}
                    </div>
                  );
                })}

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
            <p>&copy; {new Date().getFullYear()} Rommelaere Rénov. Tous droits réservés.</p>
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
