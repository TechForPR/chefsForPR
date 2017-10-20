require('./eslint');
require('./models');

setTimeout(function() {
    console.log('forcing test to exit');
    process.exit(0);
}, 4000);
