const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

module.exports = {
  baseUrl: isPro ? 'https://test.smartyg.com/api/' : 'api/'
}
