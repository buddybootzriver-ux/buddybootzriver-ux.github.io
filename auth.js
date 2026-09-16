/*
 * Authentication boundary for the static site.
 *
 * IMPORTANT:
 * GitHub Pages serves this JavaScript to every visitor, so this file does
 * NOT provide cryptographic access control by itself. Real protection for
 * private pages must be enforced by an external identity/access provider
 * or by moving protected content behind a server-side application.
 */
(function () {
  const config = window.AUTH_CONFIG || { provider: 'not-configured', loginPath: '/login.html' };

  window.BuddyAuth = {
    isConfigured: () => config.provider !== 'not-configured',
    loginPath: config.loginPath || '/login.html',
    adminPath: config.adminPath || '/admin.html',
    provider: config.provider
  };

  window.requireBuddyAuth = function () {
    if (!BuddyAuth.isConfigured()) {
      document.documentElement.classList.add('auth-not-configured');
      const panel = document.querySelector('[data-auth-panel]');
      if (panel) {
        panel.hidden = false;
        panel.innerHTML = '<strong>Secure access is not configured yet.</strong><p>This private area is intentionally disabled until a real identity/access provider is connected. GitHub Pages alone cannot securely protect private HTML.</p><a class="btn" href="/login.html">Authentication Setup</a>';
      }
      return false;
    }

    return true;
  };
})();
