# SQL Runner

Web-based application capable of running SQL queries and displaying the results of said query. The application can accepts SQL queries in the form of user inputs, then runs the given query, and displays the result within the application..   

**URL**: (https://bejewelled-dusk-15cd6c.netlify.app/)

## Features:
- Run SQL queries
- Show History
- Save SQL
- Pin Entity
- Filter Result
- Toggle Column
- Resize SQL Editor
- Show Pagination Results


## Tech Info
- Framework - **VueJS 3**
- State magement - **Pinia**
- CSS Framework - **TailwindCSS**
- External library and dependency - **codemirror**, **vuejs-paginate**

## Predefined Queries
```sql
select * from customers
select * from employees
select * from orders
select * from products
select * from suppliers
select * from territories
```
These are some predefined queries supported by the application. You can also select entity from left sidebar in application to run sql queries.

## Loading Performance as per GTmetrix
![Screen Shot 2022-12-31 at 13 51 38 PM](https://user-images.githubusercontent.com/49914631/210130979-a8012b66-8e38-44c1-8f4c-fcdc77d67c18.png)



## Optimisation
- Prevented unnecessary re-rendering. 
- Using pagination to load large amount of rows.

## Loading large amount of rows
Using **pagination** for large amount or rows. Other solution that can be used here are **virtual-scroll** or **lazy-load**.



## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
