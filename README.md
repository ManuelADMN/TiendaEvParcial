# TiendaX — README (Evaluación Parcial 1 · DSY1104)

**Tecnologías:** HTML + CSS + JavaScript (vanilla).
**Objetivo:** Demostrar con evidencia (texto + fragmentos de código) que este repositorio **cumple al 100%** los requisitos de la **Evaluación Parcial 1** (Anexo 1 + ERS IEEE-830).

---

## 🗂️ Índice

* [Matriz de Cumplimiento](#-matriz-de-cumplimiento)
* [Estructura del Proyecto](#-estructura-del-proyecto)
* [Cómo lo hicimos (con código)](#-cómo-lo-hicimos-con-código)

  * [Notificaciones (toasts)](#1-notificaciones-toasts)
  * [Tarjetas de productos + efecto hover](#2-tarjetas-de-productos--efecto-hover)
  * [CRUD Productos](#3-crud-productos)
  * [CRUD Usuarios](#4-crud-usuarios)
  * [Login + dominios permitidos + roles](#5-login--dominios-permitidos--roles)
  * [Blogs e interacciones](#6-blogs-e-interacciones)
  * [Carrito + localStorage](#7-carrito--localstorage)
  * [Validaciones en vivo (Registro/Contacto/Login)](#8-validaciones-en-vivo-registrocontactologin)
  * [Regiones y comunas (select encadenado)](#9-regiones-y-comunas-select-encadenado)
  * [Navbar, contador y sesión](#10-navbar-contador-y-sesión)
* [ERS (IEEE-830) — v1](#-ers-ieee830--v1)
* [Uso de GitHub](#-uso-de-github)
* [Cómo ejecutar](#-cómo-ejecutar)
* [Créditos](#-créditos)

---

## ✅ Matriz de Cumplimiento

| Área     | Requisito                                                        | Evidencia                                                        | Estado |
| -------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ------ |
| HTML     | Estructura semántica (header/nav/main/section/article/footer)    | Ver *Estructura* y vistas                                        | ✅      |
| HTML     | Navegación entre páginas (links, imágenes, botones, formularios) | Navbar + vistas + formularios                                    | ✅      |
| CSS      | Hoja externa, diseño consistente y responsivo                    | `css/styles.css`, grid/flex, media queries                       | ✅      |
| CSS      | Tarjetas de productos con hover “flotante”                       | [§ Tarjetas](#2-tarjetas-de-productos--efecto-hover)             | ✅      |
| JS       | Validación formularios (en vivo + mensajes)                      | [§ Validaciones](#8-validaciones-en-vivo-registrocontactologin)  | ✅      |
| JS       | Carrito con reglas y `localStorage`                              | [§ Carrito](#7-carrito--localstorage)                            | ✅      |
| JS       | Login con dominios permitidos y 4–10 chars                       | [§ Login](#5-login--dominios-permitidos--roles)                  | ✅      |
| Admin    | CRUD Productos y Usuarios                                        | [§ CRUD](#3-crud-productos), [§ CRUD Usuarios](#4-crud-usuarios) | ✅      |
| Roles    | Admin, Vendedor, Cliente (accesos)                               | Guardas por rol y ocultar menús                                  | ✅      |
| Blog     | Listado + 2 detalles                                             | [§ Blogs](#6-blogs-e-interacciones)                              | ✅      |
| Contacto | Form con validación                                              | [§ Validaciones](#8-validaciones-en-vivo-registrocontactologin)  | ✅      |
| Repos    | GitHub (commits y estructura)                                    | [§ GitHub](#-uso-de-github)                                      | ✅      |

---

## 📁 Estructura del Proyecto

```
.
├─ index.html                 # Home
├─ productos.html             # Listado de productos
├─ producto.html              # Detalle
├─ blog.html                  # Blog (listado)
├─ blog-detalle1.html         # Detalle 1
├─ blog-detalle2.html         # Detalle 2
├─ nosotros.html              # Quiénes somos
├─ contacto.html              # Contacto
├─ registro.html              # Registro
├─ login.html                 # Login
├─ carrito.html               # Carrito
├─ admin/
│  ├─ index.html              # Dashboard
│  ├─ productos.html          # Listar productos
│  ├─ producto-nuevo.html     # Crear producto
│  ├─ producto-editar.html    # Editar producto
│  ├─ usuarios.html           # Listar usuarios
│  ├─ usuario-nuevo.html      # Crear usuario
│  └─ usuario-editar.html     # Editar usuario
├─ css/
│  └─ styles.css              # Estilos propios
├─ js/
│  ├─ data.js                 # Seeds (opcional)
│  ├─ auth.js                 # Login/roles/guardas
│  ├─ cart.js                 # Carrito
│  ├─ crud-products.js        # CRUD productos
│  ├─ crud-users.js           # CRUD usuarios
│  ├─ forms.js                # Validaciones + helpers
│  ├─ regions.js              # Regiones/comunas
│  └─ ui.js                   # Navbar, toasts, contadores
└─ img/
   ├─ productos/...
   └─ blog/...
```

---

## 🔧 Cómo lo hicimos (con código)

> **Nota:** Todo el código es **vanilla JS** (sin frameworks). Puedes copiar y pegar los fragmentos en los archivos indicados.

### 1) Notificaciones (toasts)

**HTML** (una sola vez, al final del `<body>`):

```html
<div id="toast" class="toast" aria-live="polite" aria-atomic="true"></div>
```

**CSS** (`css/styles.css`):

```css
.toast{
  position: fixed; right: 18px; bottom: 18px;
  min-width: 220px; max-width: 340px; padding: 10px 12px;
  color: #fff; background: #0f172a; border: 1px solid #1f2a44; border-radius: 10px;
  transform: translateY(12px); opacity: 0; transition: all .25s ease;
  pointer-events: none; box-shadow: 0 8px 24px rgba(0,0,0,.35);
}
.toast.show{ transform: translateY(0); opacity: 1; }
.toast.success{ background:#0f2a1a; border-color:#1c5635; }
.toast.error{ background:#2a0f12; border-color:#66323a; }
.toast.info{ background:#0f1c2a; border-color:#2c3b55; }
```

**JS** (`js/ui.js`):

```js
function ensureToast(){
  if(!document.getElementById("toast")){
    const d = document.createElement("div");
    d.id = "toast"; d.className = "toast";
    document.body.appendChild(d);
  }
}
export function showToast(message, type="success", ms=2200){
  ensureToast();
  const t = document.getElementById("toast");
  t.className = `toast show ${type}`;
  t.textContent = message;
  clearTimeout(showToast._h);
  showToast._h = setTimeout(() => t.className = "toast", ms);
}
```

---

### 2) Tarjetas de productos + efecto hover

**HTML** (render dinámico o estático):

```html
<div id="productos-list"></div>
```

**CSS** (`styles.css`):

```css
.product-card{
  background:#0b1220; border:1px solid #1a2438; border-radius:14px; padding:12px;
  transition:transform .15s ease, box-shadow .2s ease;
}
.product-card:hover{ transform:translateY(-2px); box-shadow:0 10px 30px rgba(0,0,0,.35); }
.product-card img{ width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:10px; }
.product-card .price{ color:#7cffc4; font-weight:700; margin:8px 0; }
```

**JS** (en `productos.html` o `js/crud-products.js`):

```js
const list = document.getElementById("productos-list");
const products = JSON.parse(localStorage.getItem("products")) || [];
list.innerHTML = products.map(p => `
  <div class="product-card">
    <img src="${p.img}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p class="price">$${Number(p.precio).toLocaleString()}</p>
    <button onclick="addToCart('${p.codigo}')">Añadir al carrito</button>
    <a class="more" href="producto.html?code=${encodeURIComponent(p.codigo)}">Ver detalle</a>
  </div>
`).join("");
```

---

### 3) CRUD Productos

**JS** (`js/crud-products.js`):

```js
import { showToast } from "./ui.js";
const LS_PRODUCTS = "products";

function getProducts(){ return JSON.parse(localStorage.getItem(LS_PRODUCTS)) || []; }
function setProducts(arr){ localStorage.setItem(LS_PRODUCTS, JSON.stringify(arr)); }

export function renderProductsTable(){
  const tbody = document.querySelector("#tblProducts tbody");
  const data = getProducts();
  tbody.innerHTML = data.map(p => `
    <tr>
      <td>${p.codigo}</td><td>${p.nombre}</td>
      <td>$${Number(p.precio).toLocaleString()}</td>
      <td>${p.stock}</td><td>${p.categoria}</td>
      <td>
        <a href="producto-editar.html?code=${encodeURIComponent(p.codigo)}">Editar</a> |
        <a href="#" class="del" data-code="${p.codigo}">Eliminar</a>
      </td>
    </tr>`).join("");

  tbody.querySelectorAll(".del").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    const code = a.dataset.code;
    setProducts(getProducts().filter(x => x.codigo !== code));
    renderProductsTable();
    showToast("Producto eliminado", "info");
  }));
}

export function createOrUpdateProduct(form){
  const p = Object.fromEntries(new FormData(form));
  if(!p.codigo || p.codigo.length < 3) return showToast("Código inválido (min 3)", "error");
  if(!p.nombre || p.nombre.length > 100) return showToast("Nombre inválido", "error");
  if(Number(p.precio) < 0) return showToast("Precio no puede ser negativo", "error");
  if(!Number.isInteger(Number(p.stock)) || Number(p.stock) < 0) return showToast("Stock inválido", "error");
  const data = getProducts();
  const ix = data.findIndex(x => x.codigo === p.codigo);
  if(ix >= 0) data[ix] = {...data[ix], ...p, precio:Number(p.precio), stock:Number(p.stock)};
  else data.push({...p, precio:Number(p.precio), stock:Number(p.stock)});
  setProducts(data);
  showToast(ix >= 0 ? "Producto actualizado" : "Producto creado", "success");
}
```

**HTML** (admin tabla):

```html
<table id="tblProducts">
  <thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th></tr></thead>
  <tbody></tbody>
</table>
```

---

### 4) CRUD Usuarios

**JS** (`js/crud-users.js`):

```js
import { showToast } from "./ui.js";
import { validateRUT, validateEmailDomain } from "./forms.js";
const LS_USERS = "users";

function getUsers(){ return JSON.parse(localStorage.getItem(LS_USERS)) || []; }
function setUsers(arr){ localStorage.setItem(LS_USERS, JSON.stringify(arr)); }

export function renderUsersTable(){
  const tbody = document.querySelector("#tblUsers tbody");
  const data = getUsers();
  tbody.innerHTML = data.map(u => `
    <tr>
      <td>${u.run}</td><td>${u.nombres} ${u.apellidos}</td>
      <td>${u.email}</td><td>${u.rol}</td>
      <td>
        <a href="usuario-editar.html?run=${encodeURIComponent(u.run)}">Editar</a> |
        <a href="#" class="del" data-run="${u.run}">Eliminar</a>
      </td>
    </tr>`).join("");

  tbody.querySelectorAll(".del").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    setUsers(getUsers().filter(x => x.run !== a.dataset.run));
    renderUsersTable();
    showToast("Usuario eliminado", "info");
  }));
}

export function createOrUpdateUser(form){
  const u = Object.fromEntries(new FormData(form));
  if(!validateRUT(u.run)) return showToast("RUN inválido", "error");
  if(!validateEmailDomain(u.email)) return showToast("Email no permitido", "error");
  if(u.nombres.length === 0 || u.nombres.length > 50) return showToast("Nombre inválido", "error");
  if(u.apellidos.length === 0 || u.apellidos.length > 100) return showToast("Apellidos inválidos", "error");

  const data = getUsers();
  const ix = data.findIndex(x => x.run === u.run);
  if(ix >= 0) data[ix] = {...data[ix], ...u};
  else data.push(u);
  setUsers(data);
  showToast(ix >= 0 ? "Usuario actualizado" : "Usuario creado", "success");
}
```

---

### 5) Login + dominios permitidos + roles

**JS** (`js/auth.js`):

```js
const ALLOWED = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
export function validateEmailDomain(email){ return ALLOWED.some(dom => email.endsWith(dom)); }

export function login(email, pass){
  if(!validateEmailDomain(email)) return {ok:false, msg:"Correo no permitido"};
  if(pass.length < 4 || pass.length > 10) return {ok:false, msg:"Contraseña 4–10 caracteres"};
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const u = users.find(x => x.email === email && x.pass === pass);
  if(!u) return {ok:false, msg:"Credenciales incorrectas"};
  localStorage.setItem("loggedUser", JSON.stringify(u));
  return {ok:true, role:u.rol || "Cliente"};
}

export function requireRole(roles=["Administrador"]){
  const u = JSON.parse(localStorage.getItem("loggedUser"));
  if(!u || !roles.includes(u.rol)) location.href = "/login.html";
}
```

---

### 6) Blogs e interacciones

**HTML** (`blog.html`):

```html
<article class="blog-item">
  <img class="blog-thumb" src="img/blog/ai-trends.png" alt="Tendencias Tech 2025">
  <div>
    <h3><a href="blog-detalle1.html">Tendencias Tech 2025</a></h3>
    <p>Repasamos novedades de hardware y gaming del último trimestre…</p>
    <a class="more" href="blog-detalle1.html">Leer más</a>
  </div>
</article>
```

**CSS**:

```css
.blog-item{ display:grid; grid-template-columns:120px 1fr; gap:12px; padding:12px; border:1px solid #1a2438; border-radius:12px; }
.blog-thumb{ width:100%; height:80px; object-fit:cover; border-radius:10px; }
.blog-item h3 a{ color:#cfe7ff; text-decoration:none; }
.blog-item h3 a:hover{ color:#6dd3ff; }
```

---

### 7) Carrito + `localStorage`

**JS** (`js/cart.js`):

```js
import { showToast } from "./ui.js";
const LS_CART = "cart";

export function getCart(){ return JSON.parse(localStorage.getItem(LS_CART)) || []; }
export function setCart(arr){ localStorage.setItem(LS_CART, JSON.stringify(arr)); }

export function updateCartBadge(){
  const n = getCart().reduce((s,x) => s + x.cantidad, 0);
  const el = document.getElementById("cart-count");
  if(el) el.textContent = String(n);
}

export function addToCart(code){
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const p = products.find(x => x.codigo === code);
  if(!p) return;
  const cart = getCart();
  const i = cart.findIndex(x => x.codigo === code);
  if(i >= 0) cart[i].cantidad += 1;
  else cart.push({codigo:code, nombre:p.nombre, precio:Number(p.precio)||0, cantidad:1});
  setCart(cart);
  updateCartBadge();
  showToast(`"${p.nombre}" añadido al carrito`, "success");
}

export function removeFromCart(code){
  setCart(getCart().filter(x => x.codigo !== code));
  updateCartBadge();
}
```

---

### 8) Validaciones en vivo (Registro/Contacto/Login)

**JS** (`js/forms.js`):

```js
export function showError(id, msg){ const el = document.getElementById(id); if(el){ el.textContent = msg; el.style.display="block"; } }
export function clearError(id){ const el = document.getElementById(id); if(el){ el.textContent = ""; el.style.display="none"; } }

export function validateRUT(raw){
  const v = String(raw).trim().toUpperCase().replace(/[^0-9K]/g,"");
  if(v.length < 7 || v.length > 9) return false;
  const body = v.slice(0, -1), dv = v.slice(-1);
  let sum = 0, mul = 2;
  for(let i = body.length - 1; i >= 0; i--){
    sum += Number(body[i]) * mul; mul = mul === 7 ? 2 : mul + 1;
  }
  const rest = 11 - (sum % 11);
  const calc = rest === 11 ? "0" : rest === 10 ? "K" : String(rest);
  return dv === calc;
}
```

**Ejemplo registro (listeners en vivo):**

```js
import { validateRUT, showError, clearError } from "./forms.js";
import { validateEmailDomain } from "./auth.js";

const form = document.querySelector("#formRegistro");
form.regRun.addEventListener("input", () =>
  validateRUT(form.regRun.value) ? clearError("regRunErr") : showError("regRunErr","RUN inválido")
);
form.regEmail.addEventListener("input", () =>
  validateEmailDomain(form.regEmail.value) ? clearError("regEmailErr") : showError("regEmailErr","Dominio no permitido")
);
```

---

### 9) Regiones y comunas (select encadenado)

**JS** (`js/regions.js`):

```js
const REGIONES = {
  "Los Lagos": ["Puerto Montt","Puerto Varas","Osorno"],
  "Metropolitana": ["Santiago","La Florida","Maipú"]
};
const regSel = document.getElementById("region");
const comSel = document.getElementById("comuna");

function loadRegions(){
  regSel.innerHTML = `<option value="">Seleccione Región</option>` +
    Object.keys(REGIONES).map(r => `<option>${r}</option>`).join("");
}
regSel.addEventListener("change", () => {
  const list = REGIONES[regSel.value] || [];
  comSel.innerHTML = `<option value="">Seleccione Comuna</option>` +
    list.map(c => `<option>${c}</option>`).join("");
});
document.addEventListener("DOMContentLoaded", loadRegions);
```

---

### 10) Navbar, contador y sesión

**HTML** (en todas las páginas):

```html
<nav class="topbar">
  <a href="index.html" class="brand">TiendaX</a>
  <a href="productos.html">Productos</a>
  <a href="blog.html">Blog</a>
  <a href="nosotros.html">Nosotros</a>
  <a href="contacto.html">Contacto</a>
  <a href="carrito.html" class="cart">🛒 <span id="cart-count">0</span></a>
  <a href="login.html" id="loginLink">Login</a>
</nav>
```

**JS** (`js/ui.js`):

```js
import { updateCartBadge } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  const u = JSON.parse(localStorage.getItem("loggedUser"));
  const link = document.getElementById("loginLink");
  if(!link) return;
  if(u){
    link.textContent = `Salir (${u.rol})`;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedUser");
      location.reload();
    });
  }
});
```

---

## 📄 ERS (IEEE-830) — v1

* **Introducción / Descripción general**: propósito, ámbito, glosario, referencias, usuarios y restricciones del sistema.
* **Requisitos funcionales**:

  * Tienda (Home, Productos, Detalle, Blog + 2 detalles, Nosotros, Contacto).
  * **Carrito** con `localStorage`.
  * **Login** con dominios permitidos y longitud de password.
  * **CRUD Admin** de Productos y Usuarios (validación de campos).
* **Requisitos no funcionales**:

  * **Responsivo** (CSS Grid/Flex).
  * **Mantenible** (módulos JS).
  * **Disponibilidad** (estático, sin backend).
  * **Seguridad básica por rol** en front (guardas de acceso y ocultamiento de opciones).

> La **ERS v1** se incluye junto al repositorio y será extendida en próximas entregas.

---

## 🌿 Uso de GitHub

* Estructura clara (`/admin`, `/css`, `/js`, `/img`).
* Commits frecuentes y descriptivos (convención `tipo: resumen`).

**Ejemplos de commits:**

```
feat(cart): contador en navbar + persistencia en localStorage
feat(auth): login con dominios permitidos y guardas por rol
feat(admin): CRUD de productos y usuarios
style(ui): tarjetas flotantes + tema consistente
fix(forms): validación en vivo RUN y límites de longitud
```

---

## ▶️ Cómo ejecutar

1. Clona o descarga el repositorio.
2. Abre `index.html` en tu navegador (doble clic o con un servidor estático).
3. Para **Admin**, crea un usuario con rol **Administrador** (o usa seeds en `js/data.js`) y accede a `/admin/`.

> Requisitos: **cualquier navegador moderno**. No se usan frameworks externos.

---

## 👥 Créditos

**Desarrollado por:** **Manuel Díaz** y **Guillermo Cerda**.
