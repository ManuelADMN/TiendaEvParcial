// Arreglo de productos inicial
let products = [
  {
    codigo: "PROD001",
    nombre: "Smartphone XFold",
    descripcion: "Teléfono con pantalla plegable de última generación, cámara 108MP, 5G.",
    precio: 1200.00,
    stock: 10,
    stockCritico: 2,
    categoria: "Tecnología",
    imagen: "img/smartphone.jpg"
  },
  {
    codigo: "PROD002",
    nombre: "Laptop UltraOne",
    descripcion: "Ultrabook 13'' ultraligera, alto rendimiento, 20h batería.",
    precio: 1500.00,
    stock: 5,
    stockCritico: 1,
    categoria: "Tecnología",
    imagen: "img/laptop.jpg"
  },
  {
    codigo: "PROD003",
    nombre: "Reloj Health+",
    descripcion: "Smartwatch con monitor de salud avanzado (ECG, SpO2, estrés).",
    precio: 300.00,
    stock: 20,
    stockCritico: 5,
    categoria: "Accesorios",
    imagen: "img/smartwatch.jpg"
  },
  {
    codigo: "PROD004",
    nombre: "Audífonos NoiseCancel",
    descripcion: "Audífonos inalámbricos con cancelación de ruido activa.",
    precio: 200.00,
    stock: 15,
    stockCritico: 3,
    categoria: "Accesorios",
    imagen: "img/audifonos.jpg"
  }
];

// Lista de categorías disponibles
const categories = ["Tecnología", "Accesorios", "Moda", "Hogar"];

// Arreglo de usuarios inicial (incluyendo un admin)
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
  // (Clientes se agregarán vía registro)
];

// Objeto de Regiones y Comunas (Chile)
const regionesYComunas = { /* ... igual que lo tienes ... */ };

// Inicializar almacenamiento local si no existe
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}
