import Image from "next/image";

type ProductCardProps = {
  profileImage: string;
  username: string;
  productImage: string;
  brand: {name: string};
  productName: string;
  condition: string;
  originalPrice: number;
  discountedPrice: number | undefined;
  discountPercentage: number | undefined;
  likes: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  profileImage,
  username,
  productImage,
  brand,
  productName,
  condition,
  originalPrice,
  discountedPrice,
  discountPercentage,
  likes,
}) => {
  const f_condition = condition.replace(/_/g, " ");
  return (
    <div className="w-[276px] p-4 bg-white">
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src={profileImage}
          alt="Profile Picture"
          width={40}
          style={{ width: 40, height: 40, borderRadius: "200px" }}
          height={40}
          className="rounded-[200px] border-2 "
        />
        <p className="text-sm font-medium">{username}</p>
      </div>
      <div className="relative border rounded-[10px] border-[2px] border-[#A6A6A6] ">
        <Image
          src={productImage}
          alt={productName}
          style={{ width: 276, height: 320 }}
          width={400}
          height={320}
          className="rounded-md"
        />
        <div className="absolute items-center bottom-2 flex gap-1 right-2 bg-black text-white text-xs px-2 py-1 rounded-[3px]">
          <Image
            src={"/heart-outline.png"}
            alt="Like"
            style={{ width: 12, height: 12 }}
            width={12}
            height={12}
          />
          <span className="text-[12px]"> {likes}</span>{" "}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-[#AB28B2] text-[14px] font-bold text-[#000000]">
          {brand?.name}
        </p>
        <p className="line-clamp-2 overflow-hidden text-[#000000] h-[45px] text-[14px] ">
          {productName}
        </p>
        <p className="text-gray-400 text-[14px]">{f_condition}</p>
        <div
          style={{ justifyContent: "space-between" }}
          className="flex  items-center space-x-2 mt-2"
        >
          {discountedPrice !== undefined ? (
            <>
              <p className="line-through text-[#000000]">£{originalPrice}</p>
              <p className="text-lg font-bold">£{discountedPrice}</p>
            </>
          ) : (
            <p className="text-lg font-bold">£{originalPrice}</p>
          )}
          {discountPercentage !== 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              {discountPercentage}% Off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
