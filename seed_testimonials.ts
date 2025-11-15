import { getDb } from "./server/db";
import { testimonials } from "./drizzle/schema";

const sampleTestimonials = [
  {
    clientName: "Jean Dupont",
    clientRole: "Propriétaire",
    projectType: "Aménagement de combles",
    content:
      "Rommelaere Rénov a transformé nos combles en une magnifique chambre. Travail impeccable, équipe professionnelle et respectueuse des délais. Je recommande vivement !",
    rating: 5,
    order: 1,
    isPublished: true,
  },
  {
    clientName: "Marie Lefevre",
    clientRole: "Entrepreneur",
    projectType: "Crépi sur façade",
    content:
      "Excellent travail ! L'équipe a rénové la façade de notre maison avec une finition impeccable. Les détails ont été soignés et le résultat dépasse nos attentes.",
    rating: 5,
    order: 2,
    isPublished: true,
  },
  {
    clientName: "Pierre Martin",
    clientRole: "Propriétaire",
    projectType: "Gyproc et cloisons",
    content:
      "Service rapide et efficace. Les cloisons en gyproc ont été installées sans problème. L'équipe était courtoise et l'espace de travail était toujours propre.",
    rating: 4,
    order: 3,
    isPublished: true,
  },
  {
    clientName: "Sophie Bernard",
    clientRole: "Propriétaire",
    projectType: "Suite parentale",
    content:
      "Nous avons transformé notre grenier en une suite parentale luxueuse grâce à Rommelaere Rénov. Le résultat est spectaculaire et nous sommes très satisfaits.",
    rating: 5,
    order: 4,
    isPublished: true,
  },
  {
    clientName: "Luc Rousseau",
    clientRole: "Propriétaire",
    projectType: "Isolation et plafonnage",
    content:
      "Très bon rapport qualité-prix. L'isolation a amélioré le confort thermique de notre maison. L'équipe a été très professionnelle du début à la fin.",
    rating: 4,
    order: 5,
    isPublished: true,
  },
  {
    clientName: "Claire Moreau",
    clientRole: "Propriétaire",
    projectType: "Retouche sur plafonnage",
    content:
      "Petit travail de retouche mais grand professionnalisme. L'équipe a terminé rapidement et le résultat est parfait. Merci Rommelaere Rénov !",
    rating: 5,
    order: 6,
    isPublished: true,
  },
];

async function seedTestimonials() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  try {
    console.log("Insertion des témoignages de démonstration...");

    for (const testimonial of sampleTestimonials) {
      await db.insert(testimonials).values(testimonial);
    }

    console.log(`✅ ${sampleTestimonials.length} témoignages insérés avec succès !`);
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de l'insertion des témoignages :", error);
    process.exit(1);
  }
}

seedTestimonials();
