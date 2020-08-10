using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;

namespace WsBenchmarks.Services
{
    public class TestProtoServiceImpl : TestProtoService.TestProtoServiceBase
    {
        private readonly ILogger<TestProtoServiceImpl> _logger;

        public TestProtoServiceImpl(ILogger<TestProtoServiceImpl> logger)
        {
            _logger = logger;
        }

        public override Task<GetDataReply> GetData(GetDataRequest request, ServerCallContext context)
        {
            var reply = new GetDataReply();
            reply.Results.Add(TestDataService.TestData.Take(request.Take));
            return Task.FromResult(reply);
        }

        public override Task<PostDataReply> PostData(PostDataRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Length {request.Content.Length}");
            return Task.FromResult(new PostDataReply());
        }

        public override async Task StreamTest(GetDataRequest request, IServerStreamWriter<Data> responseStream, ServerCallContext context)
        {
            foreach (var data in TestDataService.TestData.Take(request.Take))
            {
                await responseStream.WriteAsync(data);
            }
        }
    }
}
