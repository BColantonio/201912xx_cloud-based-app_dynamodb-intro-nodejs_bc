
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */


/**********************************************
 * Query all movies released in a particular year
 * *********************************************/

let AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    //endpoint: "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

let params = {
    TableName : "Movies",
    // ExpressionAttributeNames provides name substitution. You use this because year is a reserved word in Amazon DynamoDB.
    // You can't use it directly in any expression, including KeyConditionExpression. You use the expression attribute name #yr to address this.
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
