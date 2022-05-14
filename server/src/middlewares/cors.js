export default cors;

/**
 * CORS middleware
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 */
function cors(req, res, next) {
  // No cache for IE
  // https://support.microsoft.com/en-us/kb/234067
  res.header('Pragma', 'no-cache');

  //Allow call in any domain
  res.header('Access-Control-Allow-Origin', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, uid');

  if (req.method === 'OPTIONS') {
    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.status(200).json({}).end();
    return;
  }

  // Pass to next layer of middleware
  next();
}
