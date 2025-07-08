import OrderItem from "./OrderItem";
import Order from "./Order";
import ProductVariant from "./ProductVariant";
import Product from "./Products";
import Category from "./Category";

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

OrderItem.belongsTo(ProductVariant, { as: 'variant', foreignKey: 'productVariantId' }); // ← FALTA

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