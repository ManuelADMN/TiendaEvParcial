<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>README — TiendaX | Evaluación Parcial 1 (DSY1104)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root{
      --bg:#0e1014; --card:#151922; --muted:#99a3b3; --text:#eaf0ff;
      --brand:#6dd3ff; --brand-2:#7cffc4; --ok:#30d158; --warn:#ffd60a; --err:#ff453a;
      --code-bg:#0a0d12; --border:#212634;
    }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0;background:linear-gradient(180deg,#0b0d12 0%,#0f1420 100%); color:var(--text); font:16px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif}
    a{color:var(--brand)}
    .container{max-width:1100px; margin:40px auto; padding:0 20px;}
    .hero{padding:28px 24px; background:radial-gradient(1200px 500px at 10% -20%, #17345a 0%, transparent 60%), var(--card); border:1px solid var(--border); border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.35)}
    h1{font-size:28px; margin:0 0 8px; letter-spacing:.3px}
    h2{margin:32px 0 14px; font-size:22px}
    h3{margin:22px 0 8px; font-size:18px}
    p.lead{color:#cdd6ea; margin:0}
    .grid{display:grid; gap:16px}
    .cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
    .card{background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px}
    .ok{color:var(--ok)} .warn{color:var(--warn)} .err{color:var(--err)}
    .tag{display:inline-block; border:1px solid var(--border); background:#0e1420; color:#cfe7ff; padding:2px 10px; border-radius:999px; font-size:12px; letter-spacing:.2px}
    table{width:100%; border-collapse:collapse; border-spacing:0; overflow:hidden; border-radius:12px; border:1px solid var(--border); background:var(--card)}
    th,td{padding:10px 12px; border-bottom:1px solid var(--border); vertical-align:top}
    th{background:#101522; text-align:left; font-weight:600}
    tr:last-child td{border-bottom:0}
    .k{color:#a0b9ff; font-weight:600}
    pre{margin:12px 0 18px; background:var(--code-bg); color:#e8f0ff; border:1px solid #0f1624; border-radius:12px; padding:14px; overflow:auto; box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
    code{font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; font-size:13.5px}
    details{background:var(--card); border:1px solid var(--border); border-radius:12px; padding:12px 16px; margin:10px 0}
    summary{cursor:pointer; font-weight:600; color:#d9e5ff}
    .muted{color:var(--muted)}
    .pill{display:inline-flex; align-items:center; gap:8px; padding:6px 12px; border:1px solid var(--border); border-radius:999px; background:#0f1726; font-size:13px; color:#cfe7ff}
    .list-compact li{margin:4px 0}
    .foot{opacity:.8; font-size:14px; margin-top:22px}
    .divider{height:1px; background:var(--border); margin:24px 0}
    .kbd{font:12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background:#0c1320; border:1px solid #152033; padding:2px 6px; border-radius:6px}
    .toc a{color:#a9d1ff; text-decoration:none}
    .toc li{margin:6px 0}
    .check{font-weight:700}
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <h1>README — <span class="tag">TiendaX</span> <span class="muted">| Evaluación Parcial 1 (DSY1104)</span></h1>
      <p class="lead">Este documento demuestra, con evidencia y fragmentos de código HTML/CSS/JS (sin frameworks), que el repositorio cumple al <strong>100%</strong> los requisitos de la Evaluación Parcial 1: estructura semántica, estilos propios, validaciones, carrito, CRUD admin, login con dominios permitidos, blog, contacto, y uso de <code>localStorage</code>.</p>
      <p class="foot">Créditos: <strong>Manuel Díaz</strong> &amp; <strong>Guillermo Cerda</strong></p>
    </section>

    <section class="card">
      <h2>Índice</h2>
      <ul class="toc">
        <li><a href="#cumplimiento">1) Matriz de cumplimiento</a></li>
        <li><a href="#estructura">2) Estructura del proyecto</a></li>
        <li><a href="#como-hicimos">3) Cómo lo hicimos (con código)</a></li>
        <li><a href="#ers">4) ERS (IEEE 830) — versión 1</a></li>
        <li><a href="#git">5) Uso de GitHub</a></li>
        <li><a href="#run">6) Cómo ejecutar</a></li>
      </ul>
    </section>

    <section id="cumplimiento" class="card">
      <h2>Matriz de cumplimiento (Anexo 1)</h2>
      <table>
        <tr>
          <th>Área</th><th>Requisito</th><th>Implementación</th><th>Estado</th>
        </tr>
        <tr>
          <td rowspan="3"><strong>HTML</strong></td>
          <td>Estructura semántica (secciones, encabezados, listas)</td>
          <td>Uso de <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code></td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Navegación entre páginas (links, imágenes, botones)</td>
          <td>Barra superior con links a Home, Productos, Blog, Nosotros, Contacto; botones de acción</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Formularios (registro, login, contacto)</td>
          <td>Campos + mensajes de error dinámicos y validación en tiempo real</td>
          <td class="ok check">✔️</td>
        </tr>

        <tr>
          <td rowspan="4"><strong>CSS</strong></td>
          <td>Hoja de estilos externa + estilos propios</td>
          <td><code>&lt;link rel="stylesheet" href="css/styles.css"&gt;</code></td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Diseño responsivo y consistente</td>
          <td>Grid/Flex; media queries; tipografía y paleta coherentes</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Tarjetas de producto “flotantes” al hover</td>
          <td><code>transform: translateY(-2px)</code> + <code>box-shadow</code> suave</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Menú y layout admin</td>
          <td>Sidebar + contenido central; estados activos/hover</td>
          <td class="ok check">✔️</td>
        </tr>

        <tr>
          <td rowspan="5"><strong>JavaScript</strong></td>
          <td>Validaciones en tiempo real</td>
          <td>Listeners <code>input</code>/<code>change</code> + helpers de error</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Login con dominios permitidos</td>
          <td>Dominios permitidos: <code>@duoc.cl</code>, <code>@profesor.duoc.cl</code>, <code>@gmail.com</code></td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Carrito de compras</td>
          <td>Arreglo de productos + <code>localStorage</code>, añadir/eliminar/contar/total</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>CRUD Productos &amp; Usuarios (admin)</td>
          <td>Listar, crear, editar, eliminar (persistencia en <code>localStorage</code>)</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Notificaciones (toasts)</td>
          <td>Componente toast reusado en acciones clave</td>
          <td class="ok check">✔️</td>
        </tr>

        <tr>
          <td rowspan="3"><strong>Vistas</strong></td>
          <td>Tienda: Home, Productos, Detalle, Blog (+2 detalles), Nosotros, Contacto</td>
          <td>Enlaces de navegación y contenidos requeridos</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Admin: Home, Listados, Crear/Editar</td>
          <td>Acceso restringido por rol; CRUD completo</td>
          <td class="ok check">✔️</td>
        </tr>
        <tr>
          <td>Roles: Admin, Vendedor, Cliente</td>
          <td>Guardas de ruta + ocultamiento de menús</td>
          <td class="ok check">✔️</td>
        </tr>

        <tr>
          <td><strong>Repositorio</strong></td>
          <td>GitHub + commits descriptivos</td>
          <td>Estructura de carpetas, issues y mensajes de commit</td>
          <td class="ok check">✔️</td>
        </tr>
      </table>
    </section>

    <section id="estructura" class="card">
      <h2>Estructura del proyecto</h2>
      <pre><code>.
├── index.html                  # Home (hero + destacados + enlaces)
├── productos.html              # Listado de productos + carrito
├── producto.html               # Detalle de producto
├── blog.html                   # Listado de blogs
├── blog-detalle1.html          # Detalle blog 1
├── blog-detalle2.html          # Detalle blog 2
├── nosotros.html               # Quiénes somos (empresa + equipo)
├── contacto.html               # Formulario de contacto (validación)
├── registro.html               # Registro de usuario (validación en vivo)
├── login.html                  # Login (validación dominios + longitud)
├── admin/
│   ├── index.html              # Dashboard admin (sidebar + tarjetas)
│   ├── productos.html          # Listar productos (CRUD)
│   ├── producto-nuevo.html     # Crear producto (validación)
│   ├── producto-editar.html    # Editar producto (validación)
│   ├── usuarios.html           # Listar usuarios (CRUD)
│   ├── usuario-nuevo.html      # Crear usuario (validación RUN/email)
│   └── usuario-editar.html     # Editar usuario
├── css/
│   └── styles.css              # Estilos propios (layout + componentes)
├── js/
│   ├── data.js                 # Seeds iniciales (productos/usuarios)
│   ├── auth.js                 # Login / roles / guardas / dominios permitidos
│   ├── cart.js                 # Lógica del carrito (add/remove/total)
│   ├── crud-products.js        # CRUD productos (localStorage)
│   ├── crud-users.js           # CRUD usuarios (localStorage)
│   ├── forms.js                # Validaciones en vivo y helpers UI
│   ├── regions.js              # Regiones y comunas + cascada
│   └── ui.js                   # Navbar, toasts, contadores, etc.
└── img/
    ├── productos/...
    └── blog/...
</code></pre>
      <p class="muted">Nota: Todos los módulos JS son vanilla (sin frameworks) y se cargan de forma modular por página.</p>
    </section>

    <section id="como-hicimos" class="card">
      <h2>Cómo lo hicimos (explicaciones + código)</h2>

      <details open>
        <summary>1) Notificaciones (toasts)</summary>
        <p>Toasts livianos reutilizables para feedback (éxito, error, info).</p>
        <pre><code class="language-html">&lt;!-- En &lt;body&gt; (una sola vez) --&gt;
&lt;div id="toast" class="toast"&gt;&lt;/div&gt;</code></pre>
        <pre><code class="language-css">/* styles.css */
.toast{
  position: fixed; right: 18px; bottom: 18px;
  min-width: 220px; max-width: 340px; padding: 10px 12px;
  color:#fff; background:#0f172a; border:1px solid #1f2a44; border-radius:10px;
  transform: translateY(12px); opacity: 0; transition: all .25s ease;
  pointer-events:none; box-shadow:0 8px 24px rgba(0,0,0,.35)
}
.toast.show{ transform: translateY(0); opacity:1 }
.toast.success{ background:#0f2a1a; border-color:#1c5635 }
.toast.error{ background:#2a0f12; border-color:#66323a }
.toast.info{ background:#0f1c2a; border-color:#2c3b55 }</code></pre>
        <pre><code class="language-js">// ui.js
function ensureToastContainer(){
  if(!document.getElementById("toast")){
    const d = document.createElement("div"); d.id = "toast"; d.className = "toast"; document.body.appendChild(d);
  }
}
function showToast(message, type="success", ms=2200){
  ensureToastContainer();
  const t = document.getElementById("toast");
  t.className = `toast show ${type}`;
  t.textContent = message;
  clearTimeout(showToast._h);
  showToast._h = setTimeout(() => t.className = "toast", ms);
}</code></pre>
      </details>

      <details open>
        <summary>2) Tarjetas de productos + efecto flotante</summary>
        <p>HTML semántico y CSS propio; el hover eleva la tarjeta y mejora el foco visual.</p>
        <pre><code class="language-html">&lt;div class="product-card"&gt;
  &lt;img src="img/productos/teclado.jpg" alt="Teclado Mecánico Z" /&gt;
  &lt;h3&gt;Teclado Mecánico Z&lt;/h3&gt;
  &lt;p class="price"&gt;$49.990&lt;/p&gt;
  &lt;button onclick="addToCart('P001')"&gt;Añadir al carrito&lt;/button&gt;
  &lt;a class="more" href="producto.html?code=P001"&gt;Ver detalle&lt;/a&gt;
&lt;/div&gt;</code></pre>
        <pre><code class="language-css">/* styles.css */
.product-card{
  background:#0b1220; border:1px solid #1a2438; border-radius:14px; padding:12px;
  transition:transform .15s ease, box-shadow .2s ease; box-shadow:0 1px 0 rgba(255,255,255,.03)
}
.product-card img{ width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:10px; }
.product-card:hover{ transform:translateY(-2px); box-shadow:0 10px 30px rgba(0,0,0,.35) }
.product-card .price{ color:#7cffc4; font-weight:700; margin:8px 0 }
.product-card .more{ display:inline-block; margin-left:8px; color:#6dd3ff }</code></pre>
        <pre><code class="language-js">// productos.html (render dinámico)
const list = document.getElementById("productos-list");
const products = JSON.parse(localStorage.getItem("products")) || [];
list.innerHTML = products.map(p => `
  &lt;div class="product-card"&gt;
    &lt;img src="${p.img}" alt="${p.nombre}" /&gt;
    &lt;h3&gt;${p.nombre}&lt;/h3&gt;
    &lt;p class="price"&gt;$${Number(p.precio).toLocaleString()}&lt;/p&gt;
    &lt;button onclick="addToCart('${p.codigo}')"&gt;Añadir al carrito&lt;/button&gt;
    &lt;a class="more" href="producto.html?code=${encodeURIComponent(p.codigo)}"&gt;Ver detalle&lt;/a&gt;
  &lt;/div&gt;
`).join("");</code></pre>
      </details>

      <details open>
        <summary>3) CRUD de <strong>Productos</strong> y <strong>Usuarios</strong> (panel admin)</summary>
        <p>Persistencia en <code>localStorage</code>, tablas dinámicas y acciones de <em>crear/editar/eliminar</em>.</p>
        <pre><code class="language-js">// crud-products.js
const LS_PRODUCTS = "products";

function getProducts(){ return JSON.parse(localStorage.getItem(LS_PRODUCTS)) || []; }
function setProducts(arr){ localStorage.setItem(LS_PRODUCTS, JSON.stringify(arr)); }

export function renderProductsTable(){
  const tbody = document.querySelector("#tblProducts tbody");
  const data = getProducts();
  tbody.innerHTML = data.map(p => `
    &lt;tr&gt;
      &lt;td&gt;${p.codigo}&lt;/td&gt;
      &lt;td&gt;${p.nombre}&lt;/td&gt;
      &lt;td&gt;$${Number(p.precio).toLocaleString()}&lt;/td&gt;
      &lt;td&gt;${p.stock}&lt;/td&gt;
      &lt;td&gt;${p.categoria}&lt;/td&gt;
      &lt;td&gt;
        &lt;a href="producto-editar.html?code=${encodeURIComponent(p.codigo)}"&gt;Editar&lt;/a&gt; |
        &lt;a href="#" class="del" data-code="${p.codigo}"&gt;Eliminar&lt;/a&gt;
      &lt;/td&gt;
    &lt;/tr&gt;`).join("");

  tbody.querySelectorAll(".del").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    const code = a.dataset.code;
    const next = getProducts().filter(x => x.codigo !== code);
    setProducts(next);
    renderProductsTable();
    showToast("Producto eliminado", "info");
  }));
}

export function createOrUpdateProduct(form){
  const p = Object.fromEntries(new FormData(form));
  // Validaciones mínimas admin (Anexo 1): código min 3, nombre max 100, precio >=0, stock entero…
  if(!p.codigo || p.codigo.length &lt; 3) return showToast("Código inválido (min 3)", "error");
  if(!p.nombre || p.nombre.length &gt; 100) return showToast("Nombre inválido", "error");
  if(Number(p.precio) &lt; 0) return showToast("Precio no puede ser negativo", "error");
  if(!Number.isInteger(Number(p.stock)) || Number(p.stock) &lt; 0) return showToast("Stock inválido", "error");

  const data = getProducts();
  const ix = data.findIndex(x => x.codigo === p.codigo);
  if(ix &gt;= 0) data[ix] = {...data[ix], ...p};
  else data.push({...p, precio:Number(p.precio), stock:Number(p.stock)});
  setProducts(data);
  showToast(ix &gt;= 0 ? "Producto actualizado" : "Producto creado", "success");
}</code></pre>

        <pre><code class="language-js">// crud-users.js
const LS_USERS = "users";

function getUsers(){ return JSON.parse(localStorage.getItem(LS_USERS)) || []; }
function setUsers(arr){ localStorage.setItem(LS_USERS, JSON.stringify(arr)); }

export function renderUsersTable(){
  const tbody = document.querySelector("#tblUsers tbody");
  const data = getUsers();
  tbody.innerHTML = data.map(u => `
    &lt;tr&gt;
      &lt;td&gt;${u.run}&lt;/td&gt;
      &lt;td&gt;${u.nombres} ${u.apellidos}&lt;/td&gt;
      &lt;td&gt;${u.email}&lt;/td&gt;
      &lt;td&gt;${u.rol}&lt;/td&gt;
      &lt;td&gt;
        &lt;a href="usuario-editar.html?run=${encodeURIComponent(u.run)}"&gt;Editar&lt;/a&gt; |
        &lt;a href="#" class="del" data-run="${u.run}"&gt;Eliminar&lt;/a&gt;
      &lt;/td&gt;
    &lt;/tr&gt;`).join("");

  tbody.querySelectorAll(".del").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    const run = a.dataset.run;
    const next = getUsers().filter(x => x.run !== run);
    setUsers(next);
    renderUsersTable();
    showToast("Usuario eliminado", "info");
  }));
}

export function createOrUpdateUser(form){
  const u = Object.fromEntries(new FormData(form));
  if(!validateRUT(u.run)) return showToast("RUN inválido", "error");
  if(!validateEmailDomain(u.email)) return showToast("Email no permitido", "error");
  if(u.nombres.length === 0 || u.nombres.length &gt; 50) return showToast("Nombre inválido", "error");
  if(u.apellidos.length === 0 || u.apellidos.length &gt; 100) return showToast("Apellidos inválidos", "error");

  const data = getUsers();
  const ix = data.findIndex(x => x.run === u.run);
  if(ix &gt;= 0) data[ix] = {...data[ix], ...u};
  else data.push(u);
  setUsers(data);
  showToast(ix &gt;= 0 ? "Usuario actualizado" : "Usuario creado", "success");
}</code></pre>
      </details>

      <details open>
        <summary>4) Login con dominios permitidos + roles</summary>
        <p>Dominios válidos: <code>@duoc.cl</code>, <code>@profesor.duoc.cl</code>, <code>@gmail.com</code>. Guardamos sesión en <code>localStorage</code> y redirigimos según rol.</p>
        <pre><code class="language-js">// auth.js
const ALLOWED = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
export function validateEmailDomain(email){ return ALLOWED.some(dom =&gt; email.endsWith(dom)); }

export function login(email, pass){
  if(!validateEmailDomain(email)) return {ok:false, msg:"Correo no permitido"};
  if(pass.length &lt; 4 || pass.length &gt; 10) return {ok:false, msg:"Contraseña 4-10 caracteres"};
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const u = users.find(x =&gt; x.email === email &amp;&amp; x.pass === pass);
  if(!u) return {ok:false, msg:"Credenciales incorrectas"};
  localStorage.setItem("loggedUser", JSON.stringify(u));
  return {ok:true, role:u.rol || "Cliente"};
}

// Guardas de ruta
export function requireRole(roles=["Administrador"]){
  const u = JSON.parse(localStorage.getItem("loggedUser"));
  if(!u || !roles.includes(u.rol)) { location.href = "/login.html"; }
}</code></pre>
      </details>

      <details open>
        <summary>5) Blogs e interacciones</summary>
        <p>Listado de artículos con miniatura, título, extracto y enlace a detalle.</p>
        <pre><code class="language-html">&lt;article class="blog-item"&gt;
  &lt;img class="blog-thumb" src="img/blog/ai-trends.png" alt="Tendencias Tech 2025" /&gt;
  &lt;div&gt;
    &lt;h3&gt;&lt;a href="blog-detalle1.html"&gt;Tendencias Tech 2025&lt;/a&gt;&lt;/h3&gt;
    &lt;p&gt;Repasamos novedades de hardware y gaming del último trimestre...&lt;/p&gt;
    &lt;a class="more" href="blog-detalle1.html"&gt;Leer más&lt;/a&gt;
  &lt;/div&gt;
&lt;/article&gt;</code></pre>
        <pre><code class="language-css">/* styles.css */
.blog-item{ display:grid; grid-template-columns:120px 1fr; gap:12px; padding:12px; border:1px solid #1a2438; border-radius:12px }
.blog-thumb{ width:100%; height:80px; object-fit:cover; border-radius:10px }
.blog-item h3 a{ color:#cfe7ff; text-decoration:none }
.blog-item h3 a:hover{ color:#6dd3ff }</code></pre>
      </details>

      <details open>
        <summary>6) Carrito de compras + <code>localStorage</code></summary>
        <p>Se persiste entre sesiones. Contador en navbar, subtotal/total en <code>carrito.html</code>.</p>
        <pre><code class="language-js">// cart.js
const LS_CART = "cart";

export function getCart(){ return JSON.parse(localStorage.getItem(LS_CART)) || []; }
export function setCart(arr){ localStorage.setItem(LS_CART, JSON.stringify(arr)); }

export function addToCart(code){
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const p = products.find(x =&gt; x.codigo === code);
  if(!p) return;
  const cart = getCart();
  const i = cart.findIndex(x =&gt; x.codigo === code);
  if(i &gt;= 0) cart[i].cantidad += 1;
  else cart.push({codigo:code, nombre:p.nombre, precio:Number(p.precio)||0, cantidad:1});
  setCart(cart);
  updateCartBadge();
  showToast(`"${p.nombre}" añadido al carrito`, "success");
}

export function removeFromCart(code){
  const cart = getCart().filter(x =&gt; x.codigo !== code);
  setCart(cart); updateCartBadge();
}

export function updateCartBadge(){
  const n = getCart().reduce((s,x) =&gt; s + x.cantidad, 0);
  const el = document.getElementById("cart-count");
  if(el) el.textContent = String(n);
}</code></pre>
      </details>

      <details open>
        <summary>7) Validaciones en tiempo real (Registro, Contacto, Login)</summary>
        <p>Mensajes inmediatos bajo los campos; bloqueo de submit si hay errores.</p>
        <pre><code class="language-js">// forms.js
export function showError(id, msg){ const el = document.getElementById(id); if(el){ el.textContent = msg; el.style.display="block"; } }
export function clearError(id){ const el = document.getElementById(id); if(el){ el.textContent = ""; el.style.display="none"; } }

// Registro (RUN + email dominio)
form.regRun.addEventListener("input", () =&gt; validateRUT(form.regRun.value) ? clearError("regRunErr") : showError("regRunErr","RUN inválido"));
form.regEmail.addEventListener("input", () =&gt; validateEmailDomain(form.regEmail.value) ? clearError("regEmailErr") : showError("regEmailErr","Dominio no permitido"));

// Contacto (nombre max 100, correo dominio, comentario max 500)
form.ctNombre.addEventListener("input", () =&gt; form.ctNombre.value.length &lt;= 100 ? clearError("ctNomErr") : showError("ctNomErr","Máx 100"));
form.ctEmail.addEventListener("input", () =&gt; validateEmailDomain(form.ctEmail.value) ? clearError("ctEmailErr") : showError("ctEmailErr","Dominio no permitido"));
form.ctMsg.addEventListener("input", () =&gt; form.ctMsg.value.length &lt;= 500 ? clearError("ctMsgErr") : showError("ctMsgErr","Máx 500"));</code></pre>
        <p><strong>Validador de RUN (RUT) chileno</strong> con dígito verificador:</p>
        <pre><code class="language-js">// forms.js (helper RUT)
export function validateRUT(raw){
  // sin puntos ni guión, ej: "19011022K"
  const v = String(raw).trim().toUpperCase().replace(/[^0-9K]/g,"");
  if(v.length &lt; 7 || v.length &gt; 9) return false;
  const body = v.slice(0, -1), dv = v.slice(-1);
  let sum = 0, mul = 2;
  for(let i = body.length - 1; i &gt;= 0; i--){
    sum += Number(body[i]) * mul; mul = mul === 7 ? 2 : mul + 1;
  }
  const rest = 11 - (sum % 11);
  const calc = rest === 11 ? "0" : rest === 10 ? "K" : String(rest);
  return dv === calc;
}</code></pre>
      </details>

      <details>
        <summary>8) Regiones y comunas (select encadenado)</summary>
        <pre><code class="language-js">// regions.js
const REGIONES = {
  "Los Lagos": ["Puerto Montt","Puerto Varas","Osorno"],
  "Metropolitana": ["Santiago","La Florida","Maipú"]
};
const regSel = document.getElementById("region");
const comSel = document.getElementById("comuna");

function loadRegions(){
  regSel.innerHTML = `&lt;option value=""&gt;Seleccione Región&lt;/option&gt;` +
    Object.keys(REGIONES).map(r =&gt; `&lt;option&gt;${r}&lt;/option&gt;`).join("");
}

regSel.addEventListener("change", () =&gt; {
  const list = REGIONES[regSel.value] || [];
  comSel.innerHTML = `&lt;option value=""&gt;Seleccione Comuna&lt;/option&gt;` +
    list.map(c =&gt; `&lt;option&gt;${c}&lt;/option&gt;`).join("");
});

document.addEventListener("DOMContentLoaded", loadRegions);</code></pre>
      </details>

      <details>
        <summary>9) Navbar, contador de carrito y guardado de sesión</summary>
        <pre><code class="language-html">&lt;nav class="topbar"&gt;
  &lt;a href="index.html" class="brand"&gt;TiendaX&lt;/a&gt;
  &lt;div class="spacer"&gt;&lt;/div&gt;
  &lt;a href="productos.html"&gt;Productos&lt;/a&gt;
  &lt;a href="blog.html"&gt;Blog&lt;/a&gt;
  &lt;a href="nosotros.html"&gt;Nosotros&lt;/a&gt;
  &lt;a href="contacto.html"&gt;Contacto&lt;/a&gt;
  &lt;a href="carrito.html" class="cart"&gt;🛒 &lt;span id="cart-count"&gt;0&lt;/span&gt;&lt;/a&gt;
  &lt;a href="login.html" id="loginLink"&gt;Login&lt;/a&gt;
&lt;/nav&gt;</code></pre>
        <pre><code class="language-js">// ui.js (al cargar cualquier página)
document.addEventListener("DOMContentLoaded", () =&gt; {
  updateCartBadge();
  const u = JSON.parse(localStorage.getItem("loggedUser"));
  const link = document.getElementById("loginLink");
  if(link) link.textContent = u ? `Salir (${u.rol})` : "Login";
  if(u) link.addEventListener("click", (e) =&gt; { e.preventDefault(); localStorage.removeItem("loggedUser"); location.reload(); });
});</code></pre>
      </details>
    </section>

    <section id="ers" class="card">
      <h2>ERS — Especificación de Requisitos (IEEE 830) — v1</h2>
      <div class="grid cols-2">
        <div>
          <h3>Contenido entregado</h3>
          <ul class="list-compact">
            <li><span class="ok">✔️</span> Introducción (propósito, ámbito, glosario, referencias, visión general)</li>
            <li><span class="ok">✔️</span> Descripción general (perspectiva, funciones, usuarios, restricciones, supuestos, futuros)</li>
            <li><span class="ok">✔️</span> Requisitos específicos (interfaces, funcionales, no funcionales)</li>
            <li><span class="ok">✔️</span> Trazabilidad y clasificación (esenciales/opcionales)</li>
          </ul>
        </div>
        <div>
          <h3>Relación con implementación</h3>
          <ul class="list-compact">
            <li><span class="ok">✔️</span> Interfaces de usuario: páginas semánticas + navegación</li>
            <li><span class="ok">✔️</span> Funcionales: login, CRUD, carrito, blog, contacto</li>
            <li><span class="ok">✔️</span> No funcionales: responsivo, seguridad básica de acceso por rol, mantenible (módulos JS)</li>
          </ul>
        </div>
      </div>
      <p class="muted">El documento ERS v1 acompaña este repositorio y será iterado en siguientes entregas.</p>
    </section>

    <section id="git" class="card">
      <h2>Uso de GitHub</h2>
      <ul class="list-compact">
        <li><span class="ok">✔️</span> Repositorio público con estructura clara (<span class="kbd">/admin</span>, <span class="kbd">/css</span>, <span class="kbd">/js</span>, <span class="kbd">/img</span>).</li>
        <li><span class="ok">✔️</span> Commits frecuentes con mensajes descriptivos (convención: <code>tipo: resumen</code>).</li>
        <li><span class="ok">✔️</span> Ramas para características cuando aplica (<span class="kbd">feature/cart</span>, <span class="kbd">feature/crud-users</span>).</li>
      </ul>
      <pre><code># Ejemplos de commits
feat(cart): contador en navbar + persistencia en localStorage
feat(auth): login con dominios permitidos y guardas por rol
feat(admin): CRUD de productos y usuarios (listar/crear/editar/eliminar)
style(ui): tarjetas flotantes y tema oscuro consistente
fix(forms): validación en vivo de RUN y límites de longitud</code></pre>
    </section>

    <section id="run" class="card">
      <h2>Cómo ejecutar</h2>
      <ol>
        <li>Clonar o descargar el repositorio.</li>
        <li>Abrir <span class="kbd">index.html</span> en el navegador (doble clic o servir con un server estático).</li>
        <li>Para la sección Admin, crear un usuario con rol <em>Administrador</em> o usar los datos sembrados (ver <span class="kbd">js/data.js</span> si corresponde).</li>
      </ol>
      <p>Requisitos: cualquier navegador moderno. No se usan frameworks externos; todo es HTML/CSS/JS puro.</p>
      <div class="divider"></div>
      <p class="muted">Desarrollado por <strong>Manuel Díaz</strong> y <strong>Guillermo Cerda</strong>.</p>
    </section>
  </div>
</body>
</html>
