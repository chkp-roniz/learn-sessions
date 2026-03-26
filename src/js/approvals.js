import { ALL_ITEMS } from './data.js';
import { showDetail } from './render.js';

export function toggleApprovalsMenu(e) {
  e.stopPropagation();
  document.getElementById("approvals-menu").classList.toggle("show");
}

export function navigateApproval(id, e) {
  e.stopPropagation();
  document.getElementById("approvals-menu").classList.remove("show");
  const item = ALL_ITEMS.find((i) => i.id === id);
  if (item) showDetail(item);
}
