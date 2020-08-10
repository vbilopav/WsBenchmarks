using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WsBenchmarks.Services
{

    [Route("rest-controller")]
    [ApiController]
    public class RestController : ControllerBase
    {

        [HttpGet("{take}")]
        public GetDataReply Get(int take)
        {
            var reply = new GetDataReply();
            reply.Results.Add(TestDataService.TestData.Take(take));
            return reply;
        }
    }
}
