import SearchBar from "../components/searchbar";
import PropertyCards from "../components/propertycards";

function PropertySearch() {
    return (
    <div>
        <div class="ms-auto me-auto"><SearchBar/></div>
        <div><PropertyCards/></div>
    </div>
    );
  }
  
  export default PropertySearch;