require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Search",
    "esri/widgets/Home",
    "esri/PopupTemplate"
], function (Map, MapView, FeatureLayer, BasemapToggle, Search, Home, PopupTemplate) {
    var map = new Map({
        basemap: "streets"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-96.521, 39.914],
        zoom: 4
    });

    const featureLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/ProjSandoval/FeatureServer/0",
        opacity: 0.5,
        outFields: ["*"],
        popupTemplate: new PopupTemplate({
            title: "US States",
            content: "{Name} Has a Total Population of {P0010001}"
        })
    });

    map.add(featureLayer);

    const featureLayer2 = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/USA_Major_Cities/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: new PopupTemplate({
            title: "US Major City",
            content: "{NAME} has a Population of {POPULATION}"
        })
    });

    map.add(featureLayer2);

    // Add a BasemapToggle widget
    var basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "hybrid"
    });

    view.ui.add(basemapToggle, "bottom-left"); 

   
    var searchWidget = new Search({
        view: view
    });

    view.ui.add(searchWidget, {
        position: "top-right" 
    });

    // Add a Home button
    var homeButton = new Home({
        view: view
    });

    view.ui.add(homeButton, "top-left"); 
});
