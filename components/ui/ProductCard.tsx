'use client'

import Image from "next/image"
import { Expand, ShoppingCart } from 'lucide-react'

import { Product } from "@/types"
import IconButton from "./IconButton"
import Currency from "./Currency"
import { useRouter } from "next/navigation"
import { MouseEventHandler } from "react"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"

interface ProductCardProps {
  data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({
  data
}) => {
  const cart = useCart()
  const previewModal = usePreviewModal()
  const router = useRouter()
  
  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    previewModal.onOpen(data);
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    cart.addItem(data);
  }

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer border rounded-xl p-3 space-y-4">
      {/* Images & actions */}
      <div className="aspect-square rounded-xl bg-gray-700 relative">
        <Image
        src={data?.images?.[0]?.url}
        fill
          alt="Image"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton 
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard