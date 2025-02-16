import { getAllProducts } from "@/actions/get/getAllProducts";
import Image from "next/image";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div className="min-h-screen w-screen p-11 bg-black text-white flex flex-col items-center justify-center">
      <div className="w-full flex flex-wrap gap-5 items-center justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[400px] relative flex flex-col items-start justify-between h-[200px] bg-white/10 p-3"
          >
            <div className="w-full relative h-[400px]">
              {product.image && (
                <Image
                  src={product.image.src}
                  fill
                  alt={product.image.altText}
                  className="object-cover"
                />
              )}
            </div>
            {/** */}
            <div className="flex flex-col">
              <div>
                <span>{product.currency}</span> {product.price}
              </div>
              <div className="text-lg">{product.title}</div>
              <div className="text-sm">{product.description} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
