using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.SignalR;

namespace WsBenchmarks.Services
{
    public class TestHub : Hub
    {
        public GetDataReply GetData(int take)
        {
            var reply = new GetDataReply();
            reply.Results.Add(TestDataService.TestData.Take(take));
            return reply;
        }
    }
}
