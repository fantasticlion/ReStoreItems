import './App.css';
import {useState} from 'react';
import productsData from "./assets/items.json";
import ProductItem from "./components/item";

function App() {
  const [favorites, setFavorites] = useState(productsData.reduce((object, key) => 
    ({ ...object, [key.name]: -1}), {}));
  const [sort, setSort] = useState("productType");
  const [filter, setFilter] = useState({"release_time": [], "product_type": []});
  const [filterData, setFilterData] = useState(productsData);
  const [total, setTotal] = useState(0);

  const allSorts = {
    productType: {method: (a, b) => (parseInt(a.id) < parseInt(b.id) ? -1 : 1)},
    ascending: {method: (a, b) => (parseInt(a.price) < parseInt(b.price) ? -1 : 1)},
    descending: {method: (a, b) => (parseInt(a.price) > parseInt(b.price) ? -1 : 1)},
  };

  const allFilters = 
    [{type: "release_time", value: "Released in 2022"}, 
    {type: "release_time", value: "Not Released in 2022"}, 
    {type: "product_type", value: "iphone"}, 
    {type: "product_type", value: "iPad"}, 
    {type: "product_type", value: "Notebook"}, 
    {type: "product_type", value: "Desktop"}]

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

    const size = filter["release_time"].length + filter["product_type"].length;
    if (size === 0 || size === allFilters.length) {
      setFilterData(productsData);
    } 
    else {
      setFilterData(productsData.filter(item => 
        (filter["release_time"].includes(item["release_time"]) 
        || filter["release_time"].length === 0) && 
        (filter["product_type"].includes(item["product_type"]) 
        || filter["product_type"].length === 0)));
    }
  }

  const resetPage = () => {
    setSort("productType");
    setFilter({"release_time": [], "product_type": []});
    setFilterData(productsData);
    setFavorites(productsData.reduce((object, key) => ({ ...object, [key.name]: -1}), {}));
    setTotal(0);
  }

  return (
    <div className = "App">
      <div className = "product-cards">
        <h1>ReStore Rack &nbsp;
          <img src="https://scontent-dfw5-1.xx.fbcdn.net/v/t39.30808-6/440802919_985217343611101_8422290641784676598_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=UzsRQ3CoQVoQ7kNvgGFCRLn&_nc_ht=scontent-dfw5-1.xx&oh=00_AYAJ0Jg11hTfXLmn3aE_OwLK9R-WxrnNETpIop7Gek6_3A&oe=66C411DC" 
            width="54" height="66" padding="100"></img>
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
            <input type = "checkbox" value = "iPhone" onClick = {() => updateFilter("iPhone", "product_type")}/>
            <label> iPhone </label><br/>
            <input type = "checkbox" value = "iPad" onClick = {() => updateFilter("iPad", "product_type")}/> 
            <label> iPad </label><br/>
            <input type = "checkbox" value = "Notebook" onClick = {() => updateFilter("Notebook", "product_type")}/> 
            <label> Notebook </label><br/>
            <input type = "checkbox" value = "Desktop" onClick = {() => updateFilter("Desktop", "product_type")}/> 
            <label> Desktop </label><br/>
            
            <h3>Release Time:</h3>
            <input type = "checkbox" value = "Released in 2022" onClick = {() => updateFilter("Released in 2022", "release_time")}/> 
            <label> Released in 2022 </label><br/>
            <input type = "checkbox" value = "Not Released in 2022" onClick = {() => updateFilter("Not Released in 2022", "release_time")}/> 
            <label> Not Released in 2022 </label><br/>
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
