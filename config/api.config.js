const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

module.exports = {
  baseUrl: isPro ? 'http://test.smartyg.com:5566/api/' : 'api/'
}
