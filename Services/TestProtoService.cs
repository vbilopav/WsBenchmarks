using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;

namespace WsBenchmarks.Services
{
    public class TestProtoServiceImpl : TestProtoService.TestProtoServiceBase
    {
        public override Task<GetDataReply> GetData(GetDataRequest request, ServerCallContext context)
        {
            var reply = new GetDataReply();
            reply.Results.Add(TestDataService.TestData.Take(request.Take));
            return Task.FromResult(reply);
        }
    }
}
