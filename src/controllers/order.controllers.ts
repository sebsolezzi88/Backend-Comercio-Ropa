import {Request,Response} from 'express'
import OrderItem from '../models/OrderItem';
import Order from '../models/Order';
import { generateOrderCode } from '../utils/utils';
import { ProductVariant } from '../models/Products';
import sequelize from '../config/database';


/* 

{
  "customerName": "Juan Pérez",
  "street": "Calle Falsa 123",
  "department": "Depto A",
  "phoneNumber": "123456789",
  "items": [
    { "productVariantId": 1, "quantity": 2 },
    { "productVariantId": 3, "quantity": 1 }
  ]
}
*/
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const t = await sequelize.transaction();

  try {
    const {
      customerName,
      street,
      department,
      phoneNumber,
      items, // [{ productVariantId, quantity }]
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "The order must have at least one item." });
    }

    // Calcular precio total y preparar los datos para OrderItems
    let totalPrice = 0;
    const orderItemsData: any[] = [];

    for (const item of items) {
      const variant = await ProductVariant.findByPk(item.productVariantId, { transaction: t });
      if (!variant) throw new Error(`Variant with ID ${item.productVariantId} not found.`);

      if (variant.stock < item.quantity) {
        throw new Error(`Insufficient stock for the variant with ID ${item.productVariantId}`);
      }

      const itemPrice = Number(variant.price);
      totalPrice += itemPrice * item.quantity;

      // Bajar el stock
      variant.stock -= item.quantity;
      await variant.save({ transaction: t });

      // Preparar datos del item
      orderItemsData.push({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    // Generar código único
    let code = generateOrderCode();
    let existing = await Order.findOne({ where: { code }, transaction: t });
    while (existing) {
      code = generateOrderCode();
      existing = await Order.findOne({ where: { code }, transaction: t });
    }

    // Crear orden
    const order = await Order.create(
      {
        code,
        customerName,
        street,
        department,
        phoneNumber,
        totalPrice,
        completed: false,
      },
      { transaction: t }
    );

    // Asignar orderId a cada item
    for (const item of orderItemsData) {
      item.orderId = order.id;
    }

    // Crear los items
    await OrderItem.bulkCreate(orderItemsData, { transaction: t });

    await t.commit();

    return res.status(201).json({
      status:"success",
      message: "Order created",
      code: order.code,
      orderId: order.id,
    });

  } catch (error) {
    await t.rollback();
    console.error(error);
    return res.status(500).json({ status:"error", message: "Error al crear la orden", error });
  }
};


export const getOrders = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

export const getOrderByCode = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

export const getOrderById = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

export const deleteOrder = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}


export const updateStatusOrder = async (req: Request, res: Response): Promise<Response> =>{
    try {
          const id = req.params.id;
                
          if (!id) {
            return res.status(400).json({ status: 'error', message: 'Id is required' });
          }
          const orderExist = await Order.findByPk(id);

          if(!orderExist){
            return res.status(404).json({ status:"error", message: "Order not found." });
          }

          //cambiar el estado
          orderExist.completed = !orderExist.completed;

          await orderExist.save();

        return res.status(200).json({
            status:"success",
            message: "Order status chage",
        });
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

