using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WsBenchmarks.Services
{

    [Route("rest-controller")]
    [ApiController]
    public class RestController : ControllerBase
    {
        private readonly ILogger<RestController> _logger;

        public RestController(ILogger<RestController> logger)
        {
            _logger = logger;
        }


        [HttpGet("{take}")]
        public GetDataReply Get(int take)
        {
            var reply = new GetDataReply();
            reply.Results.Add(TestDataService.TestData.Take(take));
            return reply;
        }

        [HttpPost]
        public async Task Post()
        {
            using var reader = new StreamReader(Request.Body, Encoding.UTF8);
            var content = await reader.ReadToEndAsync();
            _logger.LogInformation($"Length {content.Length}");
        }
    }
}
