// inside middleware handler
const ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req); 
    console.log(clientIp)
};
// on localhost you'll see 127.0.0.1 if you're using IPv4 
// or ::1, ::ffff:127.0.0.1 if you're using IPv6
// As Connect Middleware
app.use(requestIp.mw())
app.use(function(req, res) {
    const ip = req.clientIp;
    console.log(ip);
});

var ip = req.connection.remoteAddress;



// But, there is a catch, if your Node app running on NGINX or any other proxy for that matter, then you will get the local ip address for every request i.e, 127.0.0.1.

// To solve this problem, we need to catch real ip address of the user from where the request is made.For achieving this we will look for the originating ip address in the X-Forwarded-For  HTTP Header. So the final and best method to get the ip address of request user will be:

 var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
// That’s how you’ll get the real ip address of a user using nodejs, not proxy’s ip address.By using an OR statement, in the order above, you check for the existence of an x-forwarded-for header and use it if it exists otherwise use the request.connection.remoteAddress.
