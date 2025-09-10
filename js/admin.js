// admin.js (ajustado 100%): protecciones, toasts, seeding/fallback de datos,
// CRUD productos/usuarios, validaciones y manejo opcional de imagen (base64)

/* ===========================
   Toasts (no bloqueantes)
   =========================== */
function ensureToastContainer() {
  if (!document.getElementById("toast")) {
    const t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
}
function showToast(msg, type = "success", ms = 2500) {
  ensureToastContainer();
  const toast = document.getElementById("toast");
  toast.className = `toast show ${type}`;
  toast.textContent = msg;
  setTimeout(() => toast.classList.remove("show"), ms);
}

/* ===========================
   Validaciones mínimas (copias locales para admin)
   =========================== */
function validateRUT(rut) {
  rut = (rut || "").trim().toUpperCase();
  if (!/^[0-9]{7,8}[0-9K]$/.test(rut)) return false;
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);
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
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.innerText = msg || "";
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.innerText = "";
}

/* ===========================
   Autocorrección / seeding de storage si falta data
   (toma datos globales: window.products y window.seedUsers si existen)
   =========================== */
(function bootstrapStorage() {
  try {
    const p = JSON.parse(localStorage.getItem("products"));
    const fallbackP = (typeof window !== "undefined" && Array.isArray(window.products)) ? window.products : [];
    if (!Array.isArray(p) || p.length === 0) {
      if (fallbackP.length) {
        localStorage.setItem("products", JSON.stringify(fallbackP));
      }
    }
  } catch (_) {}

  try {
    const u = JSON.parse(localStorage.getItem("users"));
    const fallbackU = (typeof window !== "undefined" && Array.isArray(window.seedUsers)) ? window.seedUsers : [];
    if (!Array.isArray(u) || u.length === 0) {
      if (fallbackU.length) {
        localStorage.setItem("users", JSON.stringify(fallbackU));
      }
    }
  } catch (_) {}
})();

/* ===========================
   Protección de rutas admin
   =========================== */
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser || (loggedUser.tipo !== "Administrador" && loggedUser.tipo !== "Vendedor")) {
  showToast("Acceso no autorizado. Inicia sesión como Admin o Vendedor.", "error", 1200);
  setTimeout(() => (window.location.href = "../login.html"), 1200);
}

// Ocultar módulo Usuarios a Vendedor
if (loggedUser && loggedUser.tipo === "Vendedor") {
  const userMenuLink = document.querySelector('.admin-nav a[href="lista-usuarios.html"]');
  if (userMenuLink) userMenuLink.style.display = "none";
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
    setTimeout(() => (window.location.href = "../login.html"), 900);
  });
}

/* ===========================
   Utilidades de datos
   =========================== */
// Categorías fallback (por si no vienen en data.js)
const DEFAULT_CATEGORIES = ["Tecnología", "Hogar", "Deportes", "Accesorios"];
const categories = (typeof window !== "undefined" && window.categories) ? window.categories : DEFAULT_CATEGORIES;

/* Helpers de lectura con fallback */
function getProductsWithFallback() {
  const fromLS = JSON.parse(localStorage.getItem("products"));
  if (Array.isArray(fromLS) && fromLS.length) return fromLS;
  const fromGlobal = (typeof window !== "undefined" && Array.isArray(window.products)) ? window.products : [];
  return fromGlobal;
}
function getUsersWithFallback() {
  const fromLS = JSON.parse(localStorage.getItem("users"));
  if (Array.isArray(fromLS) && fromLS.length) return fromLS;
  const fromGlobal = (typeof window !== "undefined" && Array.isArray(window.seedUsers)) ? window.seedUsers : [];
  return fromGlobal;
}

/* ===========================
   Render: Productos
   =========================== */
function renderAdminProducts() {
  const tableBody = document.getElementById("adminProductsTable");
  if (!tableBody) return;

  const productsData = getProductsWithFallback();
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

  // Eliminar SIN confirm(): acción directa + toast
  document.querySelectorAll(".delete-prod").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const code = link.getAttribute("data-code");
      let prodList = JSON.parse(localStorage.getItem("products")) || getProductsWithFallback();
      const before = prodList.length;
      prodList = prodList.filter(p => p.codigo !== code);
      localStorage.setItem("products", JSON.stringify(prodList));
      renderAdminProducts();
      showToast(before !== prodList.length ? "Producto eliminado" : "No se encontró el producto", "info");
    });
  });
}

/* ===========================
   Render: Usuarios
   =========================== */
function renderAdminUsers() {
  const tableBody = document.getElementById("adminUsersTable");
  if (!tableBody) return;

  const usersData = getUsersWithFallback();
  tableBody.innerHTML = usersData.map(user => `
    <tr>
      <td>${user.run}</td>
      <td>${user.nombre} ${user.apellidos}</td>
      <td>${user.email}</td>
      <td>${user.tipo}</td>
      <td>
        <a href="ver-usuario.html?run=${encodeURIComponent(user.run)}">Ver</a> |
        <a href="editar-usuario.html?run=${encodeURIComponent(user.run)}">Editar</a>
      </td>
    </tr>
  `).join("");
  // (No se implementa eliminar usuario para evitar borrar admin por error)
}

/* ===========================
   Ver: Detalle producto / usuario
   =========================== */
function loadAdminProductDetail() {
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) return;
  const list = getProductsWithFallback();
  const prod = list.find(p => p.codigo === code);
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
  if (imgEl) {
    imgEl.innerHTML = prod.imagen
      ? `<img src="${prod.imagen}" alt="${prod.nombre}" style="max-width:180px; height:auto;">`
      : "No definida";
  }
}

function loadAdminUserDetail() {
  const run = new URLSearchParams(window.location.search).get("run");
  if (!run) return;
  const list = getUsersWithFallback();
  const usr = list.find(u => u.run === run);
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

/* ===========================
   Aux: Cargar regiones/comunas (si existen datos globales)
   =========================== */
function populateRegionsAdmin() {
  // Reutiliza populateRegions() si viene desde main.js; de lo contrario, versión mínima:
  if (typeof populateRegions === "function") {
    populateRegions();
    return;
  }
  if (typeof regionesYComunas === "undefined") return;
  const selects = document.querySelectorAll("#userRegion");
  selects.forEach(select => {
    if (!select) return;
    if (select.options.length <= 1) {
      regionesYComunas.regiones.forEach(reg => {
        const opt = document.createElement("option");
        opt.value = reg.NombreRegion;
        opt.textContent = reg.NombreRegion;
        select.appendChild(opt);
      });
    }
    select.onchange = e => {
      const regionName = e.target.value;
      const comunaSelect = document.getElementById("userComuna");
      if (!comunaSelect) return;
      comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
      const regionData = regionesYComunas.regiones.find(r => r.NombreRegion === regionName);
      if (regionData) {
        regionData.comunas.forEach(c => {
          const o = document.createElement("option");
          o.value = c;
          o.textContent = c;
          comunaSelect.appendChild(o);
        });
      }
    };
  });
}

/* ===========================
   Form: Nuevo/Editar Producto
   =========================== */
function setupProductForm() {
  const form = document.getElementById("productForm") || document.getElementById("productFormEdit");
  if (!form) return;

  const prodCodeParam = new URLSearchParams(window.location.search).get("code");
  const isEdit = Boolean(prodCodeParam && form.id === "productFormEdit");

  // Cargar categorías
  const catSelect = form.prodCategoria;
  if (catSelect && catSelect.options.length <= 1) {
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      catSelect.appendChild(opt);
    });
  }

  // Precargar si es edición
  let originalImg = "";
  if (isEdit) {
    const prodData = getProductsWithFallback();
    const prod = prodData.find(p => p.codigo === prodCodeParam);
    if (prod) {
      form.prodCodigo.value = prod.codigo;
      form.prodNombre.value = prod.nombre;
      form.prodDesc.value = prod.descripcion || "";
      form.prodPrecio.value = prod.precio;
      form.prodStock.value = prod.stock;
      form.prodStockCritico.value = prod.stockCritico ?? "";
      form.prodCategoria.value = prod.categoria;
      originalImg = prod.imagen || "";
      const imgPreview = document.getElementById("prodImgPreview");
      if (imgPreview && originalImg) {
        imgPreview.src = originalImg;
        imgPreview.style.display = "block";
      }
    }
  }

  // Previsualizar/leer imagen (opcional) como base64
  const fileInput = form.querySelector('input[type="file"][name="prodImagen"]');
  let chosenImageDataURL = "";
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) { chosenImageDataURL = ""; return; }
      const reader = new FileReader();
      reader.onload = (ev) => {
        chosenImageDataURL = ev.target.result; // dataURL
        const imgPreview = document.getElementById("prodImgPreview");
        if (imgPreview) {
          imgPreview.src = chosenImageDataURL;
          imgPreview.style.display = "block";
        }
      };
      reader.readAsDataURL(f);
    });
  }

  // Validaciones y guardado
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    if (form.prodCodigo.value.trim().length < 3) {
      showError("prodCodigoError", "Código mínimo 3 caracteres");
      valid = false;
    } else clearError("prodCodigoError");

    if (form.prodNombre.value.trim() === "") {
      showError("prodNombreError", "Nombre es requerido");
      valid = false;
    } else clearError("prodNombreError");

    const precioNum = parseFloat(form.prodPrecio.value);
    if (isNaN(precioNum) || precioNum < 0) {
      showError("prodPrecioError", "Precio no válido");
      valid = false;
    } else clearError("prodPrecioError");

    const stockNum = parseInt(form.prodStock.value, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      showError("prodStockError", "Stock no válido");
      valid = false;
    } else clearError("prodStockError");

    if (!form.prodCategoria.value) {
      showError("prodCategoriaError", "Seleccione categoría");
      valid = false;
    } else clearError("prodCategoriaError");

    if (!valid) return;

    let prodList = JSON.parse(localStorage.getItem("products")) || [];
    // Si storage venía vacío, inicia con fallback para conservar lo que había globalmente
    if (!prodList.length) prodList = getProductsWithFallback();

    if (isEdit) {
      const idx = prodList.findIndex(p => p.codigo === prodCodeParam);
      if (idx !== -1) {
        prodList[idx] = {
          codigo: form.prodCodigo.value.trim(),
          nombre: form.prodNombre.value.trim(),
          descripcion: form.prodDesc.value.trim(),
          precio: precioNum,
          stock: stockNum,
          stockCritico: form.prodStockCritico.value ? parseInt(form.prodStockCritico.value, 10) : null,
          categoria: form.prodCategoria.value,
          imagen: chosenImageDataURL || originalImg || "" // mantiene o reemplaza imagen
        };
      }
      localStorage.setItem("products", JSON.stringify(prodList));
      showToast("Producto actualizado", "success", 900);
      setTimeout(() => (window.location.href = "lista-productos.html"), 900);
    } else {
      // nuevo
      const nuevoProd = {
        codigo: form.prodCodigo.value.trim(),
        nombre: form.prodNombre.value.trim(),
        descripcion: form.prodDesc.value.trim(),
        precio: precioNum,
        stock: stockNum,
        stockCritico: form.prodStockCritico.value ? parseInt(form.prodStockCritico.value, 10) : null,
        categoria: form.prodCategoria.value,
        imagen: chosenImageDataURL || "" // guarda base64 si se seleccionó
      };
      prodList.push(nuevoProd);
      localStorage.setItem("products", JSON.stringify(prodList));
      showToast("Producto creado", "success", 900);
      setTimeout(() => (window.location.href = "lista-productos.html"), 900);
    }
  });
}

/* ===========================
   Form: Nuevo/Editar Usuario
   =========================== */
function setupUserForm() {
  const form = document.getElementById("userForm") || document.getElementById("userFormEdit");
  if (!form) return;

  // Cargar regiones/comunas
  populateRegionsAdmin();

  const runParam = new URLSearchParams(window.location.search).get("run");
  const isEdit = Boolean(runParam && form.id === "userFormEdit");

  if (isEdit) {
    const usersData = getUsersWithFallback();
    const usr = usersData.find(u => u.run === runParam);
    if (usr) {
      form.userRun.value = usr.run;
      form.userNombre.value = usr.nombre;
      form.userApellidos.value = usr.apellidos;
      form.userEmail.value = usr.email;
      form.userFechaNac.value = usr.fechaNacimiento || "";
      form.userTipo.value = usr.tipo;

      // Rellenar región/comuna (espera breve por si populateRegionsAdmin es async-like)
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
    let valid = true;

    if (!validateRUT(form.userRun.value)) {
      showError("userRunError", "RUN inválido");
      valid = false;
    } else clearError("userRunError");

    if (!validateEmailDomain(form.userEmail.value)) {
      showError("userEmailError", "Correo no permitido");
      valid = false;
    } else clearError("userEmailError");

    const pass = form.userPassword.value || "";
    if (pass.length < 4 || pass.length > 10) {
      showError("userPasswordError", "Contraseña 4-10 caracteres");
      valid = false;
    } else clearError("userPasswordError");

    if (!form.userTipo.value) {
      showToast("Seleccione un tipo de usuario", "error");
      valid = false;
    }
    if (!form.userRegion.value || !form.userComuna.value) {
      showToast("Seleccione región y comuna", "error");
      valid = false;
    }

    ["userNombre", "userApellidos", "userDireccion"].forEach(id => {
      const el = form[id];
      const errId = id + "Error";
      if (!el || el.value.trim() === "") {
        showError(errId, "Campo requerido");
        valid = false;
      } else {
        clearError(errId);
      }
    });

    if (!valid) return;

    let usersData = JSON.parse(localStorage.getItem("users")) || [];
    if (!usersData.length) usersData = getUsersWithFallback();

    if (isEdit) {
      const idx = usersData.findIndex(u => u.run === runParam);
      if (idx !== -1) {
        usersData[idx] = {
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
      localStorage.setItem("users", JSON.stringify(usersData));
      showToast("Usuario actualizado", "success", 900);
      setTimeout(() => (window.location.href = "lista-usuarios.html"), 900);
    } else {
      const nuevoUsuario = {
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
      usersData.push(nuevoUsuario);
      localStorage.setItem("users", JSON.stringify(usersData));
      showToast("Usuario creado", "success", 900);
      setTimeout(() => (window.location.href = "lista-usuarios.html"), 900);
    }
  });
}

/* ===========================
   Inicio
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  ensureToastContainer();

  renderAdminProducts();
  renderAdminUsers();
  loadAdminProductDetail();
  loadAdminUserDetail();
  setupProductForm();
  setupUserForm();
});
