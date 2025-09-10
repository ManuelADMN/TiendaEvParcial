// ===========================
// admin.js (completo, ajustado)
// - Toasts no bloqueantes
// - Guard de acceso (Admin/Vendedor)
// - Logout robusto (sin rutas absolutas)
// - Render listas (productos/usuarios)
// - Detalles
// - Formularios con validaciones
// - Imagen por URL (preferente) o archivo (fallback)
// - Lectura segura de datos (LS o globals)
// ===========================

// ========== Toasts ==========
function ensureToastContainer() {
  if (!document.getElementById("toast")) {
    const t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
}
function showToast(msg, type = "success", ms = 2000) {
  ensureToastContainer();
  const toast = document.getElementById("toast");
  toast.className = `toast show ${type}`;
  toast.textContent = msg;
  setTimeout(() => toast.classList.remove("show"), ms);
}

// ========== Validaciones mini ==========
function validateRUT(rut) {
  rut = (rut || "").trim().toUpperCase();
  if (!/^[0-9]{7,8}[0-9K]$/.test(rut)) return false;
  const cuerpo = rut.slice(0, -1), dv = rut.slice(-1);
  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = String(dvEsperado);
  return dv === dvEsperado;
}
function validateEmailDomain(email) {
  const allowed = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return allowed.some(d => (email || "").endsWith(d));
}
function showError(id, msg) { const el = document.getElementById(id); if (el) el.innerText = msg || ""; }
function clearError(id) { const el = document.getElementById(id); if (el) el.innerText = ""; }

// ========== Helpers datos ==========
function readArrayLS(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch { return null; }
}
function getProductsSafe() {
  const ls = readArrayLS("products");
  if (ls && ls.length) return ls;
  if (typeof products !== "undefined" && Array.isArray(products) && products.length) return products;
  if (typeof window !== "undefined" && Array.isArray(window.products) && window.products.length) return window.products;
  return [];
}
function getUsersSafe() {
  const ls = readArrayLS("users");
  if (ls && ls.length) return ls;
  if (typeof users !== "undefined" && Array.isArray(users) && users.length) return users;
  if (typeof window !== "undefined" && Array.isArray(window.users) && window.users.length) return window.users;
  return [];
}

// ========== Guard/Protección ==========
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser || (loggedUser.tipo !== "Administrador" && loggedUser.tipo !== "Vendedor")) {
  showToast("Acceso no autorizado", "error", 900);
  setTimeout(() => (window.location.href = "../login.html"), 900);
}

// Ocultar módulo Usuarios si es Vendedor
if (loggedUser && loggedUser.tipo === "Vendedor") {
  const userMenuLink = document.querySelector('.admin-nav a[href="lista-usuarios.html"]');
  if (userMenuLink) userMenuLink.style.display = "none";
}

// ========== Logout (ajustado) ==========
function attachLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    // Si estamos dentro de /admin/, subir un nivel; si no, ir a index local.
    const goTo = location.pathname.includes("/admin/") ? "../index.html" : "index.html";
    window.location.href = goTo;
  });
}

// ========== Render Productos ==========
function renderAdminProducts() {
  const tableBody = document.getElementById("adminProductsTable");
  if (!tableBody) return;
  const productsData = getProductsSafe();

  tableBody.innerHTML = productsData.map(prod => `
    <tr>
      <td>${prod.codigo}</td>
      <td>${prod.nombre}</td>
      <td>$${Number(prod.precio).toFixed(2)}</td>
      <td>${prod.stock}</td>
      <td>${prod.categoria}</td>
      <td>
        <a href="ver-producto.html?code=${encodeURIComponent(prod.codigo)}">Ver</a> |
        <a href="editar-producto.html?code=${encodeURIComponent(prod.codigo)}">Editar</a> |
        <a href="#" class="delete-prod" data-code="${prod.codigo}">Eliminar</a>
      </td>
    </tr>
  `).join("");

  document.querySelectorAll(".delete-prod").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let list = readArrayLS("products") || getProductsSafe();
      const before = list.length;
      const code = link.getAttribute("data-code");
      list = list.filter(p => p.codigo !== code);
      localStorage.setItem("products", JSON.stringify(list));
      renderAdminProducts();
      showToast(before !== list.length ? "Producto eliminado" : "No se encontró", "info");
    });
  });
}

// ========== Render Usuarios ==========
function renderAdminUsers() {
  const tableBody = document.getElementById("adminUsersTable");
  if (!tableBody) return;
  const usersData = getUsersSafe();
  tableBody.innerHTML = usersData.map(u => `
    <tr>
      <td>${u.run}</td>
      <td>${u.nombre} ${u.apellidos}</td>
      <td>${u.email}</td>
      <td>${u.tipo}</td>
      <td>
        <a href="ver-usuario.html?run=${encodeURIComponent(u.run)}">Ver</a> |
        <a href="editar-usuario.html?run=${encodeURIComponent(u.run)}">Editar</a>
      </td>
    </tr>
  `).join("");
}

// ========== Detalles ==========
function loadAdminProductDetail() {
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) return;
  const prod = getProductsSafe().find(p => p.codigo === code);
  if (!prod) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  set("detProdCodigo", prod.codigo);
  set("detProdNombre", prod.nombre);
  set("detProdDesc", prod.descripcion || "");
  set("detProdPrecio", Number(prod.precio).toFixed(2));
  set("detProdStock", prod.stock);
  set("detProdStockCritico", prod.stockCritico ?? "");
  set("detProdCategoria", prod.categoria);
  const imgEl = document.getElementById("detProdImagen");
  if (imgEl) imgEl.innerHTML = prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" style="max-width:180px;height:auto">` : "No definida";
}
function loadAdminUserDetail() {
  const run = new URLSearchParams(window.location.search).get("run");
  if (!run) return;
  const usr = getUsersSafe().find(u => u.run === run);
  if (!usr) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  set("detUserRun", usr.run);
  set("detUserNombre", usr.nombre);
  set("detUserApellidos", usr.apellidos);
  set("detUserEmail", usr.email);
  set("detUserFechaNac", usr.fechaNacimiento || "");
  set("detUserTipo", usr.tipo);
  set("detUserRegion", usr.region);
  set("detUserComuna", usr.comuna);
  set("detUserDireccion", usr.direccion);
}

// ========== Regiones/Comunas ==========
function populateRegionsAdmin() {
  if (typeof populateRegions === "function") { populateRegions(); return; }
  if (typeof regionesYComunas === "undefined") return;
  const regionSel = document.getElementById("userRegion");
  const comunaSel = document.getElementById("userComuna");
  if (!regionSel || !comunaSel) return;

  if (regionSel.options.length <= 1) {
    regionesYComunas.regiones.forEach(r => {
      const o = document.createElement("option");
      o.value = r.NombreRegion; o.textContent = r.NombreRegion;
      regionSel.appendChild(o);
    });
  }
  regionSel.onchange = e => {
    const region = e.target.value;
    comunaSel.innerHTML = '<option value="">Seleccione comuna</option>';
    const data = regionesYComunas.regiones.find(rr => rr.NombreRegion === region);
    if (data) {
      data.comunas.forEach(c => {
        const o = document.createElement("option");
        o.value = c; o.textContent = c;
        comunaSel.appendChild(o);
      });
    }
  };
}

// ========== Util imagen ==========
function isLikelyImageUrl(u) {
  if (!u) return false;
  try {
    const url = new URL(u);
    return (/\.(png|jpe?g|gif|webp|bmp|svg)$/i).test(url.pathname);
  } catch { return false; }
}

// ========== Formularios ==========
function setupProductForm() {
  const form = document.getElementById("productForm") || document.getElementById("productFormEdit");
  if (!form) return;

  const code = new URLSearchParams(window.location.search).get("code");
  const isEdit = Boolean(code && form.id === "productFormEdit");

  const catSel = form.prodCategoria;
  if (catSel && catSel.options.length <= 1) {
    (typeof categories !== "undefined" ? categories : ["Tecnología","Hogar","Deportes","Accesorios"])
      .forEach(c => { const o = document.createElement("option"); o.value = c; o.textContent = c; catSel.appendChild(o); });
  }

  // Soporte dual: URL (preferido) y archivo (fallback)
  const urlInput = form.querySelector('#prodImagenUrl'); // si el HTML fue actualizado
  const fileInput = form.querySelector('input[type="file"][name="prodImagen"]'); // si mantienes el input file
  const prevImg = document.getElementById("prodImgPreview");
  let chosenDataURL = "";     // si se usa archivo
  let originalImg = "";       // imagen previa (editar)
  let liveUrl = "";           // si se usa URL

  if (isEdit) {
    const prod = getProductsSafe().find(p => p.codigo === code);
    if (prod) {
      form.prodCodigo.value = prod.codigo;
      form.prodNombre.value = prod.nombre;
      form.prodDesc.value = prod.descripcion || "";
      form.prodPrecio.value = prod.precio;
      form.prodStock.value = prod.stock;
      form.prodStockCritico.value = prod.stockCritico ?? "";
      form.prodCategoria.value = prod.categoria;
      originalImg = prod.imagen || "";

      // precarga preview + url
      if (urlInput) urlInput.value = originalImg;
      if (prevImg && originalImg) { prevImg.src = originalImg; prevImg.style.display = "block"; }
    }
  }

  if (urlInput && prevImg) {
    const updatePreview = () => {
      liveUrl = (urlInput.value || "").trim();
      if (liveUrl) { prevImg.src = liveUrl; prevImg.style.display = "block"; }
      else { prevImg.removeAttribute("src"); prevImg.style.display = "none"; }
    };
    urlInput.addEventListener("input", updatePreview);
    urlInput.addEventListener("change", updatePreview);
  }

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) { chosenDataURL = ""; return; }
      const reader = new FileReader();
      reader.onload = ev => {
        chosenDataURL = ev.target.result;
        if (prevImg) { prevImg.src = chosenDataURL; prevImg.style.display = "block"; }
      };
      reader.readAsDataURL(f);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    if (form.prodCodigo.value.trim().length < 3) { showError("prodCodigoError","Código mínimo 3"); ok = false; } else clearError("prodCodigoError");
    if (!form.prodNombre.value.trim()) { showError("prodNombreError","Nombre requerido"); ok = false; } else clearError("prodNombreError");

    const precio = parseFloat(form.prodPrecio.value);
    if (isNaN(precio) || precio < 0) { showError("prodPrecioError","Precio no válido"); ok = false; } else clearError("prodPrecioError");

    const stock = parseInt(form.prodStock.value, 10);
    if (isNaN(stock) || stock < 0) { showError("prodStockError","Stock no válido"); ok = false; } else clearError("prodStockError");

    if (!form.prodCategoria.value) { showError("prodCategoriaError", "Seleccione categoría"); ok = false; } else clearError("prodCategoriaError");

    // URL de imagen (opcional): si está, aviso suave si no parece imagen
    const finalUrl = (urlInput && urlInput.value.trim()) || "";
    if (finalUrl && !isLikelyImageUrl(finalUrl)) {
      console.warn("La URL no parece una imagen directa (se continuará igualmente).");
    }

    if (!ok) return;

    let list = readArrayLS("products") || getProductsSafe();

    // Prioridad de imagen: URL > archivo > imagen original
    const finalImage = finalUrl || chosenDataURL || originalImg || "";

    if (isEdit) {
      const idx = list.findIndex(p => p.codigo === code);
      if (idx !== -1) {
        list[idx] = {
          codigo: form.prodCodigo.value.trim(),
          nombre: form.prodNombre.value.trim(),
          descripcion: form.prodDesc.value.trim(),
          precio, stock,
          stockCritico: form.prodStockCritico.value ? parseInt(form.prodStockCritico.value, 10) : null,
          categoria: form.prodCategoria.value,
          imagen: finalImage
        };
      }
      localStorage.setItem("products", JSON.stringify(list));
      showToast("Producto actualizado");
      setTimeout(() => (window.location.href = "lista-productos.html"), 600);
    } else {
      list.push({
        codigo: form.prodCodigo.value.trim(),
        nombre: form.prodNombre.value.trim(),
        descripcion: form.prodDesc.value.trim(),
        precio, stock,
        stockCritico: form.prodStockCritico.value ? parseInt(form.prodStockCritico.value, 10) : null,
        categoria: form.prodCategoria.value,
        imagen: finalImage
      });
      localStorage.setItem("products", JSON.stringify(list));
      showToast("Producto creado");
      setTimeout(() => (window.location.href = "lista-productos.html"), 600);
    }
  });
}

function setupUserForm() {
  const form = document.getElementById("userForm") || document.getElementById("userFormEdit");
  if (!form) return;

  populateRegionsAdmin();

  const run = new URLSearchParams(window.location.search).get("run");
  const isEdit = Boolean(run && form.id === "userFormEdit");

  if (isEdit) {
    const usr = getUsersSafe().find(u => u.run === run);
    if (usr) {
      form.userRun.value = usr.run;
      form.userNombre.value = usr.nombre;
      form.userApellidos.value = usr.apellidos;
      form.userEmail.value = usr.email;
      form.userFechaNac.value = usr.fechaNacimiento || "";
      form.userTipo.value = usr.tipo;
      setTimeout(() => {
        if (form.userRegion) form.userRegion.value = usr.region;
        if (form.userRegion) form.userRegion.dispatchEvent(new Event("change"));
        if (form.userComuna) form.userComuna.value = usr.comuna;
      }, 100);
      form.userDireccion.value = usr.direccion;
      form.userPassword.value = usr.password;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    if (!validateRUT(form.userRun.value)) { showError("userRunError","RUN inválido"); ok = false; } else clearError("userRunError");
    if (!validateEmailDomain(form.userEmail.value)) { showError("userEmailError","Correo no permitido"); ok = false; } else clearError("userEmailError");

    const pass = form.userPassword.value || "";
    if (pass.length < 4 || pass.length > 10) { showError("userPasswordError","Contraseña 4-10"); ok = false; } else clearError("userPasswordError");

    if (!form.userTipo.value) { showToast("Seleccione tipo de usuario","error"); ok = false; }
    if (!form.userRegion.value || !form.userComuna.value) { showToast("Seleccione región y comuna","error"); ok = false; }

    ["userNombre","userApellidos","userDireccion"].forEach(id => {
      const el = form[id], err = id + "Error";
      if (!el || !el.value.trim()) { showError(err,"Campo requerido"); ok = false; } else clearError(err);
    });

    if (!ok) return;

    let list = readArrayLS("users") || getUsersSafe();

    if (isEdit) {
      const idx = list.findIndex(u => u.run === run);
      if (idx !== -1) {
        list[idx] = {
          run: form.userRun.value.toUpperCase(),
          nombre: form.userNombre.value.trim(),
          apellidos: form.userApellidos.value.trim(),
          email: form.userEmail.value.trim(),
          fechaNacimiento: form.userFechaNac.value,
          tipo: form.userTipo.value,
          region: form.userRegion.value,
          comuna: form.userComuna.value,
          direccion: form.userDireccion.value.trim(),
          password: form.userPassword.value
        };
      }
      localStorage.setItem("users", JSON.stringify(list));
      showToast("Usuario actualizado");
      setTimeout(() => (window.location.href = "lista-usuarios.html"), 600);
    } else {
      list.push({
        run: form.userRun.value.toUpperCase(),
        nombre: form.userNombre.value.trim(),
        apellidos: form.userApellidos.value.trim(),
        email: form.userEmail.value.trim(),
        fechaNacimiento: form.userFechaNac.value,
        tipo: form.userTipo.value,
        region: form.userRegion.value,
        comuna: form.userComuna.value,
        direccion: form.userDireccion.value.trim(),
        password: form.userPassword.value
      });
      localStorage.setItem("users", JSON.stringify(list));
      showToast("Usuario creado");
      setTimeout(() => (window.location.href = "lista-usuarios.html"), 600);
    }
  });
}

// ========== Inicio ==========
document.addEventListener("DOMContentLoaded", () => {
  ensureToastContainer();
  attachLogout();
  renderAdminProducts();
  renderAdminUsers();
  loadAdminProductDetail();
  loadAdminUserDetail();
  setupProductForm();
  setupUserForm();
});
