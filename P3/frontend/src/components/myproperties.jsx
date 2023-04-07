function MyProperties() {
    return (
      <div>
        <div class="container">
            <h2 class="pt-5 pb-5 text-secondary text-center">My Properties</h2>
            <div class="d-flex justify-content-center my-4">
                <a class="btn btn-light border border-1" href="/createproperty.html" role="button">Create New Property</a>
            </div>
            <div id="host-properties-placeholder"></div>
            {/*<script>$(function(){$("#host-properties-placeholder").load("./Components/hostproperties.html");});</script>*/}
        </div>
       
      

      </div>
    );
  }
  
  export default MyProperties;
  
  {/* Should be a My Properties Page*/}