/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#auth_button').click(function (){
   if(! $('#login_form').valid()){
       return false;
   }else{
           $.post('http://localhost:3000/api/authenticate', $('#login_form').serialize())
             .done(function(msg){ 
                 if(msg.status===1){
                     $('#welcome').empty().append("Welcome Mr. "+msg.name);
                 }else{
                     $('#welcome').empty().append(msg.error);
                 }
                     })
             .fail(function(xhr, status, error) {
                 console.log(error);
            });
   }
});


$(function() {
    // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../serviceworker/service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
});
  