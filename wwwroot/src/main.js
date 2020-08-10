"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_service_1 = require("./grpc-service");
const signalR = require("@microsoft/signalr");
const service = new grpc_service_1.GrpcService();
const testHub = new signalR.HubConnectionBuilder().withUrl("/testHub").build();
class Stopwatch {
    Start() {
        this.startTime = Date.now();
        this.endTime = null;
    }
    Stop() {
        this.endTime = Date.now();
    }
    GetValue() {
        const d = new Date(this.endTime - this.startTime);
        return `${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}:${d.getMilliseconds().toString().padStart(4, "0")}`;
    }
}
const performTest = async (btn, callback) => {
    const code = btn.nextElementSibling;
    const items = btn.previousElementSibling.getElementsByTagName("input")[0].value;
    const sw = new Stopwatch();
    btn.setAttribute("disabled", "");
    const btnText = btn.innerHTML;
    btn.innerHTML = "working";
    await callback(sw, code, Number(items));
    btn.removeAttribute("disabled");
    btn.innerHTML = btnText;
};
document.querySelector("#rest-get-array").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items) => {
        sw.Start();
        const response = await fetch(`rest-controller/${items}`);
        if (response.ok) {
            const result = await response.json();
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        else {
            e.innerHTML = response.statusText;
        }
    });
});
document.querySelector("#grpc-unary-array").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items) => {
        try {
            sw.Start();
            const result = await service.unaryCall({
                service: "/test.TestProtoService/GetData",
                request: [grpc_service_1.GrpcType.Int32],
                reply: [{ results: [{ id: grpc_service_1.GrpcType.Int32 }, { name: grpc_service_1.GrpcType.String }, { email: grpc_service_1.GrpcType.String }] }]
            }, items);
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#signalr-unary-array").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items) => {
        const result = await testHub.invoke("GetData", items);
    });
});
