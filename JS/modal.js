
        // Gestion des modales
        document.addEventListener('DOMContentLoaded', function() {
            // Sélectionner tous les boutons avec data-modal-target
            const modalButtons = document.querySelectorAll('[data-modal-target]');
            const closeButtons = document.querySelectorAll('.close-modal');
            
            // Ouvrir la modale au clic sur le bouton
            modalButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const modalId = this.getAttribute('data-modal-target');
                    const modal = document.getElementById(modalId);
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Empêcher le défilement
                });
            });
            
            // Fermer la modale au clic sur le X
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto'; // Réactiver le défilement
                });
            });
            
            // Fermer la modale au clic en dehors du contenu
            window.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal')) {
                    e.target.classList.remove('active');
                    document.body.style.overflow = 'auto'; // Réactiver le défilement
                }
            });
        });