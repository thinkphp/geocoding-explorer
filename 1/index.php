<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
   <title>Google Geocoding Explorer</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
   <link rel="stylesheet" href="geocoding.css" type="text/css">
</head>
<body>
<div id="doc3" class="yui-t7">
   <div id="hd" role="banner"><h1>Google Geocoding Explorer</h1></div>
   <div id="bd" role="main">
      <form id="f" name="f"><label for="location">Location: </label><input type="text" name="location" id="location"/><input type="submit" value="Search!"></form>
    <div class="yui-gc">
      <div class="yui-u first">
           <div id="map"></div>
      </div>
      <div class="yui-u">
           <form id="f2" class="nonlive"><label for="earlier">Earlier Locations: </label> <select name="earlier" id="earlier"></select><input type="submit" value="Go"></form>
           <div id="info"></div>
      </div>
   </div>
 </div>
 <div id="ft" role="contentinfo"><p>Created by @<a href="http://twitter.com/thinkphp">thinkphp</a> using YUI, <a href="http://code.google.com/apis/maps/documentation/javascript/">Google! Maps</a> and <a href="http://code.google.com/apis/maps/documentation/geocoding/">Google Geocoding API</a></p></div>
</div>
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true&amp;key=ABQIAAAAHFKkG2s1GKwMWvhsxH6UGhT31Sqdr1iMbgcfgd36_cHBTNb4GxTM-5GlCegdpzSsulvA2GKSzWJsmA" type="text/javascript"></script>
<script type="text/javascript" src="geocoding.js"></script>
</body>
</html>