// eslint-disable-next-line import/no-anonymous-default-export
export default {
  breadcrumbs: {
    home: "Accueil",
    settings: "Paramètres",
    users: "Utilisateurs",
    roles: "Rôles",
    modules: "Modules",
    moduleElements: "Éléments du module",
    roleModuleElements: "Éléments du module de rôle",
  },
  shared: {
    save: "Enregistrer",
    cancel: "Annuler",
    yes: "Oui",
    no: "Non",
    exportPDF: "Exporter en PDF",
    welcome: "Bienvenue !",
    shortcut: "Raccourcis",
    logout: "Déconnexion",
    login: "Se connecter",
    create: "Créer",
    edit: "Modifier",
    delete: "Supprimer",
    disable: "Désactiver",
    view: "Visualiser",
    actions: "Actions",
    page: "Page",
    enables: "Actifs",
    disables: "Inactifs",
    noValues: "Aucune valeur trouvée.",
    changePassword: {
      title: "Modifier le mot de passe",
    },
  },
  login: {
    user: "Utilisateur",
    password: "Mot de passe",
  },
  table: {
    noResults: "Aucun résultat.",
    columns: "Colonnes",
    page: "Page",
    of: "de",
    goToPage: "| Aller à la page : ",
    totalRows: "Résultats ",
  },
  users: {
    title: "Utilisateurs",
    user: "Utilisateur",
    pageTitle: "Page des utilisateurs",
    create: "Créer un utilisateur",
    columns: {
      userId: "ID",
      userName: "Utilisateur",
      roleName: "Rôle",
      isEnabled: "Actif",
    },
    form: {
      userName: "Nom d'utilisateur",
      password: "Mot de passe",
      repeatPassword: "Répéter le mot de passe",
      role: "Rôle",
      isEnabled: "Utilisateur actif",
    },
    notifications: {
      createSuccess: "Utilisateur créé avec succès",
      createError:
        "Une erreur s'est produite pendant la création de l'utilisateur",
      createFailure: "Échec de la création de l'utilisateur",
      updateSuccess: "Utilisateur modifié avec succès",
      updateError:
        "Une erreur s'est produite pendant la modification de l'utilisateur",
      updateFailure: "Échec de la modification de l'utilisateur",
      disableSuccess: "Utilisateur désactivé  avec succès",
      disableError:
        "Une erreur s'est produite pendant la désactivation de l'utilisateur",
      disableFailure: "Échec de la désactivation de l'utilisateur",
      updatePasswordSuccess: "Mot de passe modifié avec succès",
      updatePasswordError:
        "Une erreur s'est produite pendant la modification du mot de passe",
      updatePasswordFailure: "Échec de la modification du mot de passe",
    },
    deleteModal: {
      title: "Êtes-vous sûr de désactiver l'utilisateur ?",
      description:
        "L'utilisateur sera désactivé et il n'aura plus accès au logiciel",
    },
    validation: {
      password: "Le mot de passe doit contenir au moins 8 lettres",
      repeatPassword: "Les mots de passe ne correspondent pas",
    },
    changePassword: {
      title: "Modifier le mot de passe",
      nonUserError: "L'utilisateur n'a pas été trouvé",
    },
  },
  roles: {
    title: "Rôles",
    role: "Rôle",
    pageTitle: "Page des Rôles",
    create: "Créer un rôle",
    columns: {
      roleId: "ID",
      name: "Nom du rôle",
      isEnabled: "Actif",
    },
    form: {
      name: "Nom du rôle",
      isEnabled: "Rôle actif",
    },
    notifications: {
      createSuccess: "Rôle créé avec succès",
      createError: "Une erreur s'est produite pendant la création du rôle",
      createFailure: "Échec de la création du rôle",
      updateSuccess: "Rôle modifié avec succès",
      updateError: "Une erreur s'est produite pendant la modification du rôle",
      updateFailure: "Échec de la modification du rôle",
      deleteSuccess: "Rôle supprimé avec succès",
      deleteError: "Une erreur s'est produite pendant la suppression du rôle",
      deleteFailure: "Échec de la suppression du rôle",
      disableSuccess: "Rôle désactivé avec succès",
      disableError:
        "Une erreur s'est produite pendant la désactivation du rôle",
      disableFailure: "Échec de la désactivation du rôle",
    },
    deleteModal: {
      title: "Êtes-vous sûr de supprimer le rôle ?",
      description: "Le rôle sera définitivement supprimé",
      disableTitle: "Êtes-vous sûr de vouloir désactiver le rôle?",
      disableDescription: "Le rôle sera désactivé",
    },
    deleteModalValidation: {
      title: "Le rôle a des utilisateurs assignées",
      description:
        "Les rôles avec des utilisateurs assignés ne peuvent pas être supprimées",
    },
  },
  modules: {
    title: "Modules",
    module: "Module",
    create: "Créer un module",
    columns: {
      moduleId: "ID",
      name: "Module",
      path: "Chemin web",
      icon: "Icône",
      location: "Emplacement",
    },
    form: {
      roleId: "ID",
      name: "Nom du module",
      path: "Chemin web",
      icon: "Icône",
      location: "Emplacement",
    },
    notifications: {
      createSuccess: "Module créé avec succès",
      createError: "Une erreur s'est produite pendant la création du module",
      createFailure: "Échec de la création du module",
      updateSuccess: "Module modifié avec succès",
      updateError:
        "Une erreur s'est produite pendant la modification du module",
      updateFailure: "Échec de la modification du module",
      deleteSuccess: "Module supprimé avec succès",
      deleteError: "Une erreur s'est produite pendant la suppression du module",
      deleteFailure: "Échec de la suppression du module",
    },
    validations: {
      iconValidation: "L'icône n'existe pas",
    },
    deleteModal: {
      title: "Êtes-vous sûr de supprimer le module ?",
      description: "Le module sera définitivement supprimé",
    },
  },
  moduleElements: {
    title: "Éléments du module",
    moduleElement: "Élément du module",
    surnom: "Éléments du module",
    create: "Créer un élément",
    columns: {
      moduleElementId: "ID",
      name: "Éléments du module",
      path: "Chemin web",
      icon: "Icône",
      moduleName: "Module",
      location: "Emplacement",
    },
    form: {
      moduleElementId: "ID",
      name: "Éléments du module",
      path: "Chemin web",
      icon: "Icône",
      description: "Description",
      location: "Emplacement",
      moduleId: "Module",
    },
    notifications: {
      createSuccess: "Élément créé avec succès",
      createError: "Une erreur s'est produite pendant la création de l'élément",
      createFailure: "Échec de la création de l'élément",
      updateSuccess: "Élément modifié avec succès",
      updateError:
        "Une erreur s'est produite pendant la modification de l'élément",
      updateFailure: "Échec de la modification de l'élément",
      deleteSuccess: "Élément supprimé avec succès",
      deleteError:
        "Une erreur s'est produite pendant la suppression de l'élément",
      deleteFailure: "Échec de la suppression de l'élément",
    },
    validations: {
      iconValidation: "L'icône n'existe pas",
    },
    deleteModal: {
      title: "Êtes-vous sûr de supprimer l'élément ?",
      description: "L'élément sera définitivement supprimé",
    },
  },
  roleModuleElements: {
    title: "Permissions de rôle",
    roleModuleElement: "Permission de rôle",
    create: "Ajouter des permissions de rôle",
    columns: {
      roleModuleElementId: "ID",
      moduleElementName: "Élément du module",
      moduleName: "Module",
      path: "Chemin web",
      roleName: "Rôle",
      icon: "Icône",
      isShortcut: "Est raccourci",
    },
    form: {
      moduleElementId: "Éléments du module",
      moduleId: "Modules",
      roleId: "Rôle",
      chooseElementType: "Choisir le type d'élément",
      isShortCut: "Est raccourci",
    },
    notifications: {
      createSuccess: "Permissions de rôle créées avec succès",
      createError:
        "Une erreur s'est produite lors de la création des permissions de rôle",
      createFailure: "Échec de la création des permissions de rôle",
      updateSuccess: "Permissions de rôle modifiées avec succès",
      updateError:
        "Une erreur s'est produite lors de la modification des permissions de rôle",
      updateFailure: "Échec de la modification des permissions de rôle",
      deleteSuccess: "Permissions de rôle supprimées avec succès",
      deleteError:
        "Une erreur s'est produite lors de la suppression des permissions de rôle",
      deleteFailure: "Échec de la suppression des permissions de rôle",
    },
    validations: {
      roleValidation: "Le rôle est obligatoire",
    },
    deleteModal: {
      title: "Êtes-vous sûr de vouloir supprimer ces permissions ?",
      description: "Les permissions de rôle seront définitivement supprimées",
    },
  },
};
