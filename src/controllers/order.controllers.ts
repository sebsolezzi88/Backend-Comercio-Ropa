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
export const createOrder = async (req: Request, res: Response): Promise<Response> =>{
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

    // Calcular precio total
    let totalPrice = 0;

    for (const item of items) {
        const variant = await ProductVariant.findByPk(item.productVariantId, { transaction: t });
        if (!variant) throw new Error(`Variant with ID${item.productVariantId} not found.`);

        // Verificar que haya stock suficiente
        if (variant.stock < item.quantity) {
            throw new Error(`Insufficient stock for the variant with ID ${item.productVariantId}`);
        }

        // Calcular precio total
        totalPrice += Number(variant.price) * item.quantity;

        // Reducir stock
        variant.stock -= item.quantity;
        await variant.save({ transaction: t });
    }

    // Generar código único
    let code = generateOrderCode();
    let existing = await Order.findOne({ where: { code } });
    while (existing) {
      code = generateOrderCode();
      existing = await Order.findOne({ where: { code } });
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

    // Crear OrderItems
    const orderItemsData = items.map((item: any) => ({
      orderId: order.id,
      productVariantId: item.productVariantId,
      quantity: item.quantity,
      price: item.price, 
    }));

    await OrderItem.bulkCreate(orderItemsData, { transaction: t });

    await t.commit();

    return res.status(201).json({
      message: "Orden created",
      code: order.code,
      orderId: order.id,
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    return res.status(500).json({ message: "Error al crear la orden", error });
  }
}


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
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

