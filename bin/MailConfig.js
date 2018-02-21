/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class MailConfig {
}
;
MailConfig.config =  {
        host: 'smtp.rediffmailpro.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'noreply@rupeeboss.com', 
            pass: 'noreply@01' 
        }};

module.exports=MailConfig;