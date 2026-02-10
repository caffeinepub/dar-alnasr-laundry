import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Catalog = Array<CatalogCategory>;
export interface Item {
    name: string;
    price: bigint;
}
export interface CatalogCategory {
    name: string;
    items: Array<Item>;
}
export interface Order {
    deliveryAddress: string;
    items: Array<OrderItem>;
    totalPrice: bigint;
}
export interface OrderItem {
    categoryName: string;
    itemName: string;
    quantity: bigint;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getCatalog(): Promise<Catalog>;
    getMyOrders(): Promise<Array<Order>>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(order: Order): Promise<void>;
}
