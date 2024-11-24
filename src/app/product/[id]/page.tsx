import {ProductDetailPage} from "@/components/product-detail";


interface Props {
	params: {
		id: string;
	};
}

export default function ProductPage({params, }: Props){
    const {id} = params;
    
	return (
    <ProductDetailPage id={id}/>
  )
}
