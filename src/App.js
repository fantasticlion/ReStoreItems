import './App.css';
import { useState } from 'react';
import productsData from "./assets/items.json";
import ProductItem from "./components/item";

function App() {
  const [favorites, setFavorites] = useState(productsData.reduce((object, key) => 
    ({ ...object, [key.name]: -1}), {}));
  const [sort, setSort] = useState("productType");
  const [filter, setFilter] = useState({"release_time": [], "product_type": [], "processor": []});
  const [filterData, setFilterData] = useState(productsData);
  const [total, setTotal] = useState(0);
  const [showNav, setShowNav] = useState(false); // Set to false to hide filters by default

  const allSorts = {
    productType: { method: (a, b) => (parseFloat(a.id) < parseFloat(b.id) ? -1 : 1) },
    ascending: { method: (a, b) => (parseFloat(a.price) < parseFloat(b.price) ? -1 : 1) },
    descending: { method: (a, b) => (parseFloat(a.price) > parseFloat(b.price) ? -1 : 1) },
  };

  const allFilters = 
   [{type: "processor", value: "ReStore-Tulsa"},
    {type: "processor", value: "ReStore Rack"},
    {type: "processor", value: "ReStore-Broken Arrow"},
    {type: "processor", value: "ReStore-Claremore"},
    {type: "release_time", value: "8/14"}, 
    {type: "release_time", value: "8/15"},
    {type: "release_time", value: "8/16"},
    {type: "release_time", value: "8/17"},
    {type: "product_type", value: "Furniture"},
    {type: "product_type", value: "Clothes"}, 
    {type: "product_type", value: "Accessories"},
    {type: "product_type", value: "Fitness"},
    {type: "product_type", value: "Other"}]

  const updateFavorites = (name, price) => {
    let tempFavorites = favorites;
    tempFavorites[name] = tempFavorites[name] === 1 ? -1 : 1;
    setTotal(total + tempFavorites[name] * parseFloat(price));
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
      
    <div className="App">
      <nav>
        <div class="logo">
          <a href="https://greencountryhabitat.org/">
            <img src="https://images.squarespace-cdn.com/content/v1/60148fcfca55b203f218fe44/78437348-4849-4744-9026-560f2ae90f51/GCReStoreLogoWhite.png" 
                 width="291" alt="Green Country Habitat for Humanity Logo"></img>
          </a>
        </div>
        <ul>
          <li><a href="https://www.greencountryrestore.org/locations">Locations</a></li>
          <li><a href="https://www.greencountryrestore.org/deconstruction">Deconstruction</a></li>
          <li><a href="https://www.greencountryrestore.org/habco">Habco Cabinets</a></li>
          <li><a href="https://greencountryhabitat.org/careers">Careers</a></li>
          <li><a href="https://www.greencountryrestore.org/contactus">Contact Us</a></li>
          <button onClick={() => setShowNav(!showNav)} className="toggle-button">
            {showNav ? 'Hide Filters' : 'Show Filters'}
          </button>
        </ul>
      </nav>
    
      <div className="product-cards">
        <h1>Green Country ReStores' Recent Facebook Items</h1>
        <div className="product"> {
          filterData.sort(allSorts[sort].method)
            .map((item, index) => (<ProductItem key={"product" + index} info={item} 
              added={favorites[item.name]} setStateOfParent={updateFavorites}/>))}
        </div>
      </div>

      {showNav && (
        <div className="favorites">
          <form>
            <div className="sorting">
              <h3>Sort By:</h3>
              <input className="jss4" type="radio" value="productType" defaultChecked name="sort" onClick={() => setSort("productType")}></input>
              <label> Product Date </label><br/>
              <input className="jss4" type="radio" value="ascending" name="sort" onClick={() => setSort("ascending")}></input>
              <label> Price: Ascending </label><br/>
              <input className="jss4" type="radio" value="descending" name="sort" onClick={() => setSort("descending")}></input>
              <label> Price: Descending </label><br/>
            </div>

            <div className="filtering">
              <h3>Product Type:</h3>
              <input type="checkbox" value="Furniture" onClick={() => updateFilter("Furniture", "product_type")}/>
              <label> Furniture </label><br/>
              <input type="checkbox" value="Clothes" onClick={() => updateFilter("Clothes", "product_type")}/> 
              <label> Clothes </label><br/>
              <input type="checkbox" value="Accessories" onClick={() => updateFilter("Accessories", "product_type")}/> 
              <label> Accessories </label><br/>
              <input type="checkbox" value="Fitness" onClick={() => updateFilter("Fitness", "product_type")}/> 
              <label> Fitness </label><br/>
              <input type="checkbox" value="Other" onClick={() => updateFilter("Other", "product_type")}/> 
              <label> Other </label><br/>
              
              <h3>Release Time:</h3>
              <input type="checkbox" value="8/14" onClick={() => updateFilter("8/14", "release_time")}/> 
              <label> 8/14 </label><br/>
              <input type="checkbox" value="8/15" onClick={() => updateFilter("8/15", "release_time")}/> 
              <label> 8/15 </label><br/>
              <input type="checkbox" value="8/16" onClick={() => updateFilter("8/16", "release_time")}/> 
              <label> 8/16 </label><br/>
              <input type="checkbox" value="8/17" onClick={() => updateFilter("8/17", "release_time")}/> 
              <label> 8/17 </label><br/>

              <h3>Processor:</h3>
              <input type="checkbox" value="ReStore-Tulsa" onClick={() => updateFilter("ReStore-Tulsa", "processor")}/> 
              <label> ReStore-Tulsa </label><br/>
              <input type="checkbox" value="ReStore Rack" onClick={() => updateFilter("ReStore Rack", "processor")}/> 
              <label> ReStore Rack </label><br/>
              <input type="checkbox" value="ReStore-Broken Arrow" onClick={() => updateFilter("ReStore-Broken Arrow", "processor")}/> 
              <label> ReStore-Broken Arrow </label><br/>
              <input type="checkbox" value="ReStore-Claremore" onClick={() => updateFilter("ReStore-Claremore", "processor")}/> 
              <label> ReStore-Claremore </label><br/>
            </div>
          
            <div>
              <h3>Total Price:</h3>
              <label>${total}</label>
            </div>
            <button onClick={() => resetPage()}>{"Reset"}</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
