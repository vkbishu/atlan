import customers from "../data/customers.json";
import employees from "../data/employees.json";
import orders from "../data/orders.json";
import products from "../data/products.json";
import suppliers from "../data/suppliers.json";
import territories from "../data/territories.json";

export function getSqlDataMaps() {
  const sqlMaps = new Map();
  sqlMaps.set("select * from customers", customers);
  sqlMaps.set("select * from employees", employees);
  sqlMaps.set("select * from orders", orders);
  sqlMaps.set("select * from products", products);
  sqlMaps.set("select * from suppliers", suppliers);
  sqlMaps.set("select * from territories", territories);

  return sqlMaps;
}

export function getEntities() {
  const entities = [
    {
      name: "customers",
      query: "select * from customers",
      recordTotal: 91,
      pinned: false,
    },
    {
      name: "employees",
      query: "select * from employees",
      recordTotal: 9,
      pinned: false,
    },
    {
      name: "orders",
      query: "select * from orders",
      recordTotal: 830,
      pinned: false,
    },
    {
      name: "products",
      query: "select * from products",
      recordTotal: 77,
      pinned: false,
    },
    {
      name: "suppliers",
      query: "select * from suppliers",
      recordTotal: 29,
      pinned: false,
    },
    {
      name: "territories",
      query: "select * from territories",
      recordTotal: 53,
      pinned: false,
    },
  ];

  return entities;
}
