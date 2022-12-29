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
      pinned: false,
    },
    {
      name: "employees",
      query: "select * from employees",
      pinned: false,
    },
    {
      name: "orders",
      query: "select * from orders",
      pinned: false,
    },
    {
      name: "products",
      query: "select * from products",
      pinned: false,
    },
    {
      name: "suppliers",
      query: "select * from suppliers",
      pinned: false,
    },
    {
      name: "territories",
      query: "select * from territories",
      pinned: false,
    },
  ];

  return entities;
}
