using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AuthApi.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AuthApi.Controllers
{
    public class AuthController : ApiController
    {

        public async Task<HttpResponseMessage> PostData(AuthCode code)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "1d177466f1f347f8a061e3b61dabf4e8");
            HttpResponseMessage response = await client.PostAsJsonAsync("https://rsieh-dev.azure-api.net/interview/verify-2fa", code);
            Console.WriteLine(response);
            var responseString = await response.Content.ReadAsStringAsync();
            var data = (JObject)JsonConvert.DeserializeObject(responseString);
            try
            {
                if ((int)response.StatusCode == 200)
                {
                    var successMessage = data["success"];
                    return Request.CreateResponse(HttpStatusCode.OK, "Success!");
                }
                else if ((int)response.StatusCode == 400)
                {
                    var ErrorData = data["errors"];
                    var error = ErrorData["Code"];
                    return Request.CreateResponse(HttpStatusCode.BadRequest, error);
                }
                else if ((int)response.StatusCode == 401 || (int)response.StatusCode == 403)
                {
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, "The Ocp-Apim-Subscription-Key is invalid or missing");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, responseString);
                }
            }
            catch(HttpRequestException e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }

        }
    }
}
