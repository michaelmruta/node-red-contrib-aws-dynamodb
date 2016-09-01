node-red-contrib-aws-dynamodb
=================

A <a href="http://nodered.org" target="_new">Node-RED</a> node wrapper for AWS dynamodb.

[![npm version](https://badge.fury.io/js/node-red-contrib-aws-dynamodb.svg)](https://badge.fury.io/js/node-red-contrib-aws-dynamodb)

Install
-------

Run the following command in the root directory of your Node-RED install

npm install node-red-contrib-aws-dynamodb

Sample Workflow
-------

```json
[{"id":"47a9639e.b4490c","type":"inject","z":"db634fd2.36dd1","name":"","topic":"putItem","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":120,"y":180,"wires":[["2d7509de.ac9fc6"]]},{"id":"a03cef53.8a289","type":"dynamodb-in","z":"db634fd2.36dd1","name":"","region":"ap-southeast-1","table":"TBoxDev_PGenome","operation":"putItem","json_ddb":"","ddb_json":"","detect":false,"x":590,"y":180,"wires":[["d1ee4ad2.b8c7e8","7a538752.206588"]]},{"id":"54365a7d.456294","type":"inject","z":"db634fd2.36dd1","name":"","topic":"getItem","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":120,"y":360,"wires":[["38d99b97.663cb4"]]},{"id":"66cfebb6.5adf14","type":"comment","z":"db634fd2.36dd1","name":"PUT ITEM","info":"","x":120,"y":140,"wires":[]},{"id":"5d3eba2d.ddb1b4","type":"comment","z":"db634fd2.36dd1","name":"GET ITEM","info":"","x":120,"y":320,"wires":[]},{"id":"977abae4.9d01c8","type":"inject","z":"db634fd2.36dd1","name":"","topic":"getItem","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":120,"y":420,"wires":[["30ef9dca.f7daa2"]]},{"id":"f5b7f48d.040968","type":"inject","z":"db634fd2.36dd1","name":"","topic":"putItem","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":120,"y":240,"wires":[["a4cc3621.fb1118"]]},{"id":"f51da3c4.290b6","type":"dynamodb-in","z":"db634fd2.36dd1","name":"","region":"ap-southeast-1","table":"TBoxDev_PGenome","operation":"putItem","json_ddb":"params.Item","ddb_json":"params.Item","detect":true,"x":590,"y":240,"wires":[["7a538752.206588","107afed9.485d61"]]},{"id":"a622b8d8.932af8","type":"dynamodb-in","z":"db634fd2.36dd1","name":"","region":"ap-southeast-1","table":"TBoxDev_PGenome","operation":"getItem","json_ddb":"","ddb_json":"","detect":false,"x":590,"y":360,"wires":[["662a7375.7fbe7c","40070ffa.dad9b"]]},{"id":"92e8423.57ca7c","type":"dynamodb-in","z":"db634fd2.36dd1","name":"","region":"ap-southeast-1","table":"TBoxDev_PGenome","operation":"getItem","json_ddb":"params.Key","ddb_json":"payload.Item","detect":true,"x":590,"y":420,"wires":[["40070ffa.dad9b","856ba287.83075"]]},{"id":"2d7509de.ac9fc6","type":"function","z":"db634fd2.36dd1","name":"Don't Detect Types","func":"msg.params = {}\n\nmsg.params.Item = {\n    \"ID\": {\"S\": \"Rizza\"},\n    \"name\" : { \"S\": \"Rizza\"},\n\t\"age\" : { \"N\": \"26\"},\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":290,"y":180,"wires":[["a03cef53.8a289"]]},{"id":"a4cc3621.fb1118","type":"function","z":"db634fd2.36dd1","name":"Detect Types","func":"msg.params = {}\n\nmsg.params.Item = {\n    \"ID\": \"Rizza1\",\n    \"name\" : \"Rizza2\",\n\t\"age\" : 26\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":270,"y":240,"wires":[["f51da3c4.290b6"]]},{"id":"38d99b97.663cb4","type":"function","z":"db634fd2.36dd1","name":"Don't Detect Types","func":"msg.params = {}\n\nmsg.params.Key = {\n      \"HashKeyElement\" : {\n        \"S\" : \"Another\"\n      }\n  }\n\nreturn msg;","outputs":1,"noerr":0,"x":290,"y":360,"wires":[["a622b8d8.932af8"]]},{"id":"30ef9dca.f7daa2","type":"function","z":"db634fd2.36dd1","name":"Detect Types","func":"msg.params = {}\n\nmsg.params.Key = {HashKeyElement:\"Another\"}\n\nreturn msg;","outputs":1,"noerr":0,"x":270,"y":420,"wires":[["92e8423.57ca7c"]]}]
```

License
-------
APACHE LICENSE, VERSION 2.0
