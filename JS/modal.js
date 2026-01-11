
// Gestion des modales avec focus-trap et restauration du focus
document.addEventListener('DOMContentLoaded', function() {
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-modal');

    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function openModal(modal, trigger) {
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Save last focused element to restore later
        modal._lastFocused = trigger || document.activeElement;

        // Focus first focusable element or modal itself
        const focusable = modal.querySelectorAll(focusableSelector);
        if (focusable.length) {
            focusable[0].focus();
        } else {
            modal.focus();
        }

        // Trap Tab inside modal
        modal.addEventListener('keydown', trapTab);
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';

        modal.removeEventListener('keydown', trapTab);

        // Restore focus
        try {
            const prev = modal._lastFocused;
            if (prev && typeof prev.focus === 'function') prev.focus();
        } catch (e) {}
    }

    function trapTab(e) {
        if (e.key !== 'Tab') return;
        const modal = e.currentTarget;
        const focusable = Array.from(modal.querySelectorAll(focusableSelector)).filter(el => el.offsetParent !== null);
        if (focusable.length === 0) {
            e.preventDefault();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else { // Tab
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    // Open modals
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            openModal(modal, this);
        });
    });

    // Close modals (close buttons)
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close by clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target.classList && e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Gallery management for project modals
    const projectModals = {
        'modal-gest-note': ['image/Gest_note.png'],
        'modal-gest-fastfood': ['image/gest_fastfood.png'],
        'modal-letshare': ['image/letshare.png', 'image/screenshots/letshare2.png', 'image/screenshots/letshare3.png', 'image/screenshots/letshare4.png', 'image/screenshots/letchar1.png'],
        'modal-gest-event': ['image/gest.Event.png'],
        'modal-taskmaster': ['image/taskMaster.png', 'image/screenshots/TaskMaster1.png', 'image/screenshots/taskmaster2.png', 'image/screenshots/taskmaster3.png', 'image/screenshots/taskmaster4.png']
    };

    // Initialize galleries
    Object.keys(projectModals).forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const images = projectModals[modalId];
        const mainImg = modal.querySelector('[id$="-main-img"]');
        const thumbs = modal.querySelectorAll('.gallery-thumb');
        const prevBtn = modal.querySelector('.gallery-prev');
        const nextBtn = modal.querySelector('.gallery-next');

        if (!mainImg || thumbs.length === 0) return;

        let currentIndex = 0;

        function updateGallery(index) {
            if (images.length === 0) return;
            currentIndex = (index + images.length) % images.length;
            mainImg.src = images[currentIndex];
            thumbs.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === currentIndex);
            });
        }

        // Thumb click
        thumbs.forEach((thumb, i) => {
            thumb.addEventListener('click', () => updateGallery(i));
        });

        // Navigation buttons
        if (prevBtn) prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));

        // Keyboard navigation (arrow keys when modal is open)
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') updateGallery(currentIndex - 1);
            if (e.key === 'ArrowRight') updateGallery(currentIndex + 1);
        });
    });

    // Global Escape handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => closeModal(modal));
        }
    });
});