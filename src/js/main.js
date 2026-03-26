import '../main.css';

import { applyTheme, toggleTheme } from './theme.js';
import { renderMenu, renderRightPanel, showWelcome, showDetail, selectMenuItem } from './render.js';
import { toggleApprovalsMenu, navigateApproval } from './approvals.js';

// Expose for inline onclick handlers in HTML
window.toggleTheme = toggleTheme;
window.showWelcome = showWelcome;
window.selectMenuItem = selectMenuItem;
window.toggleApprovalsMenu = toggleApprovalsMenu;
window.navigateApproval = navigateApproval;

// Initialize
renderMenu();
renderRightPanel();
applyTheme(localStorage.getItem('sessions-theme') || 'dark');
showWelcome();

// Close approvals menu on outside click
document.addEventListener('click', () =>
  document.getElementById('approvals-menu').classList.remove('show')
);
