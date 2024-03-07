/**
 * Contains the functions for getting an authorization cookie from the TMH API.
 * 
 * @author Will Chabot - Center for Transportation and the Environment (www.cte.tv) <chabot@cte.tv>
 */

/**
 * Obtains an authorization cookie for subsequent API calls.
 *
 * @param {string} TMH_LOGIN The login credential for authentication.
 * @param {string} TMH_SECRET The password credential for authentication.
 * @returns {string} The authorization cookie, either retrieved from the cache or acquired through a new login request using the provided credentials.
 */
function authorize(TMH_LOGIN, TMH_SECRET) {

    // Look in the cache for the Cookie we need
    let cachedCookie = CACHE_SERVICE.get('Cookie');
    if (cachedCookie != null) {
      return cachedCookie;
    }
  
    //If we don't find it:
    const callType = 'user/login';
    let endpoint = `${SDK_AUTH_URL}/${callType}`;
  
  
    const payload = {
      login: TMH_LOGIN, 
      secret: TMH_SECRET,
    };
  
    const options = {
      'method' : 'post',
      'contentType': 'application/json',
      'payload' : JSON.stringify(payload),
    };
  
    let response = UrlFetchApp.fetch(endpoint, options); 
    let cookie = response.getAllHeaders()['Set-Cookie'];
  
    CACHE_SERVICE.put('Cookie', cookie, 1500); // cache for 25 minutes
  
    return cookie;
}