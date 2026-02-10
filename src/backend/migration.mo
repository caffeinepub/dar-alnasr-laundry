import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type Item = {
    name : Text;
    price : Nat;
  };

  type CatalogCategory = {
    name : Text;
    items : [Item];
  };

  type OrderItem = {
    categoryName : Text;
    itemName : Text;
    quantity : Nat;
    price : Nat;
  };

  type Order = {
    items : [OrderItem];
    totalPrice : Nat;
    deliveryAddress : Text;
  };

  type OldActor = {};

  type NewActor = {
    orders : Map.Map<Principal, [Order]>;
  };

  public func run(old : OldActor) : NewActor {
    {
      orders = Map.empty<Principal, [Order]>();
    };
  };
};
