// SDK de Mercado Pago
import { MercadoPagoConfig } from 'mercadopago';
import {MERCADOPAGO} from "./index.js";
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO });

export default client;