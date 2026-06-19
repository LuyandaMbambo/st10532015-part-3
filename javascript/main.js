document.addEventListener('DOMContentLoaded', function() {
    console.log('main.js loaded');

    // Small welcome banner shown once per browser (localStorage)
    (function showWelcomeOnce() {
        try {
            if (localStorage.getItem('siteVisited')) return;
            const banner = document.createElement('div');
            banner.className = 'welcome-banner';
            banner.innerHTML = `
                <div style="background:#0b5ed7;color:#fff;padding:12px 16px;position:fixed;top:12px;right:12px;border-radius:6px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,.15);">
                    <strong>Welcome!</strong> Thanks for visiting our site.
                    <button class="welcome-dismiss" style="margin-left:12px;background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff;padding:6px 8px;border-radius:4px;cursor:pointer;">Dismiss</button>
                </div>
            `;
            document.body.appendChild(banner);
            banner.querySelector('.welcome-dismiss').addEventListener('click', function() {
                banner.remove();
            });
            localStorage.setItem('siteVisited', '1');
        } catch (e) {
            console.warn('Welcome banner disabled:', e);
        }
    })();

    // Simple floating alert helper
    function showAlert(message, type = 'info', timeout = 3500) {
        const containerId = 'js-alert-container';
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.style.position = 'fixed';
            container.style.top = '12px';
            container.style.right = '12px';
            container.style.zIndex = 10000;
            document.body.appendChild(container);
        }
        const el = document.createElement('div');
        el.textContent = message;
        el.style.marginTop = '8px';
        el.style.padding = '10px 14px';
        el.style.borderRadius = '6px';
        el.style.color = '#fff';
        el.style.boxShadow = '0 6px 18px rgba(0,0,0,.12)';
        el.style.maxWidth = '320px';
        el.style.fontFamily = 'sans-serif';
        switch (type) {
            case 'success': el.style.background = '#198754'; break;
            case 'error': el.style.background = '#dc3545'; break;
            case 'warn': el.style.background = '#ffc107'; el.style.color = '#000'; break;
            default: el.style.background = '#0d6efd'; break;
        }
        container.appendChild(el);
        setTimeout(() => el.remove(), timeout);
    }

    // Attach click handlers to buttons with class `js-btn` or data-action attributes
    (function attachButtonHandlers() {
        const btns = document.querySelectorAll('.js-btn, [data-action]');
        btns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const action = btn.getAttribute('data-action') || 'clicked';
                showAlert(`Button action: ${action}`, 'info', 2500);
            });
        });
    })();

    // Simple form validation for forms with class `js-validate`
    (function attachFormValidation() {
        const forms = document.querySelectorAll('form.js-validate');
        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                let valid = true;
                const fields = Array.from(form.querySelectorAll('input, textarea, select'));
                fields.forEach(field => {
                    field.classList.remove('js-error');
                    const errorMsgId = field.name ? `err-${field.name}` : null;
                    if (errorMsgId) {
                        const old = form.querySelector('#' + errorMsgId);
                        if (old) old.remove();
                    }
                    if (field.hasAttribute('required') && !field.value.trim()) {
                        valid = false;
                        field.classList.add('js-error');
                        const err = document.createElement('div');
                        err.id = errorMsgId || '';
                        err.style.color = '#dc3545';
                        err.style.fontSize = '0.9em';
                        err.style.marginTop = '4px';
                        err.textContent = 'This field is required.';
                        field.parentNode && field.parentNode.insertBefore(err, field.nextSibling);
                    }
                    if (field.type === 'email' && field.value) {
                        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!re.test(field.value)) {
                            valid = false;
                            field.classList.add('js-error');
                            const err = document.createElement('div');
                            err.style.color = '#dc3545';
                            err.style.fontSize = '0.9em';
                            err.style.marginTop = '4px';
                            err.textContent = 'Please enter a valid email address.';
                            field.parentNode && field.parentNode.insertBefore(err, field.nextSibling);
                        }
                    }
                });
                if (!valid) {
                    showAlert('Please fix the highlighted fields.', 'error');
                    return;
                }
                // If valid, you can submit via AJAX or proceed — here we'll show success and reset for demo
                showAlert('Form submitted successfully!', 'success');
                form.reset();
            });
        });
    })();

    // Small enhancement to existing description element
    const desc = document.getElementById('description');
    if (desc) desc.textContent = desc.textContent + ' (Updated by main.js)';
});
