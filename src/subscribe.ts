const accounts = process.argv.slice(2)
const {RippleAPI} = require('ripple-lib')
const api = new RippleAPI({
    // Public rippled server hosted by Ripple, Inc.
    server: 'wss://s1.ripple.com'
})

api.connect().then(() => {
   api.connection.on('transaction', ev => {
      console.log(JSON.stringify(ev, null, 2))
   })

   return api.connection.request({
     command: 'subscribe',
     accounts: accounts
   })
}).then(() => {
    console.info('Connected and monitoring accounts:', JSON.stringify(accounts))
}).catch(e => {
    console.error('Error:', e)
})
