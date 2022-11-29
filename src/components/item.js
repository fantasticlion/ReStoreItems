export default function ProductItem(props) {   
  return (
    <div className="item">
      <h2>{props.info["name"]}</h2>
      <img src={props.info["image_link"]}></img>
      <ul>
        <li>Product Type: {props.info["product_type"]}</li>
        <li>Processor: {props.info["processor"]}</li>
        <li>Release Time: {props.info["release_time"]}</li>
        <li>Slogan: {props.info["slogan"]}</li>
        <li>Price: ${props.info["price"]}</li>
      </ul>
      <button onClick={() => props.setStateOfParent(props.info["name"], props.info["price"])}>
        {props.added === 1 ? "Remove from Favorites" : "Add to Favorites"}</button>
    </div>);
}
