import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function EnduitsFinitionsMons() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>
          Enduits & finitions à Mons – Lissage murs et plafonds | Rommelaere Rénov
        </title>

        <meta
          name="description"
          content="Rommelaere Rénov réalise vos enduits, lissage et finitions intérieures à Mons, Dour, Quévy et dans le Borinage. Murs et plafonds prêts à peindre, retouches soignées, rendu impeccable."
        />

        <meta
          name="keywords"
          content="enduit Mons, enduits muraux Mons, lissage mur Mons, finitions intérieures Mons, retouche enduit Mons, murs prêts à peindre Mons"
        />

        <link
          rel="canonical"
          href="https://rommelaere-renov.be/enduits-finitions-mons"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Enduits & finitions à Mons – Lissage murs et plafonds"
        />
        <meta
          property="og:description"
          content="Enduits, lissage et finitions intérieures à Mons, Dour et Quévy. Travail propre, rendu uniforme, murs prêts à peindre."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rommelaere-renov.be/enduits-finitions-mons"
        />
        <meta
          property="og:image"
          content="https://rommelaere-renov.be/image2vector.svg"
        />
        <meta property="og:locale" content="fr_BE" />
        <meta property="og:site_name" content="Rommelaere Rénov" />
      </Helmet>

      <Navigation />

      {/* HERO */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Enduits & finitions à Mons – murs et plafonds prêts à peindre
          </h1>
          <p className="text-lg mb-4 text-primary-foreground/90">
            Après un chantier de gyproc, une rénovation ou une réparation, la
            qualité des finitions fait toute la différence.
          </p>
          <p className="text-base mb-6 text-primary-foreground/80">
            Rommelaere Rénov réalise vos enduits et finitions intérieures avec
            soin : lissage, retouches, correction de défauts et préparation des
            surfaces avant peinture dans la région de Mons, Dour et Quévy.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Demander un devis enduits & finitions
            </Button>
          </Link>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-12 bg-white">
        <div className="container max-w-5xl grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Enduits muraux et lissage intérieur
            </h2>
            <p className="mb-3 text-foreground/80">
              Nous appliquons des enduits de finition pour obtenir des surfaces
              lisses et uniformes. L’objectif : des murs et plafonds propres,
              sans irrégularités, prêts à être peints ou décorés.
            </p>
            <p className="mb-3 text-foreground/80">
              Nous intervenons aussi bien sur des pièces complètes que sur des
              zones ciblées : reprises, raccords, angles, joints, fissures ou
              défauts après travaux.
            </p>
            <p className="mb-3 text-foreground/80">
              Nos finitions sont particulièrement adaptées après une pose de
              plaques de plâtre (gyproc) ou une rénovation intérieure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Retouches, réparations et préparation avant peinture
            </h2>
            <p className="mb-3 text-foreground/80">
              Un petit défaut devient très visible une fois la peinture posée.
              C’est pourquoi nous accordons une attention particulière à la
              préparation : lissage, retouches d’enduit, réparation de zones
              abîmées et finitions propres.
            </p>
            <p className="mb-3 text-foreground/80">
              Nous travaillons de manière soignée et propre, avec une
              communication claire et un chantier suivi du début à la fin.
            </p>
            <p className="mb-3 text-foreground/80">
              Vous cherchez un artisan pour des enduits et finitions à Mons,
              Dour ou Quévy ? Contactez-nous et décrivez votre projet.
            </p>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Pourquoi choisir Rommelaere Rénov ?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4 text-foreground/80">
            <li>• Finitions soignées et rendu uniforme</li>
            <li>• Préparation idéale avant peinture</li>
            <li>• Retouches propres après gyproc et plafonnage</li>
            <li>• Délais respectés et chantier suivi</li>
            <li>• Intervention locale : Mons, Dour, Quévy & Borinage</li>
            <li>• Devis clair et gratuit</li>
          </ul>

          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Expliquer mon projet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ZONES */}
      <section className="py-12 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Zones d’intervention
          </h2>
          <p className="text-foreground/80 mb-4">
            Nous intervenons principalement pour vos enduits et finitions dans
            la région de :
          </p>
          <p className="text-foreground/80">
            <strong>
              Mons, Dour, Quévy, Binche, Frameries, Saint-Ghislain, Quaregnon,
              Colfontaine et alentours.
            </strong>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-white py-6 mt-auto">
        <div className="container text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Rommelaere Rénov. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
