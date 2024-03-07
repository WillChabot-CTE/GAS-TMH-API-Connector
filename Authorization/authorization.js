function authorize() {

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