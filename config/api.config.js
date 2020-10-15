const isPro = Object.is(process.env.NODE_ENV, 'production')

// console.log(isPro);

module.exports = {
  baseUrl: isPro ? 'https://testapi.smartyg.com' : '/api'
}
