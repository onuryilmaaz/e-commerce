/* eslint-disable @typescript-eslint/no-explicit-any */
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 1000,
    isActive: true,
  },
  {
    id: 2,
    name: "Product 2",
    price: 2000,
    isActive: false,
  },
  {
    id: 3,
    name: "Product 3",
    price: 3000,
    isActive: true,
  },
];

function App() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  );
}

function Header() {
  return (
    <>
      <h1>Header</h1>
    </>
  );
}

function ProductList() {
  return (
    <>
      <h2>Product List</h2>
      {products.map((p) => (
        <Product key={p.id} product={p} />
      ))}
    </>
  );
}

function Product(props: any) {
  return (
    <>
      {props.product.isActive ? (
        <div>
          <h3>{props.product.name}</h3>
          <p>{props.product.price}</p>
        </div>
      ) : (
        <p>Product is not active</p>
      )}
    </>
  );
}

export default App;
