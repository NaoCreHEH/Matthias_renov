# Rommelaere Rénov - TODO

## Fonctionnalités principales

- [x] Design et branding (couleurs bleu marine + rouge)
- [x] Page d'accueil avec présentation et CTA
- [x] Page Services avec contenu modifiable
- [x] Page À propos
- [x] Page Réalisations/Portfolio
- [x] Page Contact avec formulaire
- [x] Système de gestion de contenu (CMS) - Interface admin
- [ ] Galerie d'images modifiable (à améliorer avec upload S3)
- [x] Préparation pour authentification clients (login devis)
- [x] Responsive design
- [ ] SEO de base (meta tags)

## Contenu de démonstration

- [x] Textes pour les services
- [x] Textes pour la page à propos
- [ ] Images de démonstration pour réalisations
- [x] Informations de contact (téléphone, email)

## Infrastructure

- [x] Schéma de base de données pour contenu
- [x] API pour gérer le contenu (tRPC)
- [ ] Système de stockage d'images (S3) - À intégrer pour upload admin


## Nouvelles demandes

- [x] Ajouter le lien Facebook dans le footer
- [x] Intégrer les images réelles des projets
- [x] Mettre à jour les descriptions des réalisations avec textes professionnels
- [x] Remplacer l'icône marteau par le logo RR
- [x] Ajouter une section "Qui sommes-nous" avec photo de Matthias


## Nouvelles demandes (Phase 2)

- [x] Extraire les archives RAR (chambre, crépi, caisson, suite parentale)
- [x] Créer un carrousel de photos pour chaque projet
- [x] Intégrer les photos dans le carrousel
- [x] Préparer un fichier ZIP du projet pour export
- [x] Préparer un fichier de base de données pour export Render


## Phase 3 - Intégration GitHub et Page Témoignages

- [ ] Analyser les modifications du repository GitHub
- [ ] Créer la table testimonials dans le schéma
- [ ] Créer la page Testimonials.tsx
- [ ] Créer la page AdminTestimonials.tsx
- [ ] Ajouter les routes dans App.tsx
- [ ] Ajouter le lien dans Navigation.tsx
- [ ] Créer les procédures tRPC pour les témoignages
- [ ] Ajouter les données de démonstration
- [ ] Générer le listing des modifications


## Bugs et Améliorations à Corriger

- [x] Implémenter le formulaire d'ajout d'utilisateurs dans AdminUsers
- [x] Permettre l'upload d'images (pas juste URL) pour les projets
- [x] Créer la page AdminTestimonials (404 actuellement)
- [x] Améliorer le responsive du menu avec sous-menus
- [x] Corriger les problèmes de responsive (mots qui s'entremêlent)


## Corrections Phase 4 - Carrousel d'images et redirection login

- [x] Créer table projectImages pour gérer plusieurs images par projet
- [x] Corriger la redirection après login vers /admin
- [x] Améliorer AdminProjects pour ajouter/supprimer images individuellement
- [x] Afficher les images en carrousel sur la page publique Projects
