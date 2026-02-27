// Centralized global styles string used by App
export const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Comfortaa:wght@400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  /* Ensure body uses block layout so page wrappers' centering (margin:auto) works as intended */
  body { display: block !important; font-family: 'Nunito', sans-serif; background: #FBF8CC; overflow-x: hidden; margin: 0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #CFBAF0; border-radius: 99px; }
  
  @keyframes floatUp { 0%{transform:translateY(20px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
  @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes bobble { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes scaleIn { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes slideRight { from{width:0} to{width:var(--target-width)} }
  @keyframes fillCircle { from{stroke-dashoffset:251} to{stroke-dashoffset:var(--target-offset)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ping { 75%,100%{transform:scale(2);opacity:0} }
`;

export default globalStyle;

/* Responsive layout helpers for pages that use inline grid/flex styles
   These selectors target classNames added to page wrappers so we can apply
   media queries without converting every inline style into CSS. */

const responsive = `
  /* Dashboard responsive adjustments */
  .dashboard-inner { max-width: 1050px; margin: 0 auto; padding: 0 20px; }
  .dashboard-page { padding-top: 90px; }

  /* Keep dashboard centered on wide screens (default .dashboard-inner uses margin:0 auto). */

  @media (max-width: 900px) {
    .top-row { grid-template-columns: 1fr !important; }
    .charts-row { grid-template-columns: 1fr !important; }
    .dashboard-inner { padding: 0 16px; }
    /* Make cards take full width and center content on small screens */
    .dashboard-inner > * { width: 100%; }
  }

  @media (max-width: 560px) {
    .dashboard-page { padding-top: 76px; }
    .dashboard-inner { padding: 0 12px; }
    header { padding: 12px 16px !important; }
  }
`;

// Append responsive rules to the exported globalStyle so App can insert once
export const appendedResponsive = responsive;

