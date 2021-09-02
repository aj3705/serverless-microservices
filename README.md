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
2. [Create Azure Function Apps for Order and Shipment micro services](#u2) 
3. [Get Azure DevOps REST API access token using your application](#u3). 
4. [Learn how to refresh the access token using a refresh token](#u4) 

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

## <a name="u2">  Create your ASP .NET application for getting OAuth access token and deploy it to Azure App Service Web Apps

 1. Clone or download the repo, [microsoft/azure-devops-auth-samples][3] from github.  

       ![clone repo](./images/clone-repo.PNG)
       
 2. Follow steps 2-5 in the [Azure DevOps OAuth sample app documentation][6] on github.

## <a name="u3">  Authorize your web application and get access token
   
   Follow the steps under **Run the sample** section in the [Azure DevOps OAuth sample app documentation][6] on github to obtain access and refresh tokens. Securely save these values. **You should keep these values secret.** 

## <a name="u4">  Refresh your access token as needed
   
   OAuth access tokens have an expiry time. Follow the steps [here][7] to get a new token before your access token expires. This tutorial shows how to refresh your token using Postman, however you will typically automate this in your application code.

**Next:** [Invoke Azure DevOps REST API with access token to create work items in Azure DevOps Boards.][8]

[Go to beginning of this tutorial][8]











[1]:https://portal.azure.com


