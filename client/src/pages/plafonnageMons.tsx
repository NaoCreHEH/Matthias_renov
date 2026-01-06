import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function PlafonnageMons() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>
          Plafonnage à Mons – Enduits & finitions murales | Rommelaere Rénov
        </title>
        <meta
          name="description"
          content="Rommelaere Rénov réalise vos travaux de plafonnage, enduits et retouches murales à Mons, Dour, Quévy et dans le Borinage. Finitions soignées et murs prêts à peindre."
        />
        <meta
          name="keywords"
          content="plafonnage Mons, plafonneur Mons, enduits muraux Mons, retouche plafonnage Mons, rénovation murs Mons"
        />
        <link
          rel="canonical"
          href="https://rommelaere-renov.be/plafonnage-mons"
        />
      </Helmet>

      <Navigation />

      {/* HERO */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Plafonnage à Mons – Enduits, lissage et finitions murales
          </h1>
          <p className="text-lg mb-4 text-primary-foreground/90">
            Rommelaere Rénov réalise vos travaux de plafonnage intérieur avec
            soin et précision dans la région de Mons, Dour, Quévy et le
            Borinage.
          </p>
          <p className="text-base mb-6 text-primary-foreground/80">
            Que ce soit pour un mur abîmé, une rénovation complète ou une
            préparation avant peinture, nous assurons des surfaces lisses,
            droites et prêtes à être décorées.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Demander un devis plafonnage
            </Button>
          </Link>
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <section className="py-12 bg-white">
        <div className="container max-w-5xl grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Travaux de plafonnage intérieur soignés
            </h2>
            <p className="mb-3 text-foreground/80">
              Le plafonnage est une étape essentielle dans toute rénovation
              intérieure. Il permet d&apos;obtenir des murs et plafonds
              parfaitement lisses, prêts à peindre ou à tapisser.
            </p>
            <p className="mb-3 text-foreground/80">
              Nous intervenons aussi bien pour des rénovations complètes que
              pour des retouches localisées : fissures, murs abîmés,
              irrégularités ou reprises après travaux.
            </p>
            <p className="mb-3 text-foreground/80">
              Chaque chantier est réalisé avec précision, propreté et respect
              des délais, que ce soit à Mons, Dour, Quévy ou dans les communes
              voisines.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Enduits, lissage et retouches de plafonnage
            </h2>
            <p className="mb-3 text-foreground/80">
              Nous réalisons tous types d&apos;enduits et de finitions murales :
              lissage complet, correction de défauts, reprises après pose de
              gyproc ou après dépose d&apos;anciens revêtements.
            </p>
            <p className="mb-3 text-foreground/80">
              Les surfaces sont préparées avec soin afin de garantir un rendu
              final uniforme et durable, idéal avant peinture ou décoration.
            </p>
          </div>
        </div>
      </section>

      {/* ZONES D’INTERVENTION */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Zones d&apos;intervention pour le plafonnage
          </h2>
          <p className="mb-4 text-foreground/80">
            Nous réalisons vos travaux de plafonnage intérieur principalement à :
          </p>
          <p className="mb-6 text-foreground/80">
            <strong>
              Mons, Dour, Quévy, Binche, Frameries, Saint-Ghislain, Colfontaine,
              Quaregnon et le Borinage.
            </strong>
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Expliquer mon projet de plafonnage
            </Button>
          </Link>
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
