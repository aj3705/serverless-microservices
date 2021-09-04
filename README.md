# <a name="home"> Serverless Microservices - an example implementation

This tutorial provides step by step guidance for implementing an example serverless microservices architecture based on Azure serverless services. The following services are used in this implementation:
- Azure Functions
- Azure Cosmos DB
- Azure Service Bus
- Azure API Management
- Azure Application Insights

## Example scenario

Below is the architecture for the example implementation. 

![example scenario](./images/aj-bikes-architecture.jpg)

0. Customer places an order for bikes on aj bikes website
1. Website sends a create order request to the Azure API Manager (APIM), the Microservices Gateway for aj bikes Microservices
2. APIM sends the create order request to Orders Microservice, which is implemented using Azure Functions. Azure Functions is a per per execution serverless service.
3. Orders Microservice stores the order in the Orders database implemented using Azure Cosmos DB 
4. Orders Microservice enqueues "Order Created" event in the Azure Service bus that is used for Microservices communications. 
5. Order Created Event triggers the Shipment Microservice implemented using Azure Functions
6. Shipment Microservice reads the order data in the Order Created event and creates a Shipment in the Shipments databas implemented using Azure Cosmos DB     
7. Shipment status is provided back to the customer via the APIM gateway.

## Steps:
1. [Create a Resource Group that holds all the services used in this example](#u1)  
2. [Create micro services](#u2)
   - [Create Cosmos DB for Orders Microservice data](#u2a)
   - [Create Service Bus for Microservice communications](#u2b)
   - [Create Function App for Orders Microservice APIs](#u2c)
   - [Create Order Creation Microservice API](#u2d)
   - [Create Cosmos DB for Shipments Microservice APIs](#u2e)
   - [Create Function App for Shipments Microservice APIs](#u2f)
   - [Create Shipment Creation Microservice trigger](#u2g)
   - [Create Shipment Status Microservice API](#u2h)
   - [Create API Management Gateway to front the Microservices](#u2i)
3. [Test your micro services](#u3). 
4. [Further reading](#u4) 

## <a name="u1"> 1. Create the Resource Group

   1. Login to Azure [portal][1] > In the top search bar start typing Resource Group > click on Resource Group
      <img src="./images/rg-create-1.jpeg" width="80%" height="80%" />
     
      
   2. Click on the + Create  at the top left corner
      
      <img src="./images/rg-create-2.jpeg" width="80%" height="80%" />
         
      
   3. Select the subscription you want to use from the drop down > provide the resource group name > Select the region of your choice > click review and create  
   
      <img src="./images/rg-create-3.jpeg" width="50%" height="50%" />
  
         
   4. Click Create.Resource group should be created momentarily. 
   
      <img src="./images/rg-create-4.jpeg" width="50%" height="50%" />
   
[home](#home)                                                                                                           
    
## <a name="u2"> 2. Create micro services

### <a name="u2a"> 2a. Create Cosmos DB for Order Microservice data
   
   1. Login to Azure [portal][1] > In the top search bar start typing Cosmos DB > Select Azure Cosmos DB
      
      <img src="./images/cosmosdb-create-1.jpeg" width="80%" height="50%" />
    
   
   2. Click on the + Create  at the top left corner
      
      <img src="./images/cosmosdb-create-2.jpeg" width="80%" height="50%" />
      
      
   3. Select the Core(SQL) API option  
   
      <img src="./images/cosmosdb-create-3.jpeg" width="50%" height="50%" />
  
         
   4. Provide the required values:
        
      In the default _Basics_ tab, provide the following values:
   
      _Resource Group:_ Select the resource group you created earlier.
   
      _Account Name:_ Enter a globally unique account name:_ajbikes-orders-db_
   
      _Location_: Select a location of your choice
   
      _Capacity mode_: Serverless
   
      <img src="./images/cosmosdb-create-4a.jpeg" width="50%" height="50%" />
         
     
      Click "Backup Policy" tab at the top and slect "Locally-redundant backup storage" for Backup storage redundancy
         
      <img src="./images/cosmosdb-create-4b.jpeg" width="50%" height="50%" />
   
   5. Click Review + Create > Create. Your Cosmos DB account should be created in a few minutes  
     
   6. Once the creation is complete, Go to your resource group and select the Cosmos DB that you just created
      
      Click Data Explorer in the left menu > Click New Container (top left) > Provide the following values:
   
      _Datebase id_: Select _Create new_ > provide a name like _ajbikes-orders-db_
   
      _Container id_: provide a name like _ajbikes-orders-container_
   
      _Partition key_: /id
   
      Leave the rest of the defaults and click OK. 
      
      <img src="./images/cosmosdb-create-6.jpeg" width="50%" height="50%" />
      
      After the container creation you should see an empty container like this:
     
      <img src="./images/cosmosdb-create-7.jpeg" width="50%" height="50%" />

[home](#home)

### <a name="u2b"> 2h. Create Service Bus for Microservice communications
   
   1. Login to Azure [portal][1] > In the top search bar start typing Service Bus > Select Service Bus
              
   
   2. Click on the + Create  at the top left corner
     
        
   3. Provide the required values:
       
      _Resource Group:_ Select the resource group you created earlier.
   
      _Namespace name:_ Enter a globally unique name:ajbikes
   
      _Location_: Select a location of your choice
   
      _Pricing toer_: Standard
   
      Leave other defaults and click Review + Create 
   
      <img src="./images/servicebus-create-1.jpeg" width="50%" height="50%" />
   
    
   4. Click Create. Your Service Bus will be created in a minute or so
   
   5. Go to your Service Bus and click on Queues in the left menu > Click +Queue at the top left
      
      Enter ajbikes-microservice-messsaging in the name field. Accept other defaults and click Create.
      
      <img src="./images/servicebus-create-2.jpeg" width="50%" height="50%" />
      
      Queue will be created in a few seconds.
   
   
### <a name="u2c"> 2b. Create Function App for Orders Microservice APIs
   
   1. Login to Azure [portal][1] > In the top search bar start typing Function App > Select Function App
      
      <img src="./images/function-create-1.jpeg" width="80%" height="50%" />
    
   
   2. Click on the + Create  at the top left corner
     
        
   3. Provide the required values:
       
      _Resource Group:_ Select the resource group you created earlier.
   
      _Function App name:_ Enter a globally unique name:_ajbikes-orders-microservice_
   
      _Location_: Select a location of your choice
   
      _Runtime stack_: Node.js
   
      Leave other defaults and click Review + Create 
   
      <img src="./images/function-create-3.jpeg" width="50%" height="50%" />
   
    
   4. Click Create. Your function will be created in a minute or so
      
      <img src="./images/function-create-3.jpeg" width="50%" height="50%" />
   
   5. Click Create. Your function will be created in a minute or so
      
      <img src="./images/function-create-3.jpeg" width="50%" height="50%" />
   
[home](#home)
   
### <a name="u2d"> 2c. Create Order Creation Microservice
   
   1. In the top search bar start typing Function App > Select Function App
      
      Click Functions >Functions in the left menu > click Create at the top left corner
      
      <img src="./images/order-func-create-1.jpeg" width="80%" height="50%" />
    
   
   2. Select Http trigger > Change the function name to CreateOrder. 
      
      Make sure Development environment is selected to _Develop in portal_
      
      Click Create. This will create the function and open the CreateOrder function page.
   
      <img src="./images/order-func-create-2.jpeg" width="80%" height="50%" />
      
   3. Before we add the Create Order code, we will first bind this function to Orders Cosmos DB, so that this function can read from and write data to Orders Cosmos DB. We will also create an output binding to the Service Bus Message queue that we created earlier.
      
      Click on Integration in left menu. This will open up the Integration page. You will see a pictorial view of the Trigger, Input bindings and Output bindings. 
      
      <img src="./images/order-func-create-3.jpeg" width="80%" height="50%" />
   
      **Click Inputs > Add input ** 
      
      Select Azure Cosmos DB from the Binding Type drop down.**
      
      Click on New under the Cosmos DB account connection drop down > select Azure Cosmos DB Account radio button 
     
      Select the ajbikes-orders-db Cosmos database you created earlier > Click OK
      
      <img src="./images/order-func-create-5.jpeg" width="80%" height="50%" />
      
      Provide the following values and click OK:  
      
      Document parameter name: order
      Database name: ajbikes-orders-db (name of the orders cosmos db you created earlier)
      Collection name: ajbikes-orders-container (name of the container you created earlier)
      Document ID : {id}
      Partition key : {id}
      
      <img src="./images/order-func-create-6.jpeg" width="80%" height="50%" />
   
     **Click Outputs > Add Outputs ** 
      
      Provide the following values and click OK:
      Binding type : Azure Cosmos DB.
      Cosmos DB account connection: this will be prepopulated to the connection you created in the earlier step. Leave it as is
      Document parameter name : neworder
      Datebase name: ajbikes-orders-db
      Collection name: ajbikes-orders-container
      partition key: /id
      
      
      
        
   4. Provide the required values:
       
      _Resource Group:_ Select the resource group you created earlier.
   
      _Function App name:_ Enter a globally unique name:_ajbikes-orders-microservice_
   
      _Location_: Select a location of your choice
   
      _Runtime stack_: Node.js
   
      Leave other defaults and click Review + Create 
   
      <img src="./images/function-create-3.jpeg" width="50%" height="50%" />
   
    
   4. Click Create. Your function will be created in a minute or so
      
      <img src="./images/function-create-3.jpeg" width="50%" height="50%" />
   
   5. Click Create. Your function will be created in a minute or so
      
      <img src="./images/function-create-3.jpeg" width="50%" height="50%" />

[home](#home)
   
### <a name="u2e"> 2d. Create Cosmos DB for Shipments Microservice data
   
   Repeat the same steps you used in section [2a](#u2a)
 
### <a name="u2e"> 2e. Create Function App for Shipments Microservice APIs
   
   Repeat the same steps you used in section [2b](#u2b)  
   
### <a name="u2g"> 2f. Create Shipment Creation Microservice

[home](#home)
### <a name="u2h"> 2g. Create Shipment Status Microservice

[home](#home)

        
   
### <a name="u2i"> 2i. Create API Management Gateway to front the Microservices
 
[home](#home)
## <a name="u3"> 3. Test your micro services
   
   Follow the steps under **Run the sample** section in the [Azure DevOps OAuth sample app documentation][6] on github to obtain access and refresh tokens. Securely save these values. **You should keep these values secret.** 
[home](#home)
## <a name="u4"> 4. Further reading
   
   OAuth access tokens have an expiry time. Follow the steps [here][7] to get a new token before your access token expires. This tutorial shows how to refresh your token using Postman, however you will typically automate this in your application code.

**Next:** [Invoke Azure DevOps REST API with access token to create work items in Azure DevOps Boards.][8]

[Go to beginning of this tutorial][8]











[1]:https://portal.azure.com


