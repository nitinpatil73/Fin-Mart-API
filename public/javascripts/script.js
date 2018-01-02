/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#auth_button').click(function (){
   if(! $('#login_form').valid()){
       return false;
   }else{
       $.ajax({
          url:"authenticate",
          data:$('#login_form').serialize(),
          method:"POST",
          success: function(msg){
              console.log(msg);
          },
          error:function(err){
              console.log(err);
          }
       });
   }
});
