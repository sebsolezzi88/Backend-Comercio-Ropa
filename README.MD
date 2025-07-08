# 🛍️ API Tienda de Ropa - Backend

Este proyecto es el backend de una tienda de ropa desarrollado con **Node.js**, **Express**, **TypeScript**, **Sequelize** y **JWT** para la autenticación. Permite gestionar usuarios, categorías, productos, variantes y órdenes de compra.

> ⚠️ Proyecto en desarrollo: las funcionalidades pueden cambiar o expandirse.

---

## 🚀 Tecnologías

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)

---

## 📂 Estructura de rutas

### 🔐 `/admin`
Rutas para registrar y autenticar administradores.

| Método | Ruta        | Descripción               |
|--------|-------------|---------------------------|
| POST   | `/register` | Registrar nuevo usuario   |
| POST   | `/login`    | Obtener token JWT         |

---

### 🗂️ `/category`
Rutas para gestionar categorías de productos.

| Método | Ruta          | Descripción                     |
|--------|---------------|---------------------------------|
| GET    | `/`           | Obtener todas las categorías    |
| POST   | `/`           | Crear nueva categoría (🔒)       |
| PUT    | `/:id`        | Actualizar una categoría (🔒)    |
| DELETE | `/:id`        | Eliminar una categoría (🔒)      |

---

### 👕 `/product`
Rutas para gestionar productos.

| Método | Ruta       | Descripción                        |
|--------|------------|------------------------------------|
| GET    | `/`        | Obtener todos los productos        |
| GET    | `/:id`     | Obtener producto por ID            |
| POST   | `/`        | Agregar un nuevo producto (🔒)     |
| PUT    | `/:id`     | Actualizar un producto (🔒)        |
| DELETE | `/:id`     | Eliminar un producto (🔒)          |

---

### 🧵 `/variant`
Rutas para gestionar variantes de productos (ej: tallas, colores).

| Método | Ruta                          | Descripción                           |
|--------|-------------------------------|---------------------------------------|
| POST   | `/`                           | Agregar nueva variante (🔒)           |
| GET    | `/:id`                        | Obtener variante por ID               |
| PUT    | `/:id`                        | Actualizar variante (🔒)              |
| DELETE | `/:id`                        | Eliminar variante (🔒)                |
| GET    | `/product/:productId`         | Obtener variantes por producto        |

---

### 📦 `/order`
Rutas para crear y consultar órdenes de compra.

| Método | Ruta              | Descripción                                    |
|--------|-------------------|------------------------------------------------|
| POST   | `/`               | Crear una nueva orden                          |
| GET    | `/`               | Obtener todas las órdenes (🔒)                 |
| GET    | `/code/:code`     | Obtener orden por código (cliente)             |
| GET    | `/:id`            | Obtener orden por ID (admin) (🔒)              |
| DELETE | `/:id`            | Eliminar una orden (🔒) (⚠️ En desarrollo)     |
| PUT    | `/:id`            | Actualizar estado de la orden (🔒)             |

---

## 🔐 Autenticación

- Algunas rutas están protegidas mediante JWT.
- Se debe enviar el token en el header:  
  ```
  Authorization: Bearer <tu-token>
  ```

---

## ⚙️ Instalación

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
npm install
npx sequelize db:migrate
npm run dev
```

---

## 🛠️ TODO

- [ ] Terminar endpoint para eliminar órdenes
- [ ] Agregar validaciones más estrictas
- [ ] Agregar tests unitarios y de integración
- [ ] Mejorar manejo de errores

---

## 🧑‍💻 Autor

Proyecto creado por Sebastián Solezzi 

---

## 📄 Licencia

MIT