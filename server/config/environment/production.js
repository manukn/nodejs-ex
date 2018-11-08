'use strict';

// Production specific configuration
// =================================

module.exports = {
        // Server IP
        ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

        // Server port
        port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000,

        // MongoDB connection options
        mongo: {
                uri: process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/plg'
        },

        // Seed database on startup
        seedDB: false
};
/*
mongodb://fourandone:Four&1@ds047865.mlab.com:47865/fourandone
mongoexport -h ds047865.mlab.com:47865 -d fourandone -c media -u fourandone -p Four&1 -o 
mongoimport -h ds047865.mlab.com:47865 -d fourandone -c media -u <user> -p Four&1 --file */
//# sourceMappingURL=production.js.map
