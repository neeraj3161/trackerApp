const express = require('express');
const app = express();
const bp = require('body-parser');
const useragent=require('express-useragent')
app.use(bp.urlencoded({extended:true}));
app.use(useragent.express());
app.set('view engine','ejs');
const port=3000;
const https=require('https');

app.use(express.static(__dirname));
app.use(express.favicon("public/images/"));

app.get('/',(req,res)=>{
    var completeData=(req.useragent);
    var mobile=("Mobile : "+completeData.isMobile);
    var browser=("Browser : "+completeData.browser);
    var bv=("Browser version : "+completeData.version);
    var platform=("Platform : "+completeData.platform);
    var os=("Device : "+completeData.os);
    var iphone=("Iphone : "+completeData.isiPhone);
    var android=("Android : "+completeData.isAndroid);
    const options = {
    path: '/json/',
    host: 'ipapi.co',
    port: 443,
    headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
  };
  https.get(options, function(resp){
      var body = ''
      // resp.on('data', function(data){
      //     body += data;
      // });
  
      // resp.on('end', function(){
      //     var loc = JSON.parse(body);
      //     console.log(loc.version);
      // });
      resp.on('data',function(data){
          body+=data;
          
      });
      // to properly end add the link below or else it will throw error read more at https 
      resp.on('end',function(){
          var whole=(JSON.parse(body));
          var ip=("Your ip address : "+whole.ip);
          var city=("Your city  : "+whole.city);
          var state=("Your state  : "+whole.region);
          var capital=("Capital : "+whole.country_capital);
          var country=("Country : "+whole.country_name);
          var location=("Location : "+whole.latitude+","+whole.longitude);
          var internet=("Internet : "+whole.org);
          console.log(country)
          res.render('index',{
              data1:ip,
              data2:city,
              data3:state,
              data4:capital,
              data5:country,
              data6:location,
              data7:internet,
              data8:mobile,
              data9:browser,
              data10:bv,
              data11:platform,
              data12:os,
              data13:iphone,
              data14:android,
          
          
          
          });
      });
  });
    

})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running at "+port);
})