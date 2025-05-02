import ItemsList from "../menu/ItemsList";

export default function Pizzak() {
    return(
        <ItemsList urlProp="/api/Pizza?" title="Pizzák" addUrl="/Ujpizza"/>      
    )
}