import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CatalogCategory {
    name: string;
    items: Array<Item>;
}
export interface Item {
    name: string;
    price: bigint;
}
export type Catalog = Array<CatalogCategory>;
export interface backendInterface {
    getCatalog(): Promise<Catalog>;
}
