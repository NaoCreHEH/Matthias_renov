import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { trpc } from "@/lib/trpc";
import {Helmet} from "react-helmet";

export default function Home() {
  const { data: contactInfo } = trpc.content.getContactInfo.useQuery();
  const { data: services } = trpc.content.getServices.useQuery();

  return (
    <>
      <Helmet>
        <title>
          Rénovation intérieure à Mons – Gyproc, plafonnage & isolation | Rommelaere Rénov
        </title>

        <meta
          name="description"
          content="Rommelaere Rénov est une entreprise de rénovation intérieure spécialisée en gyproc, plafonnage, enduits et isolation dans la région de Mons, Dour et Quévy. Travail soigné, devis gratuit et suivi de chantier professionnel."
        />

        {/* Open Graph (Facebook, Messenger, WhatsApp) */}
        <meta property="og:title"
              content="Rénovation intérieure à Mons – Gyproc, plafonnage & isolation | Rommelaere Rénov" />
        <meta property="og:description"
              content="Artisan spécialisé en gyproc, plafonnage, aménagement de combles et isolation à Mons, Dour et Quévy. Travail propre et finitions de qualité." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rommelaere-renov.be" />
        <meta property="og:image" content="/image2vector.svg" />
        <meta property="og:locale" content="fr_BE" />

        {/* Mots-clés (SEO old-school mais encore utile dans ta niche locale) */}
        <meta
          name="keywords"
          content="rénovation Mons, rénovation intérieure Mons, gyproc Mons, plafonnage Mons, isolation Mons, rénovation Dour, rénovation Quévy, pose de gyproc Mons, plafonneur Mons"
        />

        {/* Langue */}
        <meta httpEquiv="Content-Language" content="fr-BE" />
        <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "Rommelaere Rénov",
        "url": "https://www.rommelaere-renov.be",
        "image": "https://www.rommelaere-renov.be/image2vector.svg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mons",
          "addressRegion": "Hainaut",
          "addressCountry": "BE"
        },
        "areaServed": [
          "Mons",
          "Dour",
          "Quévy",
          "Borinage",
          "Région de Mons",
          "Saint-Ghislain",
          "Colfontaine",
          "Frameries",
          "Quaregnon",
          "Hensies",
          "Wasmes"
        ],
        "telephone": "0032472654873",
        "description": "Entreprise de rénovation intérieure spécialisée en gyproc, plafonnage, isolation et aménagement de combles dans la région de Mons, Dour et Quévy."
         "sameAs": [
        "https://www.facebook.com/people/Rommelaere-Renov/100064883967078/"
      ],
      "knowsAbout": [
        "Gyproc",
        "Cloisons en plaques de plâtre",
        "Plafonnage",
        "Retouches de plafonnage",
        "Enduits muraux",
        "Isolation intérieure",
        "Aménagement de combles",
        "Faux plafonds",
        "Finitions intérieures",
        "Rénovation intérieure"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+32472654873",
          "contactType": "customer service",
          "areaServed": "BE",
          "availableLanguage": ["fr"]
        }
      ]      
        }
    `}
  </script>
      </Helmet>
    

    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {/* H1 optimisé SEO */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Rénovation intérieure à Mons, Dour et Quévy – Gyproc, plafonnage & isolation
              </h1>

              {/* Nom de l'entreprise en sous-titre */}
              <p className="text-xl mb-2 text-primary-foreground/90 font-semibold">
                Rommelaere Rénov – artisan local spécialisé en aménagement de combles
              </p>

              {/* Phrase métier + zone */}
              <p className="text-lg mb-4 text-primary-foreground/80">
                Nous réalisons vos travaux de gyproc, plafonnage, enduits, isolation et finitions intérieures
                dans toute la région de Mons, Dour et Quévy. Des combles aux pièces de vie, nous transformons
                vos espaces pour les rendre plus confortables, fonctionnels et lumineux.
              </p>

              {/* Petit paragraphe rassurant */}
              <p className="text-base mb-6 text-primary-foreground/80">
                Travail soigné, respect des délais et suivi de chantier personnalisé : Rommelaere Rénov est votre
                partenaire de confiance pour tous vos projets de rénovation intérieure, que ce soit une retouche
                sur plafonnage, la création de cloisons en gyproc ou l&apos;aménagement complet d&apos;un étage.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Voir nos réalisations
                  </Button>
                </Link>
              </div>

              {/* Zones d'intervention directement visibles */}
              <p className="mt-4 text-sm text-primary-foreground/80">
                Interventions dans : Mons, Dour, Quévy et alentours (Borinage, région de Mons).
              </p>
            </div>
            <div className="hidden md:flex justify-center">
              <img
                src="/image2vector.svg"
                alt="Travaux de gyproc et plafonnage par Rommelaere Rénov à Mons"
                className="w-64 h-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous choisir */}
      <section className="py-14 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Une entreprise de rénovation intérieure locale et professionnelle
          </h2>
          <p className="text-foreground/80 text-center mb-6">
            Rommelaere Rénov est une entreprise de rénovation intérieure à taille humaine, basée dans la
            région de Mons. Nous accompagnons les particuliers pour des projets de petite ou grande ampleur :
            aménagement de combles, pose de gyproc, retouches sur plafonnage, isolation intérieure et finitions.
          </p>
          <p className="text-foreground/80 text-center">
            Chaque chantier est suivi par le même interlocuteur, de la première visite au rendu final. Nous
            privilégions la qualité des matériaux, la propreté du travail et une communication claire avec nos
            clients, afin de garantir un résultat durable et soigné.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4 text-primary">
            Nos Services de rénovation intérieure
          </h2>
          <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-10">
            Gyproc, plafonnage, enduits, isolation intérieure, aménagement de combles et finitions :
            nous proposons des solutions complètes pour rénover vos intérieurs dans la région de Mons, Dour
            et Quévy. Découvrez ci-dessous quelques-uns de nos services.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {services?.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-foreground/80 mb-4">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Tous nos services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            Zones d&apos;intervention
          </h2>
          <p className="text-center text-foreground/80 mb-4">
            Nous intervenons principalement dans la région de Mons, Dour, Quévy et les communes
            avoisinantes. Si vous habitez dans le Borinage ou aux alentours de Mons, n&apos;hésitez pas à
            nous contacter pour vérifier si nous pouvons nous déplacer chez vous.
          </p>
          <p className="text-center text-foreground/80">
            Notre objectif : offrir un service de proximité, réactif et de qualité, avec un artisan qui
            connaît bien le terrain et les besoins des habitations locales.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Nous contacter pour votre projet
          </h2>
          <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-10">
            Vous avez un projet d&apos;aménagement de combles, de pose de gyproc, de retouche sur plafonnage
            ou d&apos;isolation intérieure ? Expliquez-nous votre situation et nous reviendrons vers vous
            rapidement avec une proposition adaptée.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo?.phone && (
              <div className="flex items-start gap-4">
                <Phone className="text-accent mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-primary hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            )}
            {contactInfo?.email && (
              <div className="flex items-start gap-4">
                <Mail className="text-accent mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-primary hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            )}
            {contactInfo?.address && (
              <div className="flex items-start gap-4">
                <MapPin className="text-accent mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Adresse</h3>
                  <p className="text-foreground/80">{contactInfo.address}</p>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p>&copy; 2024 Rommelaere Rénov. Tous droits réservés.</p>
            <p className="text-xs opacity-90 mt-1">
              Entreprise de rénovation intérieure spécialisée en gyproc, plafonnage et isolation – active à Mons, Dour et Quévy.
            </p>
          </div>
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
