import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function GyprocMons() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Pose de gyproc à Mons – Cloisons & faux plafonds | Rommelaere Rénov</title>
        <meta
          name="description"
          content="Rommelaere Rénov réalise la pose de gyproc, cloisons, faux plafonds et caissons sur mesure à Mons, Dour, Quévy et environs. Travail soigné, finitions propres et devis gratuit."
        />
        <meta
          name="keywords"
          content="gyproc Mons, pose gyproc Mons, cloisons gyproc Mons, faux plafonds Mons, rénovation intérieure Mons"
        />
        <meta property="og:title" content="Pose de gyproc à Mons – Cloisons & faux plafonds" />
        <meta
          property="og:description"
          content="Cloisons, faux plafonds et caissons en gyproc à Mons, Dour et Quévy. Finitions propres et chantier soigné."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rommelaere-renov.be/gyproc-mons" />
        <meta property="og:image" content="/image2vector.svg" />
      </Helmet>

      <Navigation />

      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
          <div className="container max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Pose de gyproc à Mons – Cloisons, faux plafonds & caissons
            </h1>
            <p className="text-lg mb-4 text-primary-foreground/90">
              Rommelaere Rénov réalise la pose de gyproc et la création de cloisons, faux plafonds
              et caissons sur mesure dans la région de Mons, Dour et Quévy.
            </p>
            <p className="text-base mb-6 text-primary-foreground/80">
              Nous travaillons pour des rénovations complètes comme pour de plus petits projets :
              séparation de pièces, création d&apos;un couloir, habillage de murs, coffrage de
              tuyauteries ou intégration d&apos;éclairages dans un faux plafond.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Demander un devis gyproc
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container max-w-5xl grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Cloisons en gyproc et redistribution d&apos;espaces
              </h2>
              <p className="mb-3 text-foreground/80">
                Besoin de séparer une grande pièce, de créer un bureau, une chambre supplémentaire
                ou un dressing ? Nous construisons des cloisons en gyproc adaptées à votre
                habitation, avec une structure solide, des joints soignés et une finition prête à
                peindre.
              </p>
              <p className="mb-3 text-foreground/80">
                Nous travaillons principalement à Mons, Dour, Quévy, Binche et dans le Borinage,
                avec un souci particulier pour la propreté du chantier et le respect des délais.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Faux plafonds et caissons sur mesure
              </h2>
              <p className="mb-3 text-foreground/80">
                Les faux plafonds en gyproc permettent d&apos;intégrer des spots LED, de cacher des
                gaines techniques ou d&apos;améliorer l&apos;isolation acoustique et thermique. Nous
                réalisons aussi des caissons pour masquer des tuyaux, conduits de ventilation ou
                autres éléments peu esthétiques.
              </p>
              <p className="mb-3 text-foreground/80">
                Chaque caisson est réalisé sur mesure, avec une structure stable et des finitions
                propres, prêtes à être peintes ou décorées.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container max-w-5xl">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Zones d&apos;intervention pour vos travaux de gyproc
            </h2>
            <p className="mb-3 text-foreground/80">
              Nous intervenons pour vos travaux de gyproc et de cloisons principalement à :
              <br />
              <strong>Mons, Dour, Quévy, Binche, Frameries, Saint-Ghislain, Colfontaine, Quaregnon
                et les environs.</strong>
            </p>
            <p className="mb-6 text-foreground/80">
              Vous avez un projet en dehors de ces communes ? N&apos;hésitez pas à nous contacter,
              nous verrons ensemble ce qui est possible.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Expliquer mon projet
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-6">
        <div className="container text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Rommelaere Rénov. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
