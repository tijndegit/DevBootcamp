using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Data.Tables;
using System;
using Azure;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using System.Text;


namespace MenuConsoleApp
{
    public static class PostOrder
    {
        [FunctionName("Order")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequest req,
            ILogger log)
        {
            // Create table connection
            var CONNECTION_STRING = Environment.GetEnvironmentVariable("AZURE_CONN_STRING");
            TableServiceClient tableServiceClient = new TableServiceClient(CONNECTION_STRING);
            BlobServiceClient blobServiceClient = new BlobServiceClient(CONNECTION_STRING);

            // Request variable totalPrice.
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);


            // Create table 'Orders'. Create a new one if it does not exist yet.
            TableClient tableClient = tableServiceClient.GetTableClient(
                tableName: "Orders"
                );
            await tableClient.CreateIfNotExistsAsync();

            string namedID = Guid.NewGuid().ToString();
            string blob_file = $"{namedID}.json";

            // Write a row.
            var order1 = new Order()
            {
                RowKey = namedID,
                PartitionKey = "Order",
                Timestamp = DateTime.Now,
                Status = "Processed",
                Price = data?.totalPrice
            };
            // Add the row to the table.
            await tableClient.AddEntityAsync<Order>(order1);


            // Store the content of the order in a BlobStorage.
            var filename = namedID;
            byte[] byteArray = Encoding.ASCII.GetBytes(requestBody);
            MemoryStream stream = new MemoryStream(byteArray);
            Azure.Storage.Blobs.BlobClient blobClient = new Azure.Storage.Blobs.BlobClient(
            connectionString: CONNECTION_STRING,
            blobContainerName: "order-contents",
            blobName: blob_file);

            // upload the file
            blobClient.Upload(stream);

            bool succeeded = new BlobClient(CONNECTION_STRING, "order-contents", blob_file).Exists();

            if (succeeded)
            {
                return new OkObjectResult($"Order confirmed and processed. Please refer to the bottom of the screen for your payment of {data?.totalPrice} euro.");
            } else
            {
                return new ObjectResult("Failed to confirm and process order due to connections to the database. Please try again later.");
            }
        }
    }


    public record Order : ITableEntity
    {
        public string RowKey { get; set; } = default!;
        public string PartitionKey { get; set; } = default!;
        public DateTimeOffset? Timestamp { get; set; } = default!;
        public string Status { get; set; } = default!;
        public double Price { get; set; } = default!;
        public ETag ETag { get; set; } = default!;
    }
}