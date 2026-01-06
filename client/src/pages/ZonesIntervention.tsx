import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function ZonesIntervention() {
  return (
    <>
      <Helmet>
       <title>
          Zones d’intervention – Rénovation intérieure à Mons, Dour, Quévy & Borinage | Rommelaere Rénov
        </title>


        <meta
          name="description"
         content="Rommelaere Rénov intervient pour vos travaux de rénovation intérieure à Mons, Dour, Quévy et dans le Borinage : gyproc, plafonnage, enduits, isolation et finitions."
     />

        <link
          rel="canonical"
          href="https://rommelaere-renov.be/zones-intervention-renovation-mons"
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
          content="https://rommelaere-renov.be/zones-intervention-renovation-mons"
        />
        <meta
          property="og:image"
          content="https://rommelaere-renov.be/image2vector.svg"
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
      Nous intervenons pour l’ensemble de nos services de rénovation intérieure.
      Gyproc, plafonnage, enduits, isolation et finitions sont réalisés avec le même soin,
      quelle que soit votre commune.
    </p>

    {/* ✅ Bloc communes (à ajouter ici) */}
    <div className="bg-gray-50 border border-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-primary mb-3">
        Communes desservies
      </h2>
      <p className="text-foreground/80 mb-3">
        Nous intervenons principalement dans la région de Mons et du Borinage, notamment à :
      </p>
      <p className="text-foreground/80">
        <strong>
          Mons, Dour, Quévy, Saint-Ghislain, Frameries, Quaregnon, Colfontaine, Hensies, Binche
        </strong>{" "}
        (et alentours).
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
