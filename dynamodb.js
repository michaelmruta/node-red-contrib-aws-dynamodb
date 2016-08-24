/**
 * Copyright 2015 Natural Intelligence Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Michael Angelo Ruta (2016)
 *
 **/

module.exports = function(RED) {
    "use strict";

    function DynamodbInNode(n){

        RED.nodes.createNode(this,n);
        var node = this;

        var AWS = require('aws-sdk');
        
        if (this.credentials && this.credentials.hasOwnProperty("secret")) {
            AWS.config.update({ accessKeyId:this.credentials.key, 
                                secretAccessKey:this.credentials.secret});
        }

        var Attr = require('dynamodb-data-types').AttributeValue;

        var id = node.id.toString().replace('.','');
        if(!global.globalFunc) global.globalFunc = {};

        // WRAP     json -> dynamo_db
        // UNWRAP   dynamo_db -> Json

        var getValue = function(obj, path){
            for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
                obj = obj[path[i]];
            };
            return obj;
        }

        function setValue(obj, path, value) {
            if (typeof path === "string") {
                var path = path.split('.');
            }
            if(path.length > 1){
                var p=path.shift();
                if(typeof obj[p] == "undefined" || typeof obj[p]!== 'object'){
                     obj[p] = {};
                }
                return setValue(obj[p], path, value);
            }else{
                obj[path[0]] = value;
            }
        }

        AWS.config.region = n.region;
        var dynamodb = new AWS.DynamoDB({apiVersion: n.apiVersion || '2011-12-05'});

        this.on('input', function (msg) {

            var operation = (n.operation) ? n.operation : msg.topic

                msg.params = msg.params ? msg.params : {}
                msg.params.TableName = msg.params.TableName ? msg.params.TableName : n.table;

                if(n.detect && n.json_ddb) {
                    var ddb_obj = Attr.wrap( getValue(msg, n.json_ddb) );
                    setValue(msg, n.json_ddb, ddb_obj);
                }

                dynamodb[operation](msg.params, function (err, data) {
                    if (err) {
                        node.error(err, err.stack);
                        node.status({fill:"red",shape:"dot",text:"Error: see debug log for details."});
                        setTimeout( function() { node.status({}) }, 10000);
                    }
                    else {
                        msg.payload = data

                        if(n.detect && n.ddb_json) {
                            var ddb_obj = Attr.unwrap( getValue(msg, n.ddb_json) );
                            setValue(msg, n.ddb_json, ddb_obj);
                        }

                        node.send(msg);
                    }
                });

        });

        this.on("error", function() {
        });

        this.on("close", function() {
        });
   
    } RED.nodes.registerType("dynamodb-in",DynamodbInNode,{
         credentials: {
             key: {type:"text"},
             secret: {type:"password"}
         }
    });
}
