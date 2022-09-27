using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using System.Text;
using Microsoft.Identity.Client;
using System;

namespace MenuConsoleApp
{
    public static class GetMenu
    {
        [FunctionName("GetMenu")]

        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");


            var CONNECTION_STRING = Environment.GetEnvironmentVariable("AZURE_CONN_STRING");

            const string BLOB_CONTAINER = "$web";
            string jsonFile = "adaptmenu.json";
            var blobClient = new BlobClient(CONNECTION_STRING, BLOB_CONTAINER, jsonFile);
            var content = await blobClient.OpenReadAsync();
            StreamReader reader = new StreamReader(content);
            string jsonString = reader.ReadToEnd();



            return new OkObjectResult(jsonString);
        }
    }
}
