import './App.css';
import {useState} from 'react';
import productsData from "./assets/items.json";
import ProductItem from "./components/item";

function App() {
  const [favorites, setFavorites] = useState(productsData.reduce((object, key) => 
    ({ ...object, [key.name]: -1}), {}));
  const [sort, setSort] = useState("productType");
  const [filter, setFilter] = useState({"release_time": [], "product_type": [], "processor": []});
  const [filterData, setFilterData] = useState(productsData);
  const [total, setTotal] = useState(0);

  const allSorts = {
    productType: {method: (a, b) => (parseInt(a.id) < parseInt(b.id) ? -1 : 1)},
    ascending: {method: (a, b) => (parseInt(a.price) < parseInt(b.price) ? -1 : 1)},
    descending: {method: (a, b) => (parseInt(a.price) > parseInt(b.price) ? -1 : 1)},
  };

  const allFilters = 
   [{type: "processor", value: "ReStore-Tulsa"},
    {type: "processor", value: "ReStore Rack"},
    {type: "processor", value: "ReStore-Broken Arrow"},
    {type: "processor", value: "ReStore-Claremore"},
    {type: "release_time", value: "8/14"}, 
    {type: "release_time", value: "8/15"}, 
    {type: "product_type", value: "Furniture"},
    {type: "product_type", value: "Clothes"}, 
    {type: "product_type", value: "Accessories"},
    {type: "product_type", value: "Fitness"},
    {type: "product_type", value: "Other"}]

  const updateFavorites = (name, price) => {
    let tempFavorites = favorites;
    tempFavorites[name] = tempFavorites[name] === 1 ? -1 : 1;
    setTotal(total + tempFavorites[name] * parseInt(price));
    setFavorites(tempFavorites);
  };

  const updateFilter = (newFilter, filterType) => {
    let tempFilters = filter[filterType];

    if (tempFilters.includes(newFilter)) {
      tempFilters.splice(tempFilters.indexOf(newFilter), 1);
    } 
    else {
      tempFilters.push(newFilter);
    }

    filter[filterType] = [...tempFilters];
    setFilter(filter);

    const size = filter["release_time"].length + filter["product_type"].length + filter["processor"].length;
    if (size === 0 || size === allFilters.length) {
      setFilterData(productsData);
    } 
    else {
      setFilterData(productsData.filter(item => 
        (filter["release_time"].includes(item["release_time"]) 
        || filter["release_time"].length === 0) && 
        (filter["product_type"].includes(item["product_type"]) 
        || filter["product_type"].length === 0) && 
        (filter["processor"].includes(item["processor"]) 
        || filter["processor"].length === 0)));
    }
  }

  const resetPage = () => {
    setSort("productType");
    setFilter({"release_time": [], "product_type": [], "processor": []});
    setFilterData(productsData);
    setFavorites(productsData.reduce((object, key) => ({ ...object, [key.name]: -1}), {}));
    setTotal(0);
  }

  return (
    <div className = "App">
      <div className = "product-cards">
        <h1>Green Country ReStores &nbsp;
          <img src="https://images.squarespace-cdn.com/content/v1/60148fcfca55b203f218fe44/49cb0b5c-21d6-4bf8-8f74-544cd98ae908/GC_ReStoreLogoBlackHome.png" 
            height = "66" padding="100"></img>
        </h1>
        <div className = "product"> {
          filterData.sort(allSorts[sort].method)
            .map ((item, index) => (<ProductItem key={"product" + index} info = {item} 
              added = {favorites[item.name]} setStateOfParent={updateFavorites}/>))}
        </div>
      </div>

      <div className="favorites">
        <form>
          <div className="sorting">
            <h3>Sort By:</h3>
            <input class = "jss4" type = "radio" value = "productType" defaultChecked name = "sort" onClick = {() => setSort("productType")}></input>
            <label> Product Type </label><br/>
            <input class = "jss4" type = "radio" value = "ascending" name = "sort" onClick = {() => setSort("ascending")}></input>
            <label> Price: Ascending </label><br/>
            <input class = "jss4" type = "radio" value = "descending" name = "sort" onClick = {() => setSort("descending")}></input>
            <label> Price: Descending </label><br/>
          </div>

          <div className="filtering">
            <h3>Product Type:</h3>
            <input type = "checkbox" value = "Furniture" onClick = {() => updateFilter("Furniture", "product_type")}/>
            <label> Furniture </label><br/>
            <input type = "checkbox" value = "Clothes" onClick = {() => updateFilter("Clothes", "product_type")}/> 
            <label> Clothes </label><br/>
            <input type = "checkbox" value = "Accessories" onClick = {() => updateFilter("Accessories", "product_type")}/> 
            <label> Accessories </label><br/>
            <input type = "checkbox" value = "Fitness" onClick = {() => updateFilter("Fitness", "product_type")}/> 
            <label> Fitness </label><br/>
            <input type = "checkbox" value = "Other" onClick = {() => updateFilter("Other", "product_type")}/> 
            <label> Other </label><br/>
            
            <h3>Release Time:</h3>
            <input type = "checkbox" value = "8/14" onClick = {() => updateFilter("8/14", "release_time")}/> 
            <label> 8/14 </label><br/>
            <input type = "checkbox" value = "8/15" onClick = {() => updateFilter("8/15", "release_time")}/> 
            <label> 8/15 </label><br/>

            <h3>Processor:</h3>
            <input type = "checkbox" value = "ReStore-Tulsa" onClick = {() => updateFilter("ReStore-Tulsa", "processor")}/> 
            <label> ReStore-Tulsa </label><br/>
            <input type = "checkbox" value = "ReStore Rack" onClick = {() => updateFilter("ReStore Rack", "processor")}/> 
            <label> ReStore Rack </label><br/>
            <input type = "checkbox" value = "ReStore Broken Arrow" onClick = {() => updateFilter("ReStore Broken Arrow", "processor")}/> 
            <label> ReStore Broken Arrow </label><br/>
            <input type = "checkbox" value = "ReStore Claremore" onClick = {() => updateFilter("ReStore Claremore", "processor")}/> 
            <label> ReStore Claremore </label><br/>
          </div>
        
          <div>
            <h3>Favorites:</h3>
            <label>Total Price: ${total}</label>
          </div>
          <button onClick = {() => resetPage()}>{"Reset"}</button>
        </form>
      </div>
    </div>);
}

export default App;
