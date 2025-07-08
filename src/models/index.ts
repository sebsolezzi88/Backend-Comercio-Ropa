import OrderItem from "./OrderItem";
import { ProductVariant, Product } from "./Products";
import Order from "./Order";
import Category from "./Category";

// Asociaciones
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Order.belongsToMany(ProductVariant, {
  through: OrderItem,
  foreignKey: "orderId",
  as: "items",
});

ProductVariant.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "productVariantId",
  as: "orders",
});

Product.hasMany(ProductVariant, {
  foreignKey: "productId",
  as: "variants",
});

ProductVariant.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

ProductVariant.hasMany(OrderItem, {
  foreignKey: "productVariantId",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});