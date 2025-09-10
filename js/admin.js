/* ===========================
   Helpers de lectura con fallback
   =========================== */
function getProductsWithFallback() {
  const fromLS = JSON.parse(localStorage.getItem("products"));
  if (Array.isArray(fromLS) && fromLS.length) return fromLS;
  return (typeof window !== "undefined" && Array.isArray(window.products)) ? window.products : [];
}
function getUsersWithFallback() {
  const fromLS = JSON.parse(localStorage.getItem("users"));
  if (Array.isArray(fromLS) && fromLS.length) return fromLS;
  return (typeof window !== "undefined" && Array.isArray(window.users)) ? window.users : [];
}

/* ===========================
   Logout
   =========================== */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    showToast("Sesión cerrada", "info", 900);
    setTimeout(() => (window.location.href = "../index.html"), 900); // ahora vuelve a la tienda
  });
}
