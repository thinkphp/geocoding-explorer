//show me loveto the module pattern
var geocoding = function(){

    /* private data members */
    var counter = 0,
        data = [],
        names = [],
        markers = [], 
        info = document.getElementById('info'),
        map = new GMap2(document.getElementById('map'));
        form = document.getElementById('f'),
        locsform = document.getElementById('f2'),
        isLive = false;

        //private method member
        function startMap() {
           if(GBrowserIsCompatible()) {
               if(document.getElementById('map')) { 
                 map.addControl(new GSmallMapControl());
                 map.addControl(new GMapTypeControl());
                 map.setMapType(G_NORMAL_MAP);
                 var point = new GLatLng(44.4325000,26.1038889);
                 map.setCenter(point, 12);
              }//end if
           }//end if GBrowserCompatible
        };

        /* here we attach a handler for submit event at 'form' element form */
        form.onsubmit = function() {
  
             //remove old script tag injection from head
             if(document.getElementById('geocodingseed')) {
                 var old = document.getElementById('geocodingseed');
                     old.parentNode.removeChild(old);
             }

             //get the location value
             var location = document.getElementById('location').value;

             //if location is empty then return;
             if(location == "") {alert("The location is empty. Please fill out this field!");return false;}

             //get ready url
             var url = 'geocoding.php?q='+location;  
             //create an element 'script'
             var s = document.createElement('script');
                 //attach an attribute 'id'
                 s.setAttribute('id','geocodingseed');     
                 //attach an attribute 'type'
                 s.setAttribute('type','text/javascript');     
                 //attach an attribute 'url'
                 s.setAttribute('src',url);
                 //append in header document.html
                 document.getElementsByTagName('head')[0].appendChild(s);
             //return false
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
                 }

                 //create an element 'option'
                 var option = document.createElement('option');
                     //set attribute 'value' with 'latlon'
                     option.setAttribute('value',latlon);
                     //create textnode
                     var text = document.createTextNode(name);
                     //append child textnode
                     option.appendChild(text);
                     //append child in element(select) with ID 'earlier'
                     document.getElementById('earlier').appendChild(option);
 
                 //define new point with latitude and longitude
                 var point = new GLatLng(lat,lon);

                    //increase counter
                    ++geocoding.counter;

                 //create an icon label for marker
                 var img = new GIcon(G_DEFAULT_ICON);
                     img.image = "http://maps.google.com/mapfiles/marker" + String.fromCharCode(geocoding.counter+64) + ".png";

                 //create new marker
                 var newMarker = new GMarker(point,{icon: img});
                     //add infowindow
                     newMarker.bindInfoWindowHtml(name);                     
                     //push into stack markers
                     geocoding.markers[geocoding.counter] = newMarker;

                    //add new marker on map
                    map.addOverlay(newMarker);

                    //set center map
                    map.setCenter(point,12);
  
                    //trigger current point with marker
                    GEvent.trigger(newMarker,'click');

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
               //get attribute value
               var latlon = sel.options[sel.selectedIndex].value.split(',');
               //set up lat and lon
               var lat = latlon[0], lon = latlon[1];
               //create point from latitude and longitude
               var point = new GLatLng(lat,lon);
               //get current index from select
               var current = sel.selectedIndex+1;
               //update infos zone
               geocoding.info.innerHTML = '<h2>'+geocoding.names[current]+' #' + current + '</h2>' + 
                                            geocoding.data[current];     
               //walk to the current point
               map.panTo(point);
               //trigger the current marker of point
               GEvent.trigger(geocoding.markers[current],'click'); 

            //@return false;
           return false;             
        }; 
    //return an object and transform private methods in public methods
    return {renderMap: startMap,datain: datain,data: data,names: names, counter: counter,info: info,markers: markers};
}(); 
//begin application with render map
geocoding.renderMap();
