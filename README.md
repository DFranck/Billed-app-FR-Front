
# Mise en place de la fonctionnalité “Notes de frais”

## Contexte 
- Départ imprévu de Garance qui travaillait initialement sur le projet et remplacement au pied levé.
- Fonctionnalité très attendue avec un timing serré prévu pour un lancement dans deux semaines.
- Deux parcours sur la fonctionnalité : 
  1. Employé 
  2. Administrateur RH.

### État actuel de la fonctionnalité

#### Parcours employé
- **Back-end**: ✅ Prêt en version alpha 
- **Front-end**: 
  - ❌ À tester
  - ❌ À débugger

#### Parcours administrateur
- **Back-end**: ✅ Prêt en version alpha 
- **Front-end**: 
  - ✅ Testé
  - ❌ À débugger

## Équipe et missions

- **Matthieu**: Lead developer
  - Supervise le projet
- **Remplaçant(e) de Garance**: Front-end developer
  - Débugge et teste la fonctionnalité
- **Leïla**: Quality assurance 
  - Identifie les bugs
  - Réalise les tests End-to-End
- **Feature team**: 
  - A développé, débuggé et testé une partie de la fonctionnalité

## Tâches à réaliser 

<!-- (Notion Link : https://openclassrooms.notion.site/a7a612fc166747e78d95aa38106a55ec?v=2a8d3553379c4366b6f66490ab8f0b90&p=3dab018b63244f628f66d1dc816bea7b&pm=s) -->

- [x] **Bug - report**: Fixer les bugs identifiés dans le rapport de bug fourni par Jest. 
   - [x] *Bug - report - Bills* **FIXED** => Ajout d'un tri dans src\views\BillsUI.js
   - [x] *Bug - report - Login* **FIXED** => Mauvaise selection des data-testid admin. ils ciblaient employee dans src\containers\Login.js

- [x] **Bug - hunt**: Fixer les bugs identifiés par Leila sur le parcours employé.
   - [x] *Bug - hunt - Bills* **FIXED** => Ajout d'une fonction qui verifie l'extension du fichier et empeche son chargement si celle ci est invalide (not jpg, jpeg, png) dans src\containers\NewBill.js
   - [x] *Bug - hunt - Dashboard* **FIXED** => Ajout d'une methode .off('click') pour ne pas avoir un evenement clic dupliqué sur les bill qui les refermes instantanement ce qui donne cette impression qu'on ne l'ouvre pas dans src\containers\Dashboard.js. En effet lorsque l'on clic sur une bill elle est loggé correctement donc passer a la fonction display correctement. mais si on ouvre un chiffre pair de list les premiere list recoive un chiffre pair d'event clic et se referme toute seule.

- [x] **Tests unitaires et d’intégration**: Ajouter des tests unitaires et d’intégration pour les fichiers Bills et NewBill.
   - [x] *Test - composant views/Bills* **TESTED** dans src\__tests__\Bills.js j'ai tester si l'icone avec bien la class souhaité (la class active-icon)
   - [x] *Test - composant container/Bills* **TESTED** dans src\__tests__\Bills.js j'ai tester getBills a qui j'ai ajouter dans src\containers\Bills.js une gestion des erreurs 404 et 500 pour les tester.
   - [x] *Test - composant container/NewBill* **TESTED** dans src\__tests__\NewBill.js j'ai tester les fonctions handleChangeFile et handleSubmit.
  - Assurer un taux de couverture global des containers de 80% minimum (tests unitaires ET tests d’intégration).
  - **Conseils**: 
    - S'appuyer sur le rapport de couverture de Jest.
    - S’assurer d’utiliser des matchers pertinents.
    - Ne pas oublier de tester les erreurs 404 et 500.
    - Ressources supplémentaires: [Rapport de couverture de Jest](http://127.0.0.1:8080/coverage/lcovreport/)

- [x] **Test End-to-End**: Rédiger un plan de test End-to-End (E2E) sur le parcours employé pour guider Leïla. 
  - **Note**: Les tests E2E seront effectués manuellement par Leila.

## Autres informations
- L'application contient déjà des données test mais il est nécessaire d'en créer de nouvelles.
- Des comptes administrateur et employé ont été créés pour les tests. Utiliser ces comptes pour charger une note de frais côté employé et la consulter côté administrateur RH.

## Comptes et utilisateurs :

Vous pouvez vous connecter en utilisant les comptes:

### administrateur : 
```
utilisateur : admin@test.tld
mot de passe : admin
```
### employé :
```
utilisateur : employee@test.tld
mot de passe : employee
```
