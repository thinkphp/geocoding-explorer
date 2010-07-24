<?php

 header('content-type: text/javascript');

 $appid = 'YD-bs4vWJU_JXrmPwSfQ8yStcfWoDA5n51J';

 echo 'geocoding.datain("';

 $location = urlencode($_GET['q']);

 /** 
   * @Google Maps API Web Services
   *  The Google Geocoding API
   *  http://code.google.com/apis/maps/documentation/geocoding/#Geocoding
   * 
   */
 $url='http://maps.google.com/maps/api/geocode/json?address='.$location.'&sensor=false';

 $output = get($url);

 $data = json_decode($output);

 $resultset = $data->results[0];


  if($resultset) {

    $formated_address = $resultset->formatted_address;

    $latlon = $resultset->geometry->location->lat.", ".$resultset->geometry->location->lng;
    $address_components = $resultset->address_components;
    $geometry = $resultset->geometry;

    $location_type = $geometry->location_type;
    $wiewport_southwest_lat = $geometry->viewport->southwest->lat;  
    $wiewport_southwest_lng = $geometry->viewport->southwest->lng;  
    $wiewport_northeast_lat = $geometry->viewport->northeast->lat;  
    $wiewport_northeast_lng = $geometry->viewport->northeast->lng;  
    $bounds_southwest_lat = $geometry->bounds->southwest->lat; 
    $bounds_southwest_lng = $geometry->bounds->southwest->lng;
    $bounds_northeast_lat = $geometry->bounds->northeast->lat; 
    $bounds_northeast_lng = $geometry->bounds->northeast->lng;

    echo"<ul>";
 
     echo"<li><span>Address Components</span>";
        echo"<ul>"; 
        foreach($address_components as $ac) {
             echo"<li><span>".$ac->types[0].":</span><ul>";   
             echo"<li>Long name: ".$ac->long_name."</li>";   
             echo"<li>Short name: ".$ac->short_name."</li>";  
             echo"</ul></li>"; 
        } 
        echo"</ul>"; 
     echo"</li>";
     echo"<li><span>Geometry</span><ul>";

     echo"<li><span>Location: </span>".$latlon."</li>";      
     echo"<li><span>Type: </span>".$location_type."</li>";      

    if(isset($wiewport_southwest_lat) && $wiewport_southwest_lat != "" && $wiewport_southwest_lng != "") {

     echo"<li><span>Viewport</span><ul>";      

       echo"<li><span>SouthWest:</span><ul>";      
        echo"<li>Lat: ".$wiewport_southwest_lat."</li>";
        echo"<li>Lon: ".$wiewport_southwest_lng."</li>";  
       echo"</ul></li>";

       echo"<li><span>NorthEast:</span><ul>";      
        echo"<li>Lat: ".$wiewport_northeast_lat."</li>";
        echo"<li>Lon: ".$wiewport_northeast_lng."</li>";
       echo"</ul></li>";

     echo"</ul></li>";
    }//endif

    if(isset($bounds_southwest_lat) && $bounds_southwest_lat != "" && $bounds_southwest_lng != "") {

     echo"<li><span>Bounds</span><ul>";      

       echo"<li><span>SouthWest:</span><ul>";      
        echo"<li>Lat: ".$bounds_southwest_lat."</li>";
        echo"<li>Lon: ".$bounds_southwest_lng."</li>";  
       echo"</ul></li>";

       echo"<li><span>NorthEast:</span><ul>";      
        echo"<li>Lat: ".$bounds_northeast_lat."</li>";
        echo"<li>Lon: ".$bounds_northeast_lng."</li>";
       echo"</ul></li>";

     }//endif

     echo"</ul></li>";

     echo"</ul></li>"; 


 
     echo"</ul>";
     echo"</li>"; 
    echo"</ul>"; 

 }

 echo'","'.$latlon.'","'.$formated_address.'")'; 

 function get($url) {
     $ch = curl_init();
     curl_setopt($ch,CURLOPT_URL,$url);
     curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
     curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);
     $data = curl_exec($ch);
     curl_close($ch);
     if(empty($data)) {return 'Error! Sistem unvailable.';}
            else {return $data;}
 };
?>