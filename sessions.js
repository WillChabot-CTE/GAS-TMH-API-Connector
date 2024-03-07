/**
 * Contains the functions for getting session details from the TMH API.
 * 
 * @author Will Chabot - Center for Transportation and the Environment (www.cte.tv) <chabot@cte.tv>
 */


/**
 * Retrieves session details for charging events within a specified date range for a given site.
 *
 * This function utilizes the `authorize` function to obtain an authorization cookie
 * before making the API call.
 *
 * @param {string} TMH_LOGIN The login credential for authentication.
 * @param {string} TMH_SECRET The secret credential for authentication.
 * @param {string} siteID The unique identifier of the site to retrieve data for.
 * @param {Date} startDate The start date for the desired session details (inclusive).
 * @param {Date} endDate The end date for the desired session details (inclusive).
 * @returns {object} Parsed JSON response containing details of charging sessions within the specified timeframe. Throws an error if the request fails.
 */
function getSessionDetails(TMH_LOGIN, TMH_SECRET, siteID, startDate, endDate) {
    const authCookie = authorize(TMH_LOGIN, TMH_SECRET);
  
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();
  
    const callType = 'activities/charging-events/charging-sessions';
    const params = `site_ids[]=${siteID}&start_date=${startDateString}&end_date=${endDateString}`;
    const endpoint = `${SDK_BASE_URL}/${callType}?${params}`;
  
    const options = {
      'method' : 'get',
      "headers": {
        'Cookie': authCookie,
        },
    };
  
    const response = UrlFetchApp.fetch(endpoint, options);
    const content = response.getContentText();
  
    let sessionDetails = JSON.parse(content);
  
    return sessionDetails;
   
}