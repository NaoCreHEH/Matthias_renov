import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function ZonesIntervention() {
  return (
    <>
      <Helmet>
        <title>
          Zones d’intervention – Rénovation intérieure à Mons, Dour et Quévy | Rommelaere Rénov
        </title>

        <meta
          name="description"
          content="Rommelaere Rénov intervient pour vos travaux de rénovation intérieure à Mons, Dour, Quévy et dans le Borinage : gyproc, plafonnage, enduits, isolation et finitions."
        />

        <link
          rel="canonical"
          href="https://www.rommelaere-renov.be/zones-intervention-renovation-mons"
        />

        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Zones d’intervention – Rénovation intérieure à Mons et Borinage"
        />
        <meta
          property="og:description"
          content="Entreprise de rénovation intérieure active à Mons, Dour, Quévy et dans le Borinage. Gyproc, plafonnage, enduits et finitions."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.rommelaere-renov.be/zones-intervention-renovation-mons"
        />
        <meta
          property="og:image"
          content="https://www.rommelaere-renov.be/image2vector.svg"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />

        {/* Header */}
        <section className="bg-primary text-white py-16">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">
              Zones d’intervention pour vos travaux de rénovation intérieure
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Rommelaere Rénov est une entreprise de rénovation intérieure active à
              Mons, Dour, Quévy et dans l’ensemble du Borinage.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container max-w-4xl space-y-10">

            <p className="text-foreground/80">
              Nous accompagnons les particuliers pour tous leurs projets de rénovation
              intérieure : pose de gyproc, plafonnage, enduits, isolation intérieure,
              aménagement de combles et finitions. Chaque chantier est réalisé avec soin,
              dans une logique de proximité et de suivi personnalisé.
            </p>

            {/* Mons */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Rénovation intérieure à Mons
              </h2>
              <p className="text-foreground/80">
                À Mons, nous réalisons régulièrement des travaux de rénovation intérieure
                pour maisons et appartements : cloisons en gyproc, plafonnage,
                enduits muraux, isolation et finitions soignées.
              </p>
            </div>

            {/* Dour */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Travaux de rénovation à Dour
              </h2>
              <p className="text-foreground/80">
                À Dour, Rommelaere Rénov intervient pour des projets de rénovation
                intérieure adaptés aux habitations locales, avec une attention
                particulière portée à la qualité des finitions.
              </p>
            </div>

            {/* Quévy */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Rénovation intérieure à Quévy
              </h2>
              <p className="text-foreground/80">
                Nous proposons également nos services de rénovation intérieure à
                Quévy et dans les communes avoisinantes, pour améliorer le confort
                et l’esthétique de vos espaces de vie.
              </p>
            </div>

            {/* Borinage */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Interventions dans le Borinage et les alentours
              </h2>
              <p className="text-foreground/80">
                En plus de Mons, Dour et Quévy, nous intervenons dans l’ensemble du
                Borinage, notamment à Saint-Ghislain, Frameries, Quaregnon et
                Colfontaine. Contactez-nous pour vérifier notre disponibilité
                dans votre commune.
              </p>
            </div>

            {/* Services links */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-xl font-bold mb-4 text-primary">
                Nos services de rénovation intérieure
              </h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>
                  <Link href="/gyproc-mons" className="text-primary underline">
                    Pose de gyproc et cloisons
                  </Link>
                </li>
                <li>
                  <Link href="/plafonnage-mons" className="text-primary underline">
                    Plafonnage et retouches
                  </Link>
                </li>
                <li>
                  <Link href="/enduits-finitions-mons" className="text-primary underline">
                    Enduits et finitions intérieures
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center pt-10">
              <p className="text-lg font-semibold mb-4">
                Vous avez un projet de rénovation intérieure dans votre région ?
              </p>
              <Link
                href="/contact"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition"
              >
                Demander un devis gratuit
              </Link>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-white py-8 mt-auto">
          <div className="container text-center">
            <p>&copy; {new Date().getFullYear()} Rommelaere Rénov. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
