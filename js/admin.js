// admin.js

// Proteger vistas admin: solo permitir si hay usuario logueado admin o vendedor
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser || (loggedUser.tipo !== "Administrador" && loggedUser.tipo !== "Vendedor")) {
  alert("Acceso no autorizado. Debe iniciar sesión como administrador o vendedor.");
  window.location.href = "../login.html";
}

// Si usuario es Vendedor, ocultar sección Usuarios (no tiene permiso)
if (loggedUser && loggedUser.tipo === "Vendedor") {
  const userMenuLink = document.querySelector('.admin-nav a[href="lista-usuarios.html"]');
  if (userMenuLink) userMenuLink.style.display = "none";
}

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "../login.html";
  });
}

// Renderizar tabla de productos en admin
function renderAdminProducts() {
  const tableBody = document.getElementById("adminProductsTable");
  if (!tableBody) return;
  const productsData = JSON.parse(localStorage.getItem("products")) || [];
  tableBody.innerHTML = productsData.map(prod => `
    <tr>
      <td>${prod.codigo}</td>
      <td>${prod.nombre}</td>
      <td>$${prod.precio.toFixed(2)}</td>
      <td>${prod.stock}</td>
      <td>${prod.categoria}</td>
      <td>
        <a href="ver-producto.html?code=${prod.codigo}">Ver</a> |
        <a href="editar-producto.html?code=${prod.codigo}">Editar</a> |
        <a href="#" class="delete-prod" data-code="${prod.codigo}">Eliminar</a>
      </td>
    </tr>
  `).join("");
  // Agregar manejadores a botones eliminar
  document.querySelectorAll(".delete-prod").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const code = link.getAttribute("data-code");
      if (confirm("¿Eliminar producto " + code + "?")) {
        let prodList = JSON.parse(localStorage.getItem("products")) || [];
        prodList = prodList.filter(p => p.codigo !== code);
        localStorage.setItem("products", JSON.stringify(prodList));
        renderAdminProducts();
      }
    });
  });
}

// Renderizar tabla de usuarios en admin
function renderAdminUsers() {
  const tableBody = document.getElementById("adminUsersTable");
  if (!tableBody) return;
  const usersData = JSON.parse(localStorage.getItem("users")) || [];
  tableBody.innerHTML = usersData.map(user => `
    <tr>
      <td>${user.run}</td>
      <td>${user.nombre} ${user.apellidos}</td>
      <td>${user.email}</td>
      <td>${user.tipo}</td>
      <td>
        <a href="ver-usuario.html?run=${user.run}">Ver</a> |
        <a href="editar-usuario.html?run=${user.run}">Editar</a>
      </td>
    </tr>
  `).join("");
  // (No se implementa eliminación de usuarios en este ejemplo para no borrar admin accidentalmente)
}

// Cargar detalle de producto en ver-producto.html
function loadAdminProductDetail() {
  const detCode = new URLSearchParams(window.location.search).get("code");
  if (!detCode) return;
  const prod = (JSON.parse(localStorage.getItem("products")) || []).find(p => p.codigo === detCode);
  if (prod) {
    document.getElementById("detProdCodigo").innerText = prod.codigo;
    document.getElementById("detProdNombre").innerText = prod.nombre;
    document.getElementById("detProdDesc").innerText = prod.descripcion || "";
    document.getElementById("detProdPrecio").innerText = prod.precio.toFixed(2);
    document.getElementById("detProdStock").innerText = prod.stock;
    document.getElementById("detProdStockCritico").innerText = prod.stockCritico ?? "";
    document.getElementById("detProdCategoria").innerText = prod.categoria;
    document.getElementById("detProdImagen").innerText = prod.imagen ? prod.imagen : "No definida";
  }
}

// Cargar detalle de usuario en ver-usuario.html
function loadAdminUserDetail() {
  const detRun = new URLSearchParams(window.location.search).get("run");
  if (!detRun) return;
  const usr = (JSON.parse(localStorage.getItem("users")) || []).find(u => u.run === detRun);
  if (usr) {
    document.getElementById("detUserRun").innerText = usr.run;
    document.getElementById("detUserNombre").innerText = usr.nombre;
    document.getElementById("detUserApellidos").innerText = usr.apellidos;
    document.getElementById("detUserEmail").innerText = usr.email;
    document.getElementById("detUserFechaNac").innerText = usr.fechaNacimiento || "";
    document.getElementById("detUserTipo").innerText = usr.tipo;
    document.getElementById("detUserRegion").innerText = usr.region;
    document.getElementById("detUserComuna").innerText = usr.comuna;
    document.getElementById("detUserDireccion").innerText = usr.direccion;
  }
}

// Configurar formulario Nuevo/Editar Producto
function setupProductForm() {
  const form = document.getElementById("productForm") || document.getElementById("productFormEdit");
  if (!form) return;
  // Si es editar, precargar datos del producto
  const prodCodeParam = new URLSearchParams(window.location.search).get("code");
  let editing = false;
  if (prodCodeParam && form.id === "productFormEdit") {
    const prodData = JSON.parse(localStorage.getItem("products")) || [];
    const prod = prodData.find(p => p.codigo === prodCodeParam);
    if (prod) {
      form.prodCodigo.value = prod.codigo;
      form.prodNombre.value = prod.nombre;
      form.prodDesc.value = prod.descripcion;
      form.prodPrecio.value = prod.precio;
      form.prodStock.value = prod.stock;
      form.prodStockCritico.value = prod.stockCritico ?? "";
      form.prodCategoria.value = prod.categoria;
      // Nota: no manejamos imagen actual
      editing = true;
    }
  }
  // Llenar select de categorías
  const catSelect = form.prodCategoria;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
  });
  // Validaciones básicas en submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    if (form.prodCodigo.value.trim().length < 3) {
      showError("prodCodigoError", "Código mínimo 3 caracteres");
      valid = false;
    } else {
      clearError("prodCodigoError");
    }
    if (form.prodNombre.value.trim() === "") {
      showError("prodNombreError", "Nombre es requerido");
      valid = false;
    } else {
      clearError("prodNombreError");
    }
    if (form.prodPrecio.value === "" || parseFloat(form.prodPrecio.value) < 0) {
      showError("prodPrecioError", "Precio no válido");
      valid = false;
    } else {
      clearError("prodPrecioError");
    }
    if (form.prodStock.value === "" || parseInt(form.prodStock.value) < 0) {
      showError("prodStockError", "Stock no válido");
      valid = false;
    } else {
      clearError("prodStockError");
    }
    if (!form.prodCategoria.value) {
      showError("prodCategoriaError", "Seleccione categoría");
      valid = false;
    } else {
      clearError("prodCategoriaError");
    }
    if (!valid) return;
    // Guardar producto (nuevo o editado)
    let prodList = JSON.parse(localStorage.getItem("products")) || [];
    if (editing) {
      // Encontrar y actualizar
      const idx = prodList.findIndex(p => p.codigo === prodCodeParam);
      if (idx !== -1) {
        prodList[idx] = {
          codigo: form.prodCodigo.value.trim(),
          nombre: form.prodNombre.value.trim(),
          descripcion: form.prodDesc.value.trim(),
          precio: parseFloat(form.prodPrecio.value),
          stock: parseInt(form.prodStock.value),
          stockCritico: form.prodStockCritico.value ? parseInt(form.prodStockCritico.value) : null,
          categoria: form.prodCategoria.value,
          imagen: prodList[idx].imagen // mantenemos la ruta de imagen existente (o null)
        };
      }
    } else {
      // Añadir nuevo producto
      const nuevoProd = {
        codigo: form.prodCodigo.value.trim(),
        nombre: form.prodNombre.value.trim(),
        descripcion: form.prodDesc.value.trim(),
        precio: parseFloat(form.prodPrecio.value),
        stock: parseInt(form.prodStock.value),
        stockCritico: form.prodStockCritico.value ? parseInt(form.prodStockCritico.value) : null,
        categoria: form.prodCategoria.value,
        imagen: "" // en este prototipo no procesamos la imagen subida
      };
      prodList.push(nuevoProd);
    }
    localStorage.setItem("products", JSON.stringify(prodList));
    window.location.href = "lista-productos.html";
  });
}

// Configurar formulario Nuevo/Editar Usuario
function setupUserForm() {
  const form = document.getElementById("userForm") || document.getElementById("userFormEdit");
  if (!form) return;
  // Si es editar, precargar datos del usuario
  const runParam = new URLSearchParams(window.location.search).get("run");
  let editing = false;
  if (runParam && form.id === "userFormEdit") {
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const usr = usersData.find(u => u.run === runParam);
    if (usr) {
      form.userRun.value = usr.run;
      form.userNombre.value = usr.nombre;
      form.userApellidos.value = usr.apellidos;
      form.userEmail.value = usr.email;
      form.userFechaNac.value = usr.fechaNacimiento;
      form.userTipo.value = usr.tipo;
      // Rellenar región/comuna tras cargar regiones
      setTimeout(() => {
        form.userRegion.value = usr.region;
        // disparar evento para cargar comunas:
        form.userRegion.dispatchEvent(new Event('change'));
        form.userComuna.value = usr.comuna;
      }, 100);
      form.userDireccion.value = usr.direccion;
      form.userPassword.value = usr.password;
      editing = true;
    }
  }
  // Llenar select de regiones (y comunas se cargan por evento onchange definido en main.js populateRegions)
  populateRegions();
  // Validaciones en submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    if (!validateRUT(form.userRun.value)) {
      showError("userRunError", "RUN inválido");
      valid = false;
    } else {
      clearError("userRunError");
    }
    if (!validateEmailDomain(form.userEmail.value)) {
      showError("userEmailError", "Correo no permitido");
      valid = false;
    } else {
      clearError("userEmailError");
    }
    if (form.userPassword.value.length < 4 || form.userPassword.value.length > 10) {
      showError("userPasswordError", "Contraseña 4-10 caracteres");
      valid = false;
    } else {
      clearError("userPasswordError");
    }
    if (!form.userTipo.value) {
      alert("Seleccione un tipo de usuario");
      valid = false;
    }
    if (!form.userRegion.value || !form.userComuna.value) {
      alert("Seleccione región y comuna");
      valid = false;
    }
    if (!valid) return;
    // Guardar usuario (nuevo o editado)
    let usersData = JSON.parse(localStorage.getItem("users")) || [];
    if (editing) {
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
    }
    localStorage.setItem("users", JSON.stringify(usersData));
    window.location.href = "lista-usuarios.html";
  });
}

// Inicialización cuando DOM listo
document.addEventListener("DOMContentLoaded", () => {
  renderAdminProducts();
  renderAdminUsers();
  loadAdminProductDetail();
  loadAdminUserDetail();
  setupProductForm();
  setupUserForm();
});
