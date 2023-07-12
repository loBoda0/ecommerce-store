import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/Billboard"
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({});
  const billboard = await getBillboard('ab940e80-7dbe-4b26-8c47-f165bed84871');

  return (
    <Container>
      <div className="spacey-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage