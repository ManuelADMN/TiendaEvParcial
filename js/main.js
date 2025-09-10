// main.js (ajustado 100%: toasts no-bloqueantes, botón Pagar, compra exitosa, validaciones)

/* ===========================
   Utilidades Generales / Toast
   =========================== */

// Contenedor de notificaciones tipo "toast" (no bloqueantes)
function ensureToastContainer() {
  if (!document.getElementById("toast")) {
    const t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
}
/** Muestra un toast que aparece y desaparece solo. type: success | error | info */
function showToast(msg, type = "success", ms = 2500) {
  ensureToastContainer();
  const toast = document.getElementById("toast");
  toast.className = `toast show ${type}`;
  toast.textContent = msg;
  setTimeout(() => {
    toast.classList.remove("show");
  }, ms);
}

/* ===========================
   Utilidades de Validación
   =========================== */

/** Valida formato y dígito verificador de un RUN/RUT chileno (sin puntos ni guion). */
function validateRUT(rut) {
  rut = rut.trim().toUpperCase();
  if (!/^[0-9]{7,8}[0-9K]$/.test(rut)) {
    return false; // formato básico: 7 u 8 dígitos + dígito verificador
  }
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);
  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = '0';
  else if (dvEsperado === 10) dvEsperado = 'K';
  else dvEsperado = dvEsperado.toString();
  return dv === dvEsperado;
}

/** Valida que el email tenga uno de los dominios permitidos. */
function validateEmailDomain(email) {
  const allowed = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return allowed.some(domain => email.endsWith(domain));
}

// Muestra mensaje de error para un campo
function showError(elemId, message) {
  const errorElem = document.getElementById(elemId);
  if (errorElem) errorElem.innerText = message || "";
}
// Limpia mensaje de error de un campo
function clearError(elemId) {
  const errorElem = document.getElementById(elemId);
  if (errorElem) errorElem.innerText = "";
}

/* ===========================
   Carrito de Compras (localStorage)
   =========================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/** Actualiza el contador visible del carrito (en todos los spans posibles del nav). */
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.cantidad, 0);
  document
    .querySelectorAll(
      "#cartCount, #cartCountNav, #cartCountDet, #cartCountBlog, #cartCountBlogDet, #cartCountBlogDet2, #cartCountContact, #cartCountNos, #cartCountReg, #cartCountLogin, #cartCountCar"
    )
    .forEach(span => (span.textContent = `(${count})`));
}

/** Añade un producto al carrito */
function addToCart(productCode) {
  const productsData = JSON.parse(localStorage.getItem("products")) || [];
  const product = productsData.find(p => p.codigo === productCode);
  if (!product) return;

  const idx = cart.findIndex(item => item.codigo === productCode);
  if (idx >= 0) {
    // aumentar cantidad si ya existe
    cart[idx].cantidad += 1;
  } else {
    cart.push({
      codigo: productCode,
      nombre: product.nombre,
      precio: Number(product.precio) || 0,
      cantidad: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(`"${product.nombre}" añadido al carrito`, "success");
}

/** Remueve un producto del carrito completamente */
function removeFromCart(productCode) {
  cart = cart.filter(item => item.codigo !== productCode);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
  showToast("Producto eliminado del carrito", "info");
}

/** Vacía todo el carrito */
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
  showToast("Carrito vaciado", "info");
}

/** Pagar carrito (simulado) y redirigir a compra-exitosa.html */
function payCart() {
  if (!cart || cart.length === 0) {
    showToast("Tu carrito está vacío", "error");
    return;
  }
  // Aquí podrías validar sesión, stock, etc. Por ahora, simulamos éxito:
  localStorage.setItem("cart", JSON.stringify([]));
  cart = [];
  updateCartCount();
  showToast("Pago procesado ✔", "success", 1200);
  setTimeout(() => {
    window.location.href = "compra-exitosa.html";
  }, 1200);
}

/** Genera el HTML de la tabla del carrito en carrito.html */
function renderCart() {
  const cartItemsTbody = document.getElementById("cartItems");
  const totalElem = document.getElementById("cartTotal");
  const emptyMsg = document.getElementById("emptyCartMsg");
  const clearBtn = document.getElementById("clearCartBtn");
  const payBtn = document.getElementById("payBtn");

  if (!cartItemsTbody || !totalElem) return;

  if (cart.length === 0) {
    cartItemsTbody.innerHTML = "";
    totalElem.innerText = "";
    if (emptyMsg) emptyMsg.style.display = "block";
    if (clearBtn) clearBtn.style.display = "none";
    if (payBtn) payBtn.style.display = "none";
  } else {
    if (emptyMsg) emptyMsg.style.display = "none";
    if (clearBtn) clearBtn.style.display = "inline-block";
    if (payBtn) payBtn.style.display = "inline-block";

    let total = 0;
    cartItemsTbody.innerHTML = cart
      .map(item => {
        const subtotal = (Number(item.precio) || 0) * (Number(item.cantidad) || 0);
        total += subtotal;
        return `<tr>
          <td>${item.nombre}</td>
          <td>$${Number(item.precio).toFixed(2)}</td>
          <td>${item.cantidad}</td>
          <td>$${subtotal.toFixed(2)}</td>
          <td><button class="btn-del-item" data-code="${item.codigo}">Eliminar</button></td>
        </tr>`;
      })
      .join("");

    totalElem.innerText = `Total: $${total.toFixed(2)}`;

    // Listeners para eliminar ítems
    document.querySelectorAll(".btn-del-item").forEach(b => {
      b.addEventListener("click", () => {
        const code = b.getAttribute("data-code");
        removeFromCart(code);
      });
    });
  }
}

/* ===========================
   Listado y Detalle de Productos
   =========================== */

function renderProductList() {
  const productListDiv = document.getElementById("product-list");
  if (!productListDiv) return;
  const productsData = JSON.parse(localStorage.getItem("products")) || (typeof products !== "undefined" ? products : []);

  productListDiv.innerHTML = productsData
    .map(
      prod => `
    <div class="product-card">
      <img src="${prod.imagen || "img/placeholder.png"}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <p class="price">$${Number(prod.precio).toFixed(2)}</p>
      <p><a href="detalle-producto.html?code=${encodeURIComponent(prod.codigo)}">Ver Detalle</a></p>
      <button onclick="addToCart('${prod.codigo}')">Añadir al carrito</button>
    </div>
  `
    )
    .join("");
}

function loadProductDetail() {
  const detailSection = document.getElementById("product-detail");
  if (!detailSection) return;

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const productsData = JSON.parse(localStorage.getItem("products")) || (typeof products !== "undefined" ? products : []);
  const prod = productsData.find(p => p.codigo === code);

  if (prod) {
    const nameEl = document.getElementById("prodName");
    const descEl = document.getElementById("prodDesc");
    const priceEl = document.getElementById("prodPrice");
    const stockEl = document.getElementById("prodStock");
    const imgEl = document.getElementById("prodImage");
    const addBtn = document.getElementById("addToCartBtn");

    if (nameEl) nameEl.innerText = prod.nombre;
    if (descEl) descEl.innerText = prod.descripcion || "";
    if (priceEl) priceEl.innerText = Number(prod.precio).toFixed(2);
    if (stockEl) stockEl.innerText = prod.stock ?? 0;
    if (imgEl) imgEl.src = prod.imagen || "img/placeholder.png";
    if (addBtn) addBtn.onclick = () => addToCart(prod.codigo);
  }
}

/* ===========================
   Región / Comuna (Registro y Contacto)
   =========================== */

function populateRegions() {
  const regionSelects = document.querySelectorAll("#regRegion, #userRegion");
  regionSelects.forEach(select => {
    if (!select || typeof regionesYComunas === "undefined") return;

    // solo cargar si está vacío (evita duplicados)
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
      const comunasSelectId = select.id === "regRegion" ? "regComuna" : "userComuna";
      const comunaSelect = document.getElementById(comunasSelectId);
      if (comunaSelect) {
        comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
        const regionData = regionesYComunas.regiones.find(r => r.NombreRegion === regionName);
        if (regionData) {
          regionData.comunas.forEach(com => {
            const optC = document.createElement("option");
            optC.value = com;
            optC.textContent = com;
            comunaSelect.appendChild(optC);
          });
        }
      }
    };
  });
}

/* ===========================
   Formularios: Registro / Contacto / Login
   =========================== */

function setupRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.regRun.addEventListener("input", () => {
    if (form.regRun.value !== "" && !validateRUT(form.regRun.value)) {
      showError("regRunError", "RUN inválido");
    } else {
      clearError("regRunError");
    }
  });

  form.regEmail.addEventListener("input", () => {
    if (form.regEmail.value !== "" && !validateEmailDomain(form.regEmail.value)) {
      showError("regEmailError", "Dominio de correo no permitido");
    } else {
      clearError("regEmailError");
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    if (!validateRUT(form.regRun.value)) {
      showError("regRunError", "Debe ingresar un RUN válido");
      valid = false;
    }
    if (!validateEmailDomain(form.regEmail.value)) {
      showError("regEmailError", "Correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
      valid = false;
    }
    if (form.regPassword.value.length < 4 || form.regPassword.value.length > 10) {
      showError("regPasswordError", "Contraseña entre 4 y 10 caracteres");
      valid = false;
    }
    if (!form.regRegion.value || !form.regComuna.value) {
      showError("regRegionError", "Seleccione región y comuna");
      valid = false;
    } else {
      clearError("regRegionError");
    }

    // validar requeridos mínimos
    ["regNombre", "regApellidos", "regDireccion", "regFechaNac"].forEach(id => {
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

    const nuevoUsuario = {
      run: form.regRun.value.toUpperCase(),
      nombre: form.regNombre.value.trim(),
      apellidos: form.regApellidos.value.trim(),
      email: form.regEmail.value.trim(),
      fechaNacimiento: form.regFechaNac.value,
      tipo: "Cliente",
      region: form.regRegion.value,
      comuna: form.regComuna.value,
      direccion: form.regDireccion.value.trim(),
      password: form.regPassword.value
    };

    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    usersData.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(usersData));

    form.reset();
    const ok = document.getElementById("regSuccess");
    if (ok) ok.style.display = "block";
    showToast("Registro exitoso. ¡Bienvenido!", "success");
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.contactEmail.addEventListener("input", () => {
    if (form.contactEmail.value !== "" && !validateEmailDomain(form.contactEmail.value)) {
      showError("contactEmailError", "Correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
    } else {
      clearError("contactEmailError");
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    if (form.contactName.value.trim() === "") {
      showError("contactNameError", "Nombre es requerido");
      valid = false;
    } else clearError("contactNameError");

    if (!validateEmailDomain(form.contactEmail.value)) {
      showError("contactEmailError", "Dominio de correo no permitido");
      valid = false;
    } else clearError("contactEmailError");

    if (form.contactMsg.value.trim() === "") {
      showError("contactMsgError", "Comentario es requerido");
      valid = false;
    } else clearError("contactMsgError");

    if (!valid) return;

    form.reset();
    const ok = document.getElementById("contactSuccess");
    if (ok) ok.style.display = "block";
    showToast("Mensaje enviado. Te contactaremos pronto.", "success");
  });
}

function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = form.loginEmail.value.trim();
    const pass = form.loginPass.value;

    let valid = true;

    if (!validateEmailDomain(email)) {
      showError("loginEmailError", "Correo no permitido");
      valid = false;
    } else clearError("loginEmailError");

    if (pass.length < 4 || pass.length > 10) {
      showError("loginPassError", "Contraseña 4-10 caracteres");
      valid = false;
    } else clearError("loginPassError");

    if (!valid) return;

    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const user = usersData.find(u => u.email === email && u.password === pass);

    if (!user) {
      const err = document.getElementById("loginErrorMsg");
      if (err) err.innerText = "Credenciales incorrectas";
      showToast("Credenciales incorrectas", "error");
      return;
    }

    // Guardar sesión y redirigir por rol
    localStorage.setItem("loggedUser", JSON.stringify(user));
    const err = document.getElementById("loginErrorMsg");
    if (err) err.innerText = "";

    if (user.tipo === "Administrador" || user.tipo === "Vendedor") {
      showToast(`Bienvenido ${user.nombre}. Redirigiendo al panel...`, "success", 900);
      setTimeout(() => (window.location.href = "admin/index.html"), 900);
    } else {
      showToast(`¡Login exitoso! Bienvenido, ${user.nombre}`, "success", 900);
      setTimeout(() => (window.location.href = "index.html"), 900);
    }
  });
}

/* ===========================
   Inicialización
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  // Toast container (por si la página no lo trae en el HTML)
  ensureToastContainer();

  updateCartCount();
  renderProductList();
  loadProductDetail();
  populateRegions();
  setupRegisterForm();
  setupContactForm();
  setupLoginForm();

  // Página carrito: enlazar acciones
  const isCartPage = /carrito\.html$/.test(window.location.pathname) || document.getElementById("cart-container");
  if (isCartPage) {
    renderCart();
    const clearBtn = document.getElementById("clearCartBtn");
    if (clearBtn) clearBtn.onclick = clearCart;
    const payBtn = document.getElementById("payBtn");
    if (payBtn) payBtn.onclick = payCart;
  }
});
