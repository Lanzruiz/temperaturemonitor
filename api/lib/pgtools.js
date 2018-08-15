!function () {
    'use strict';
    var Class = require('ee-class')
        , util = require('util')
        , path = require('path')
        , exec = require('child_process').exec
        , fs = require('fs')
        , asyncMethod = require('async-method');

    module.exports = new Class({
        /*
         * create dump sql file of database
         * @param {Object} options, {host: 'localhost', port: 5432, user: 'postgres', password: 'postgres", dumpPath: '/home/backup',database: 'test'}
         * @param {Function} callback
         * @returns {undefined}
         */
        dumpDatabase: asyncMethod(function (options, callback) {
            process.nextTick(function () {
                var error
                    , command
                    , time
                    , filePath
                    , ls;
                if (!options.password || !options.host || !options.user || !options.port || !options.dumpPath || !options.database) {
                    error = new Error('Invalid Options');
                    error.name = 'InvalidOptions';
                    callback(error, null);
                } else {
                    fs.exists(options.dumpPath, function (exists) {
                        if (!exists) {
                            fs.mkdirSync(options.dumpPath);
                        }

                        time = new Date().getTime();
                        filePath = path.join(options.dumpPath, options.database + time + '.sql');
                        //command = util.format('pg_dump -h %s -p %d -W -U %s -F c -b -v -f %s %s',
                        // options.host, options.port, options.user, filePath, options.database);
                        command = util.format('pg_dump --dbname=postgresql://%s:%s@%s:%d/%s -f "%s"',options.user,options.password,options.host,options.port,options.database,filePath);

                        ls = exec(command, function (error, stdout, stderr) {
                        if (error !== null) {
                            callback(error, null, null);
                            return false;
                        }
                        callback(null, (stdout ? stdout : stderr), filePath);

                         });
                        //ls.stdin.write(options.password + '\n');

                    });
                }
            });
        })

        /*
         * restore dump sql file to database
         * @param {Object} options, {host: 'localhost', port: 5432, user: 'postgres', password: 'postgres", sqlFilePath: '/home/backup/test1430762417616.sql',database: 'testdb'}
         * @param {Function} callback
         * @returns {undefined}
         */
        , restoreDatabase: asyncMethod(function (options, callback) {
            process.nextTick(function () {
                var error
                    , command
                    , ls;

                if (!options.password || !options.user || !options.host || !options.port || !options.sqlFilePath || !options.database) {
                    error = new Error('Invalid Options');
                    error.name = 'InvalidOptions';
                    callback(error, null);
                } else {
                    fs.exists(options.sqlFilePath, function (exists) {
                        if (!exists) {
                            error = new Error('Dump sql path doesn\'t exists');
                            error.name = 'InvalidFilePath';
                            callback(error, null);
                        } else {

                            command = util.format('psql -h %s -p %d -W -U %s -f %s %s', options.host, options.port, options.user, options.sqlFilePath, options.database);
                            ls = exec(command, function (error, stdout, stderr) {
                                if (error !== null) {
                                    callback(error, null, null);
                                    return false;
                                }
                                callback(null, (stdout ? stdout : stderr), 'Db dump file restored successfully');

                            });
                            ls.stdin.write(options.password + '\n');
                        }
                    });
                }
            });
        })

    });
}();