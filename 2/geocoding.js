//show me love to the module pattern
var geocoding = function(){

    /* private data members */
    var counter = 0,
        data = [],
        names = [],
        markers = [], 
        info = document.getElementById('info'),
        map = new GMap2(document.getElementById('map'));
        locsform = document.getElementById('f'),
        isLive = false;

        //private method member
        function startMap() {
           if(GBrowserIsCompatible()) {
               if(document.getElementById('map')) { 
                 map.disableDoubleClickZoom();
                 map.addControl(new GSmallMapControl());
                 map.addControl(new GMapTypeControl());
                 map.setMapType(G_NORMAL_MAP);
                 var point = new GLatLng(44.4325000,26.1038889);
                 map.setCenter(point, 12);
                 GEvent.addListener(map,'dblclick',function(overlay,point){
                       codeLatLng(point); 
                 });
              }//end if
           }//end if GBrowserCompatible
        };

        function codeLatLng(point) {
               //increase counter points
               geocoding.counter++;
               //get latitude and longitude
               var lon = point.x, lat = point.y;
               //concatenate with comma
               var latlon = lat+","+lon;
               //place marker on map
               placeMarkerOnMap(point);
               //get infos from Google Geocoding API Dataset
               getPlaceFinderInfos(latlon);
        };

        function placeMarkerOnMap(point) {
                 //define new point with latitude and longitude
                 var point = new GLatLng(point.y,point.x);
                 //create new marker
                 var newMarker = new GMarker(point);
                     //push into stack markers
                     geocoding.markers[geocoding.counter] = newMarker;
                     //add newMarker on map
                     map.addOverlay(newMarker);
        };

        function getPlaceFinderInfos(location) {

             //remove old script tag injection from head
             if(document.getElementById('geocodingseed')) {
                 var old = document.getElementById('geocodingseed');
                     old.parentNode.removeChild(old);
             }
             //getting ready the url for GET REST
             var url = 'geocoding.php?q='+location;  
             //create an element 'script'
             var s = document.createElement('script');
                 //attach an attribute 'id'
                 s.setAttribute('id','geocodingseed');     
                 //attach an attribute 'type'
                 s.setAttribute('type','text/javascript');     
                 //attach an attribute 'url'
                 s.setAttribute('src',url);
                 //appends it in header document.html
                 document.getElementsByTagName('head')[0].appendChild(s);          
          return false;   
        };

        //this is a function that is executed when we make a script tag injection and receive data from 
        //API PlaceFinder dataset
        function datain(data,latlon,name) {
                 //get latitude and longitude in vars lat and lon
                 var lat = latlon.split(',')[0], lon = latlon.split(',')[1];
 
                   //if history form is ready then attach a class
                   if(!isLive) {
                     locsform.className = 'live';
                   }//endif

                 //adding option child to parent select
                 var option = document.createElement('option');
                     //added attribute 'value' to 'option'                     
                     option.setAttribute('value',latlon);
                     //create text node for option
                     var text = document.createTextNode(name);
                     //added text to option
                     option.appendChild(text);
                     //append option to select
                     document.getElementById('earlier').appendChild(option);

                     //bind handler event to corelate marker
                     geocoding.markers[geocoding.counter].bindInfoWindowHtml(name);       

                     //save the data for each address
                     geocoding.data[geocoding.counter] = data;
                     //save the name for each point
                     geocoding.names[geocoding.counter] = name;

                     //update the information in element info 
                     info.innerHTML = '<h2>'+name+' #'+geocoding.counter+'</h2>' + data; 
        };  

        //attach a listener for submit event at the element form 'locsform'
        locsform.onsubmit = function() {
               //get element 'select'
               var sel = this.getElementsByTagName('select')[0];
               //get attribute value from select options
               var latlon = sel.options[sel.selectedIndex].value.split(',');
               //set up lat and lon
               var lat = latlon[0], lon = latlon[1];
               //create the point from latitude and longitude options value
               var point = new GLatLng(lat,lon);
               //get current index
               var current = sel.selectedIndex+1;
               //update infos zone
               geocoding.info.innerHTML = '<h2>'+geocoding.names[current]+' #' + current + '</h2>' + 
                                            geocoding.data[current];     
               //go to current point on map
               map.panTo(point);
               //trigger tooltip current marker
               GEvent.trigger(geocoding.markers[current],'click'); 

            //@return false;
           return false;             
        }; 

    //return an object and transform private methods in public methods
    return {renderMap: startMap,datain: datain,data: data,names: names, counter: counter,info: info,markers: markers};
}(); 
geocoding.renderMap();
