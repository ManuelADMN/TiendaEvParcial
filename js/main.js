// main.js

// ==== Utilidades de Validación ====

/** Valida formato y dígito verificador de un RUN/RUT chileno (sin puntos ni guion). */
function validateRUT(rut) {
  rut = rut.trim().toUpperCase();
  if (!/^[0-9]{7,8}[0-9K]$/.test(rut)) {
    return false; // formato básico: 7 u 8 dígitos más dígito verificador
  }
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);
  // Cálculo DV
  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
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
  // Dominios permitidos
  const allowed = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return allowed.some(domain => email.endsWith(domain));
}

// Muestra mensaje de error para un campo
function showError(elemId, message) {
  const errorElem = document.getElementById(elemId);
  if (errorElem) {
    errorElem.innerText = message;
  }
}
// Limpia mensaje de error de un campo
function clearError(elemId) {
  const errorElem = document.getElementById(elemId);
  if (errorElem) {
    errorElem.innerText = "";
  }
}

// ==== Manejo de Carrito ====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/** Actualiza el contador visible del carrito (en el nav) */
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.cantidad, 0);
  document.querySelectorAll("#cartCount, #cartCountNav, #cartCountDet, #cartCountBlog, #cartCountBlogDet, #cartCountBlogDet2, #cartCountContact, #cartCountNos, #cartCountReg, #cartCountLogin, #cartCountCar")
    .forEach(span => span.textContent = `(${count})`);
}

/** Añade un producto al carrito */
function addToCart(productCode) {
  const productsData = JSON.parse(localStorage.getItem("products")) || [];
  const product = productsData.find(p => p.codigo === productCode);
  if (!product) return;
  const indexInCart = cart.findIndex(item => item.codigo === productCode);
  if (indexInCart >= 0) {
    // Si ya está, aumentar cantidad
    cart[indexInCart].cantidad += 1;
  } else {
    cart.push({ codigo: productCode, nombre: product.nombre, precio: product.precio, cantidad: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`Producto "${product.nombre}" añadido al carrito.`);
}

/** Remueve un producto del carrito completamente */
function removeFromCart(productCode) {
  cart = cart.filter(item => item.codigo !== productCode);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); // vuelve a dibujar
  updateCartCount();
}

/** Vacía todo el carrito */
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

/** Genera el HTML de la tabla del carrito en carrito.html */
function renderCart() {
  const cartItemsTbody = document.getElementById("cartItems");
  const totalElem = document.getElementById("cartTotal");
  const emptyMsg = document.getElementById("emptyCartMsg");
  const clearBtn = document.getElementById("clearCartBtn");
  if (!cartItemsTbody || !totalElem) return;
  // Si carrito vacío
  if (cart.length === 0) {
    cartItemsTbody.innerHTML = "";
    totalElem.innerText = "";
    emptyMsg.style.display = "block";
    clearBtn.style.display = "none";
  } else {
    emptyMsg.style.display = "none";
    clearBtn.style.display = "inline-block";
    let total = 0;
    cartItemsTbody.innerHTML = cart.map(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      return `<tr>
        <td>${item.nombre}</td>
        <td>$${item.precio.toFixed(2)}</td>
        <td>${item.cantidad}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button onclick="removeFromCart('${item.codigo}')">Eliminar</button></td>
      </tr>`;
    }).join("");
    totalElem.innerText = `Total: $${total.toFixed(2)}`;
  }
}

// ==== Carga de Productos en páginas Home/Productos ====

function renderProductList() {
  const productListDiv = document.getElementById("product-list");
  if (!productListDiv) return;
  const productsData = JSON.parse(localStorage.getItem("products")) || products;
  productListDiv.innerHTML = productsData.map(prod => `
    <div class="product-card">
      <img src="${prod.imagen || 'img/placeholder.png'}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <p class="price">$${prod.precio.toFixed(2)}</p>
      <p><a href="detalle-producto.html?code=${prod.codigo}">Ver Detalle</a></p>
      <button onclick="addToCart('${prod.codigo}')">Añadir al carrito</button>
    </div>
  `).join("");
}

// ==== Detalle de Producto ====

function loadProductDetail() {
  const detailSection = document.getElementById("product-detail");
  if (!detailSection) return;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const productsData = JSON.parse(localStorage.getItem("products")) || products;
  const prod = productsData.find(p => p.codigo === code);
  if (prod) {
    document.getElementById("prodName").innerText = prod.nombre;
    document.getElementById("prodDesc").innerText = prod.descripcion;
    document.getElementById("prodPrice").innerText = prod.precio.toFixed(2);
    document.getElementById("prodStock").innerText = prod.stock;
    document.getElementById("prodImage").src = prod.imagen || "img/placeholder.png";
    // Botón añadir al carrito
    document.getElementById("addToCartBtn").onclick = () => addToCart(prod.codigo);
  }
}

// ==== Manejo de Región/Comuna (Registro y Contacto) ====

function populateRegions() {
  const regionSelects = document.querySelectorAll("#regRegion, #userRegion");
  regionSelects.forEach(select => {
    if (!select) return;
    regionesYComunas.regiones.forEach(reg => {
      const opt = document.createElement("option");
      opt.value = reg.NombreRegion;
      opt.textContent = reg.NombreRegion;
      select.appendChild(opt);
    });
    select.onchange = (e) => {
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

// ==== Validación de Formularios ====

/** Configura validaciones para formulario de Registro */
function setupRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;
  // Eventos de validación en vivo
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
  // (Se pueden agregar más eventListeners para otros campos si se desea)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validación completa antes de aceptar
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
    // ... otras validaciones de requeridos y tamaños ...
    if (!form.regRegion.value) {
      valid = false;
      alert("Por favor seleccione una región y comuna");
    }
    if (!valid) return;
    // Si todo válido, registrar usuario
    const nuevoUsuario = {
      run: form.regRun.value.toUpperCase(),
      nombre: form.regNombre.value,
      apellidos: form.regApellidos.value,
      email: form.regEmail.value,
      fechaNacimiento: form.regFechaNac.value,
      tipo: "Cliente",
      region: form.regRegion.value,
      comuna: form.regComuna.value,
      direccion: form.regDireccion.value,
      password: form.regPassword.value
    };
    let usersData = JSON.parse(localStorage.getItem("users")) || [];
    usersData.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(usersData));
    form.reset();
    document.getElementById("regSuccess").style.display = "block";
  });
}

/** Configura validaciones para formulario de Contacto */
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
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    if (form.contactName.value.trim() === "") {
      showError("contactNameError", "Nombre es requerido");
      valid = false;
    }
    if (!validateEmailDomain(form.contactEmail.value)) {
      showError("contactEmailError", "Dominio de correo no permitido");
      valid = false;
    }
    if (form.contactMsg.value.trim() === "") {
      showError("contactMsgError", "Comentario es requerido");
      valid = false;
    }
    if (!valid) return;
    // Simular envío exitoso
    form.reset();
    document.getElementById("contactSuccess").style.display = "block";
  });
}

/** Configura validaciones y lógica para formulario de Login */
function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.loginEmail.value;
    const pass = form.loginPass.value;
    // Validación básica
    if (!validateEmailDomain(email)) {
      showError("loginEmailError", "Correo no permitido");
      return;
    }
    if (pass.length < 4 || pass.length > 10) {
      showError("loginPassError", "Contraseña 4-10 caracteres");
      return;
    }
    // Autenticación
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const user = usersData.find(u => u.email === email && u.password === pass);
    if (!user) {
      document.getElementById("loginErrorMsg").innerText = "Credenciales incorrectas";
    } else {
      // Guardar sesión
      localStorage.setItem("loggedUser", JSON.stringify(user));
      document.getElementById("loginErrorMsg").innerText = "";
      if (user.tipo === "Administrador" || user.tipo === "Vendedor") {
        // Redirigir a panel admin
        window.location.href = "admin/index.html";
      } else {
        alert("¡Login exitoso! Bienvenido, " + user.nombre);
        window.location.href = "index.html";
      }
    }
  });
}

// ==== Inicialización al cargar la página ====

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProductList();
  loadProductDetail();
  populateRegions();
  setupRegisterForm();
  setupContactForm();
  setupLoginForm();
  if (window.location.pathname.endsWith("carrito.html")) {
    renderCart();
    const clearBtn = document.getElementById("clearCartBtn");
    if (clearBtn) clearBtn.onclick = clearCart;
  }
});
