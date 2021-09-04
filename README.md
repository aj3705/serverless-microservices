# Serverless Microservices - an example implementation

This tutorial provides step by step guidance for implementing an example serverless microservices architecture based on Azure serverless services. The following services are used in this implementation:
- Azure Functions
- Azure Cosmos DB
- Azure Service Bus
- Azure API Management
- Azure Application Insights

## Example scenario

Below is the architecture for the example implementation. 

![example scenario](./images/aj-bikes-architecture.jpg)

## Steps:
1. [Create a Resource Group that holds all the services used in this example](#u1)  
2. [Create micro services](#u2)
   - [Create Cosmos DB for Orders Microservice data](#u2a)
   - [Create Function App for Orders Microservice APIs](#u2b)
   - [Create Cosmos DB for Shipments Microservice APIs](#u2c)
   - [Create Function App for Shipments Microservice APIs](#u2d)
   - [Create Service Bus for Microservice communications](#u2e)
   - [Create API Management Gateway to front the Microservices](#u2f)
3. [Test your micro services](#u3). 
4. [Further reading](#u4) 

## <a name="u1"> 1. Create the Resource Group

   1. Login to Azure [portal][1] > In the top search bar start typing Resource Group > click on Resource Group
      <img src="./images/rg-create-1.jpeg" width="80%" height="80%" />
     
      ```
  
   2. Click on the + Create  at the top left corner
      
      <img src="./images/rg-create-2.jpeg" width="80%" height="80%" />
      
      ```
   
      
   3. Select the subscription you want to use from the drop down > provide the resource group name > Select the region of your choice > click review and create  
   
      <img src="./images/rg-create-3.jpeg" width="50%" height="50%" />
  
      ```
   
   4. Click Create.Resource group should be created momentarily. 
   
      <img src="./images/rg-create-4.jpeg" width="50%" height="50%" />
      
       ```

## <a name="u2"> 2. Create micro services

### <a name="u2a"> 2a. Create Cosmos DB for Order Microservice data
   
   1. Login to Azure [portal][1] > In the top search bar start typing Cosmos DB > Select Azure Cosmos DB
      
      <img src="./images/cosmosdb-create-1.jpeg" width="80%" height="60%" />
     
      ```
  
   2. Click on the + Create  at the top left corner
      
      <img src="./images/cosmosdb-create-2.jpeg" width="80%" height="60%" />
      
      ```
   
      
   3. Select the Core(SQL) API option  
   
      <img src="./images/cosmosdb-create-3.jpeg" width="50%" height="50%" />
  
      ```
   
   4. Provide the required values:
        
      In the default _Basics_ tab, provide the following values
      _Resource Group:_ Select the resource group you created earlier.
      _Account Name:_ Enter a globally unique account name:_ajbikes-orders-db_
      _Location_: Select a location of your choice
      _Capacity mode_: Serverless
   
      <img src="./images/cosmosdb-create-4a.jpeg" width="50%" height="50%" />
      
      ```
      Click "Backup Policy" tab at the top and slect "Locally-redundant backup storage" for _Backup storage redundancy_
      
   
      <img src="./images/cosmosdb-create-4b.jpeg" width="50%" height="50%" />
      
      ```
   5. Click Review + Create > Create. Your Cosmos DB account should be created in a few minutes  
   
      <img src="./images/cosmosdb-create-5.jpeg" width="50%" height="50%" />
  
      ```
   6. Once the creation is complete, Go to your resource group and select the Cosmos DB that you just created
      
      Click _Data Explorer_ in the left menu > Click New Container (top left) > Provide the following values
      _Datebase id_: Select _Create new_ > provide a name like _ajbikes-orders-db_
      _Container id_: provide a name like _ajbikes-orders-container_
      _Partition key_: /id
      Leave the rest of the defaults and click OK. 
      
      <img src="./images/cosmosdb-create-6.jpeg" width="50%" height="50%" />
      
      After the container creation you should see an empty container like this:
     
      <img src="./images/cosmosdb-create-7.jpeg" width="50%" height="50%" />
   
### <a name="u2b"> 2b. Create Function App for Orders Microservice APIs

### <a name="u2c"> 2c. Create Cosmos DB for Shipments Microservice data
 
### <a name="u2d"> 2d. Create Function App for Shipments Microservice APIs
     
### <a name="u2e"> 2e. Create Service Bus for Microservice communications
   
### <a name="u2f"> 2f. Create API Management Gateway to front the Microservices
 

## <a name="u3"> 3. Test your micro services
   
   Follow the steps under **Run the sample** section in the [Azure DevOps OAuth sample app documentation][6] on github to obtain access and refresh tokens. Securely save these values. **You should keep these values secret.** 

## <a name="u4"> 4. Further reading
   
   OAuth access tokens have an expiry time. Follow the steps [here][7] to get a new token before your access token expires. This tutorial shows how to refresh your token using Postman, however you will typically automate this in your application code.

**Next:** [Invoke Azure DevOps REST API with access token to create work items in Azure DevOps Boards.][8]

[Go to beginning of this tutorial][8]











[1]:https://portal.azure.com


