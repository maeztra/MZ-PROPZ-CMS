<script>"use strict";$(function(){try{var t=localStorage.getItem("@propz/post-price");$.ajax({url:"/api/io/post-price",method:"POST",type:"POST",data:t}).then(function(){console.log("Propz: post-price sent")})}catch(t){console.warn(t.messaeg)}});</script>