function GET_FIVETRAN_AUTH(){

  /*
  
  Pre-requisites:
    * Generate your API key and API secret in Fivetran.
    * To generate your API key and API secret, go to Manage Account > Settings > API Config > Generate.
    
  Source: https://fivetran.com/docs/rest-api/getting-started
  
  */
  
  var API_KEY = '<your api key>';
  var API_SECRET = '<your api secret>';
  
  var httpHeaderAuth = {'Authorization': 'Basic ' + Utilities.base64Encode(API_KEY + ':' + API_SECRET)};
  
  return httpHeaderAuth;

}
