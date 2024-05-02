function UnauthorizedException(reason) {
  return new Response(reason, {
    status: 401,
    statusText: "Unauthorized",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
      // Disables caching by default.
      "Cache-Control": "no-store",
      // Returns the "Content-Length" header for HTTP HEAD requests.
      "Content-Length": reason.length,
    },
  });
}

export async function onRequestPost(context) {  // Contents of context object  
    const {   
     request, // same as existing Worker API    
     env, // same as existing Worker API    
     params, // if filename includes [id] or [[path]]   
     waitUntil, // same as ctx.waitUntil in existing Worker API    
     next, // used for middleware or to fetch assets    
     data, // arbitrary space for passing data between middlewares 
     } = context;
     console.log("requesheader:"+request.headers.get('token'))
     if(request.headers.get('token') == env.AUTH_CODE){
     context.request
     const url = new URL(request.url);
     request.delete("token");
     const response = fetch('https://telegra.ph/' + url.pathname + url.search, {
         method: request.method,
         headers: request.headers,
         body: request.body,
     });
     console.log("pathname:"+url.pathname);
     console.log("search:"+url.search);
     console.log("env:"+env);
     console.log("params.code:"+params.code);
     console.log("authcode-webget:"+window.localStorage.getItem('authCode'));
    return response;
     }
     else
     {
      return new UnauthorizedException("error");
     }
  }