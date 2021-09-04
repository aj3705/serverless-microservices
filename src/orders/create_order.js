module.exports = function (context, req) {

context.log("entering ..");
    var order = context.bindings.order;
    context.log("order already exists, order id: "+order.id);
    
    if(order){
       
            context.res = {
            status: 422,
            body : "order already exists.",
            headers: {
            'Content-Type': 'application/json'
            }
        };
    }
    
    else {
        context.log("order not found, creating");
        // Create a JSON string of our bookmark.
        var orderString = JSON.stringify({ 
            id: req.body.id,
            name: req.body.name,
            quantity: req.body.quantity,
            status:req.body.status

        });

        context.log("creating order "+orderString);

        // Write this bookmark to our database.
        context.bindings.neworder = orderString;

        //enqueue message for shipment service
        context.bindings.outputSbMsg = orderString;


        // Tell the user all is well.
        context.res = {
            status: 200,
            body : "order created successfully!",
            headers: {
            'Content-Type': 'application/json'
            }
        };
    }
    context.done();
};
