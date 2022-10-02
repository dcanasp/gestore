import { type } from "os"

export type products=[{
    product_id: number,
    user_id: number,
    image_id: number,
    nombre: string,
    descripcion: string,
    stock: number,
    precio: number
}]

export type client = [{
    compra_id: number,
    user_id: number,
    fecha: string,
    product_id: number
}]

export type image = {
    image_id: number,
    image: string
}