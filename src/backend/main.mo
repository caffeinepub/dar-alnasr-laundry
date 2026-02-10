import Migration "migration";

(with migration = Migration.run)
actor {
  type Item = {
    name : Text;
    price : Nat;
  };

  type CatalogCategory = {
    name : Text;
    items : [Item];
  };

  type Catalog = [CatalogCategory];

  public query ({ caller }) func getCatalog() : async Catalog {
    [
      // Wash Dry & Fold (32 items)
      {
        name = "Wash Dry & Fold";
        items = [
          { name = "Shirt"; price = 6 },
          { name = "T Shirt"; price = 6 },
          { name = "Trousers /jeans"; price = 6 },
          { name = "Waistcoat"; price = 6 },
          { name = "Handkerchief"; price = 3 },
          { name = "Underwears"; price = 3 },
          { name = "Shorts"; price = 6 },
          { name = "Sweater"; price = 6 },
          { name = "Single Sheat"; price = 9 },
          { name = "Double Sheat"; price = 12 },
          { name = "Single Blanket"; price = 15 },
          { name = "Double Blanket"; price = 23 },
          { name = "Towel"; price = 3 },
          { name = "Bath Towel"; price = 6 },
          { name = "Blouse"; price = 6 },
          { name = "Night smart"; price = 9 },
          { name = "Socks"; price = 2 },
          { name = "Pillow Cover"; price = 3 },
          { name = "Bed Cover (Single)"; price = 8 },
          { name = "Bed Cover (Double)"; price = 17 },
          { name = "Frock/Salwar"; price = 9 },
          { name = "Skirt"; price = 6 },
          { name = "Pant"; price = 6 },
          { name = "URTHALA (Single)"; price = 11 },
          { name = "URTHALA (Double)"; price = 22 },
          { name = "Pant (Children)"; price = 2 },
          { name = " Shirt (Children)"; price = 2 },
          { name = "Sheet (Single)"; price = 3 },
          { name = "Sheet (Double)"; price = 6 },
          { name = "Blanket Double"; price = 15 },
          { name = "Blanket Light"; price = 5 },
          { name = "Curtains (1Sq MTR)"; price = 2 },
        ];
      },
      // Press & Fold (18 items)
      {
        name = "Press & Fold";
        items = [
          { name = "Shirt"; price = 4 },
          { name = "T Shirt"; price = 4 },
          { name = "Trousers/jeans"; price = 4 },
          { name = "Waistcoat"; price = 4 },
          { name = "Shorts"; price = 4 },
          { name = "Single Sheat"; price = 6 },
          { name = "Double Sheat"; price = 8 },
          { name = "Blouse"; price = 6 },
          { name = "Sweater 2pcs"; price = 9 },
          { name = "Pant 3pcs"; price = 12 },
          { name = "Pant/Children"; price = 2 },
          { name = "Shirt/Children"; price = 2 },
          { name = "Sheet (Single)"; price = 3 },
          { name = "Sheet (Double)"; price = 6 },
          { name = "Duvet Cover"; price = 12 },
          { name = "Without Starch"; price = 6 },
          { name = "Waist Coats"; price = 2 },
          { name = "Waist Coats (Ladies)"; price = 2 },
        ];
      },
      // Wash Dry Press & Fold (17 items)
      {
        name = "Wash Dry Press & Fold";
        items = [
          { name = "Duvet – Kingsize"; price = 120 },
          { name = "Duvet – Single"; price = 90 },
          { name = "Blanket"; price = 60 },
          { name = "Curtains ( Per/Kg )"; price = 50 },
          { name = "2 Pcs Suit"; price = 50 },
          { name = "Suit Coat/Blazer/vest"; price = 30 },
          { name = "Trouser"; price = 20 },
          { name = "Long Sweater"; price = 25 },
          { name = "Sweater"; price = 15 },
          { name = "T Shirt"; price = 12 },
          { name = "Tie"; price = 6 },
          { name = "Waistcoat"; price = 7 },
          { name = "Suit (Child)"; price = 25 },
          { name = "Waist Coat"; price = 12 },
          { name = "Jacket"; price = 4 },
          { name = "Tie"; price = 8 },
          { name = "Underclothes"; price = 5 },
        ];
      },
      // Dry Cleaning (32 items)
      {
        name = "Dry Cleaning";
        items = [
          { name = "Dish Dasha / Kandora"; price = 20 },
          { name = "Dish Dasha / Kandora (More than 4)"; price = 16 },
          { name = "Dish Dasha / Kandora (10+)"; price = 12 },
          { name = "2 Pcs Suit"; price = 50 },
          { name = "Suit Coat/Blazer/vest"; price = 30 },
          { name = "Trouser"; price = 20 },
          { name = "Long Sweater"; price = 25 },
          { name = "Sweater"; price = 15 },
          { name = "T Shirt"; price = 12 },
          { name = "Tie"; price = 6 },
          { name = "Waistcoat"; price = 7 },
          { name = "Suit (Child)"; price = 25 },
          { name = "Waist Coat"; price = 12 },
          { name = "Jacket"; price = 4 },
          { name = "Shorts"; price = 8 },
          { name = "Pajama"; price = 8 },
          { name = "Abaya"; price = 18 },
          { name = "Saree"; price = 65 },
          { name = "Saree Blouse"; price = 29 },
          { name = "Dress"; price = 29 },
          { name = "Suit (Ladies)"; price = 23 },
          { name = "Salwar Kameez"; price = 15 },
          { name = "Salwar Kameez (Plain)"; price = 14 },
          { name = "Taban (Ladies)"; price = 13 },
          { name = "Cotton Dress"; price = 12 },
          { name = "Night Dress"; price = 17 },
          { name = "Scarf"; price = 7 },
          { name = "Skirt"; price = 15 },
          { name = "Vest"; price = 4 },
          { name = "Waist Coat"; price = 7 },
          { name = "Jubbah (Ladies)"; price = 36 },
          { name = "Trousers (Children)"; price = 4 },
        ];
      },
    ];
  };
};
