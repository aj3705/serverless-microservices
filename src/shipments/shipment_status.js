module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var shipment = context.bindings.shipment;

    if(shipment) {

          context.res = {
        // status: 200, /* Defaults to 200 */
        body: shipment.id +" is "+shipment.status
    };

    }

    else{

         context.res = {
            status: 422,
            body : "shipment doesn't exist",
            headers: {
            'Content-Type': 'application/json'
            }
         };
        
    }
  
}
