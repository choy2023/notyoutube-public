export function getAccessToken() {
  return new Promise((resolve, reject) => {
    const storedAccessToken = localStorage.getItem('access_token');
    console.log(storedAccessToken);
    var YOUR_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    var YOUR_REDIRECT_URI = process.env.REACT_APP_REDIRECTURL;

    // Function to handle the callback after the OAuth 2.0 flow
    function handleOAuthCallback() {
      var fragmentString = window.location.hash.substring(1);
      var params: any = getParamsFromFragmentString(fragmentString);

      if (params['access_token']) {
        var accessToken = params['access_token'];
        storeAccessToken(accessToken);
        console.log('Access token:', accessToken);
        resolve(accessToken);
      }
    }

    function storeAccessToken(accessToken: any) {
      localStorage.setItem('access_token', accessToken);
    }

    // Helper function to parse the URL fragment into an object
    function getParamsFromFragmentString(fragmentString: string) {
      var params: any = {};
      var regex = /([^&=]+)=([^&]*)/g;
      var m;

      while ((m = regex.exec(fragmentString))) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }

      return params;
    }

    // Call the function to handle the OAuth callback
    handleOAuthCallback();

    // If there's no access token in the fragment, initiate the OAuth 2.0 flow
    if (!storedAccessToken) {
      oauth2SignIn();
    }

    // Function to redirect the user to the authorization endpoint
    function oauth2SignIn() {
      // Google's OAuth 2.0 endpoint for requesting an access token
      var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

      // Parameters to pass to OAuth 2.0 endpoint.
      var params = {
        client_id: YOUR_CLIENT_ID,
        redirect_uri: YOUR_REDIRECT_URI,
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
        include_granted_scopes: 'true',
        state: 'try_sample_request',
      };

      // Construct the authorization URL
      var authorizationUrl = oauth2Endpoint + '?' + serializeParams(params);

      // Redirect the user to the authorization URL
      window.location.href = authorizationUrl;
    }

    // Helper function to serialize an object into query parameters
    function serializeParams(params: any) {
      return Object.keys(params)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
    }
  });
}


export function revokeAccess(accessToken: any) {
  var revokeTokenEndpoint = 'https://oauth2.googleapis.com/revoke';

  var form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', revokeTokenEndpoint);

  var tokenField = document.createElement('input');
  tokenField.setAttribute('type', 'hidden');
  tokenField.setAttribute('name', 'token');
  tokenField.setAttribute('value', accessToken);
  form.appendChild(tokenField);

  document.body.appendChild(form);
  form.submit();
}