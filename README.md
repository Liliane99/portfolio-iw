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

ADMINISTRATEUR : (LE BOUTON DECONNEXION EST TOUT EN BAS SUR LA SIDEBAR)

CONNEXION : 
EMAIL : amin.nairi@myges.fr
Mot de passe : Amin

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

USER CLASSIQUE : 
<img width="1461" alt="Capture d’écran 2025-05-02 à 14 37 57" src="https://github.com/user-attachments/assets/0b7b17ea-ad69-42a0-b7ca-71b9a0bd7946" />
<img width="1461" alt="Capture d’écran 2025-05-02 à 14 37 40" src="https://github.com/user-attachments/assets/c9f3049c-a16a-4dcf-b883-dccf9aa9388a" />



ADMINISTRATEUR :
<img width="1461" alt="Capture d’écran 2025-05-02 à 14 37 09" src="https://github.com/user-attachments/assets/ed152ff9-a2de-462c-af3c-58aafe79da1f" />
<img width="1461" alt="Capture d’écran 2025-05-02 à 14 35 45" src="https://github.com/user-attachments/assets/6c0e6d7e-2610-4b06-934a-d8817c04cb96" />
<img width="1461" alt="Capture d’écran 2025-05-02 à 14 36 02" src="https://github.com/user-attachments/assets/4d76b328-68ef-45b6-aecb-a347139d451c" />
<img width="1461" alt="Capture d’écran 2025-05-02 à 14 36 44" src="https://github.com/user-attachments/assets/a537e318-a95f-4160-a0ca-7f24e10268fb" />
<img width="1461" alt="Capture d’écran 2025-05-02 à 14 36 56" src="https://github.com/user-attachments/assets/a70160c5-fce3-44b7-855d-b2fb6ed376a8" />




