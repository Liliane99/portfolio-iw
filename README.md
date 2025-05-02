# Portfolio-iw
Ce projet est un portfolio de la filière IW

Cette application est un portfolio de la filière IW. 
Vous trouverez tous les porjets de la filière avec les détails (étudiants, technologies, etc). 
Il y a aussi un back office d’administration qui permets de publier ou dépublier un projet mais aussi de voir la répartition des likes par projets. Elle permet donc à un administrateur connecté de visualiser, rechercher, publier et dépublier des projets dynamiquement.

# Fonctionnalités principales
USER CLASSIQUE : 
- Visualisation des projets publié.
- Filtrer sur les projets par module, niveau et semestre (s1 ou s2).
- Rechercher un projet.
- Mettre un j'aime à un projet.

ADMINISTRATEUR :

- Authentification (redirection automatique vers la page de login si le token est absent) et déconnexion.

- Liste des projets (récupération et affichage de projets depuis /api/projects).

- Recherche en temps réel (filtre les projets par nom).

- Publication/Dépublication (active ou désactive la visibilité d’un projet pour un user classique).

- Tableau des répartition des likes par projet.
- Interface user classique (client side).


# Stack utilisée
Next.js 14+

React 19

ShadCN UI (toast, skeleton, badge, card, button…)

API REST customisée (/api/projects - /api/projects/:id - /api/auth/login)

Cookies (js-cookie) pour la gestion du token d’authentification


# Aperçu visuel



