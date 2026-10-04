const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: ["Regular Fit Polo Yaka T-Shirt", "Slim Fit Pike Polo", "Basic Bisiklet Yaka T-Shirt"][i % 3],
  price: [1299.99, 1499.99, 899.99][i % 3],
}));

const formatPrice = (n: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(n);

/** Sayfanın kaydırılabilir olması ve fixed davranışın test edilmesi için placeholder ürünler. */
export function DemoProductGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6">
      {PRODUCTS.map((p) => (
        <li key={p.id}>
          <div className="aspect-[3/4] bg-neutral-100" />
          <p className="mt-3 text-sm">{p.name}</p>
          <p className="mt-1 text-sm font-semibold">{formatPrice(p.price)}</p>
        </li>
      ))}
    </ul>
  );
}
