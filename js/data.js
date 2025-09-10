// ===== Productos iniciales =====
let products = [
  {
    codigo: "PROD001",
    nombre: "Smartphone XFold",
    descripcion: "Teléfono con pantalla plegable de última generación, cámara 108MP, 5G.",
    precio: 1200.0,
    stock: 10,
    stockCritico: 2,
    categoria: "Tecnología",
    imagen: "img/smartphone.jpg"
  },
  {
    codigo: "PROD002",
    nombre: "Laptop UltraOne",
    descripcion: "Ultrabook 13'' ultraligera, alto rendimiento, 20h batería.",
    precio: 1500.0,
    stock: 5,
    stockCritico: 1,
    categoria: "Tecnología",
    imagen: "img/laptop.jpg"
  },
  {
    codigo: "PROD003",
    nombre: "Reloj Health+",
    descripcion: "Smartwatch con monitor de salud avanzado (ECG, SpO2, estrés).",
    precio: 300.0,
    stock: 20,
    stockCritico: 5,
    categoria: "Accesorios",
    imagen: "img/smartwatch.jpg"
  },
  {
    codigo: "PROD004",
    nombre: "Audífonos NoiseCancel",
    descripcion: "Audífonos inalámbricos con cancelación de ruido activa.",
    precio: 200.0,
    stock: 15,
    stockCritico: 3,
    categoria: "Accesorios",
    imagen: "img/audifonos.jpg"
  }
];

// ===== Categorías =====
const categories = ["Tecnología", "Accesorios", "Moda", "Hogar"];

// ===== Usuarios iniciales (incluye Admin y Vendedor) =====
let users = [
  {
    run: "11111111K",
    nombre: "Administrador",
    apellidos: "Principal",
    email: "admin@duoc.cl",
    fechaNacimiento: "",
    tipo: "Administrador",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: "Av. Principal 123",
    password: "admin123"
  },
  {
    run: "22222222K",
    nombre: "Vendedor",
    apellidos: "Ejemplo",
    email: "vendedor@duoc.cl",
    fechaNacimiento: "",
    tipo: "Vendedor",
    region: "Región de Valparaíso",
    comuna: "Valparaíso",
    direccion: "Calle Secundaria 456",
    password: "vend1234"
  }
  // (Clientes se agregan vía registro)
];

// ===== Regiones / Comunas =====
const regionesYComunas = {
  regiones: [
    { NombreRegion: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
    { NombreRegion: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"] },
    { NombreRegion: "Antofagasta", comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"] },
    { NombreRegion: "Atacama", comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"] },
    { NombreRegion: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"] },
    { NombreRegion: "Valparaíso", comunas: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"] },
    { NombreRegion: "Región del Libertador Gral. Bernardo O’Higgins", comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"] },
    { NombreRegion: "Región del Maule", comunas: ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"] },
    { NombreRegion: "Región del Biobío", comunas: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"] },
    { NombreRegion: "Región de la Araucanía", comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"] },
    { NombreRegion: "Región de Los Ríos", comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"] },
    { NombreRegion: "Región de Los Lagos", comunas: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"] },
    { NombreRegion: "Región Aisén del Gral. Carlos Ibáñez del Campo", comunas: ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"] },
    { NombreRegion: "Región de Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"] },
    { NombreRegion: "Región Metropolitana de Santiago", comunas: ["Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Vitacura","Puente Alto","Pirque","San José de Maipo","Colina","Lampa","Tiltil","San Bernardo","Buin","Calera de Tango","Paine","Melipilla","Alhué","Curacaví","María Pinto","San Pedro","Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"] }
  ]
};

// ===== Siembra robusta de LS =====
function seedArray(key, arr) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(arr));
      return;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(key, JSON.stringify(arr));
    }
  } catch {
    localStorage.setItem(key, JSON.stringify(arr));
  }
}
seedArray("products", products);
seedArray("users", users);
seedArray("cart", []);

// ===== Exponer en window (compatibilidad) =====
window.products = products;
window.users = users;
window.categories = categories;
window.regionesYComunas = regionesYComunas;
