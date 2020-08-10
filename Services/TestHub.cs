using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace WsBenchmarks.Services
{
    public class TestHub : Hub
    {
        private readonly ILogger<TestHub> _logger;

        public TestHub(ILogger<TestHub> logger)
        {
            _logger = logger;
        }

        public GetDataReply GetData(int take)
        {
            var reply = new GetDataReply();
            reply.Results.Add(TestDataService.TestData.Take(take));
            return reply;
        }

        public void PostData(string content)
        {
            _logger.LogInformation($"Length {content.Length}");
        }

        public async IAsyncEnumerable<Data> StreamData(int take)
        {
            foreach (var data in TestDataService.TestData.Take(take))
            {
                yield return data;
            }
        }
    }
}
