//    Demo json  loaded from dropbox 
//    Data = http://codepen.io/nakome/pen/DnEvr.js
//[   
//   {
//      "photo":"image url ",
//      "name":"Jhon",
//      "last":"Smith",
//      "email":"jhony@site.com",
//      "phone":"1-555-222-333",
//      "web":"http://jhonSmith.com"
//   },
//   { 
//      "photo":"image url",
//      "name":"Carla",
//      "last":"Doe",
//      "email":"carladoe@site.com",
//      "phone":"1-333-111-555",
//      "web":"http://carladoe.com"
//   }
// ]


(function(){
  
  'use-strict';
  
  var elem,
      // data-fn
      dataFn = $('[data-fn="contacts"]'),
      // data-url
      thisUrl = dataFn.data('url');
  

  
  if (typeof $.table_of_contacts == 'undefined')
    
    $.table_of_contacts = {};
  
  $.table_of_contacts.get = {
    
    init: function() {

      if(dataFn){

        this.getJson();
      }else{
        dataFn.html('No data found.');
      }
    },
    
    /* = Get data
    ------------------------*/
    getJson: function(url){
      
      var self = this;
      
      // loading data before
      dataFn.html('<span class="loading_table">'+
                  'Loading Please Wait ....'+
                  '</span>');
      
      // No ajax cache
      $.ajaxSetup({ cache: false });
      

      // Get json
      $.getJSON(thisUrl,function(data){
        
        // load template
        var out_html = self.tpl(); 
        
        $.each(data,function(i,obj){  
          // load inner template
          out_html += self.tpl_inner(obj);
          
        });
        // close tag
        out_html += '</tbody>';
        // render templates
        dataFn.html(out_html);
        // error 
      }).error(function(j,t,e){ 
        // render error.
        dataFn.html('<span class="error_table">'+
                    'Error = '+e+ ',j= ' + JSON.stringify(j) + ', t=' + t +
                    '</span>');
        
      });
    },
    
    // head table template
    tpl: function(){
      var html = '<thead>'+
          '<tr>'+
          '<th>Beacon Name</th>'+
          '<th>Serial</th>'+    
          '<th>URL</th>'+
          '<th></th>'+
          '</tr>'+
          '</thead>'+
          '<tbody >';
      return html;
    },
    // inner template
    tpl_inner: function(obj){
      
      var  html= 
	      '<form action=\"http://54.179.189.202/eddystone/mappings/' + obj.serial + '\" method=\"post\" id=\"' + obj.serial + '\">' +
          '<tr>'+
          '<td>'+'<input type=\"text\" name=\"name\" form=\"'+ obj.serial + '\" value=\''+ obj.name + '\'\/>' + '</td>'+
          '<td>'+obj.serial+'</td>'+
          '<td width=\"50\%\">'+
          '<input width=\"600px\" type=\"text\" name=\"url\" form=\"'+ obj.serial + '\" value=\''+ obj.url + '\'\/>' + 
          '</td>'+
          '<td align=\"center\">' + 
		  
		  '<input type=\"submit\" class=\"btn\" form=\"'+ obj.serial + '\" value=\"update\"\/>'+

          '</tr>'+
		  		  '</form>' ; 
      return html;
    }
    
  };
  
  // on ready render data
  $(document).ready(function() {
    $.table_of_contacts.get.init();
  });
})().call(this);



