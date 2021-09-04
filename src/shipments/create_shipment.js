module.exports = async function(context, mySbMsg) {
    
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);
    context.log('Message =', context.bindings.mySbMsg);
    context.log('orderid =', context.bindings.mySbMsg.id);

      var shipmentString = JSON.stringify({ 
            id: "shipment"+context.bindings.mySbMsg.id,
            orderid:context.bindings.mySbMsg.id,
            status:"processing"

        });
    context.log("creating shipment: "+shipmentString);

    //write shipment
    context.bindings.newshipment=shipmentString;

    context.done();
};
