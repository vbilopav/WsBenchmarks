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
        return `${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}.${d.getMilliseconds().toString().padStart(4, "0")}`;
    }
}
const performTest = async (btn, callback) => {
    const code = btn.nextElementSibling;
    let items;
    let calls;
    let e = btn.parentElement.getElementsByClassName("items")[0];
    if (e) {
        items = Number(e.value);
    }
    e = btn.parentElement.getElementsByClassName("calls")[0];
    if (e) {
        calls = Number(e.value);
    }
    const sw = new Stopwatch();
    btn.setAttribute("disabled", "");
    const btnText = btn.innerHTML;
    btn.innerHTML = "working";
    await callback(sw, code, items, calls);
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
document.querySelector("#signalr-invoke-array").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items) => {
        if (testHub.state != signalR.HubConnectionState.Connected) {
            await testHub.start();
        }
        try {
            sw.Start();
            const result = await testHub.invoke("GetData", items);
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#rest-parallel-get").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items, calls) => {
        const promises = new Array();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const response = await fetch(`rest-controller/${items}`);
                if (response.ok) {
                    const result = await response.json();
                }
                else {
                    throw response;
                }
            });
        }
        try {
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#grpc-parallel-unary").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items, calls) => {
        const promises = new Array();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const result = await service.unaryCall({
                    service: "/test.TestProtoService/GetData",
                    request: [grpc_service_1.GrpcType.Int32],
                    reply: [{ results: [{ id: grpc_service_1.GrpcType.Int32 }, { name: grpc_service_1.GrpcType.String }, { email: grpc_service_1.GrpcType.String }] }]
                }, items);
            });
        }
        try {
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#signalr-parallel-invoke").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items, calls) => {
        if (testHub.state != signalR.HubConnectionState.Connected) {
            await testHub.start();
        }
        const promises = new Array();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const result = await testHub.invoke("GetData", items);
            });
        }
        try {
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#rest-post-content").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items) => {
        const content = "x".repeat(items);
        sw.Start();
        const response = await fetch(`rest-controller`, { method: "POST", body: content, headers: { type: "text/plain" } });
        if (response.ok) {
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        else {
            e.innerHTML = response.statusText;
        }
    });
});
document.querySelector("#grpc-send-content").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items) => {
        const content = "x".repeat(items);
        try {
            sw.Start();
            const result = await service.unaryCall({
                service: "/test.TestProtoService/PostData",
                request: [grpc_service_1.GrpcType.String],
                reply: []
            }, content);
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#signalr-send-content").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items) => {
        if (testHub.state != signalR.HubConnectionState.Connected) {
            await testHub.start();
        }
        const content = "x".repeat(items);
        try {
            sw.Start();
            const result = await testHub.send("PostData", content);
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#rest-post-parallel").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items, calls) => {
        const content = "x".repeat(items);
        const promises = new Array();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const response = await fetch(`rest-controller`, { method: "POST", body: content, headers: { type: "text/plain" } });
            });
        }
        try {
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#grpc-send-parallel").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items, calls) => {
        const content = "x".repeat(items);
        const promises = new Array();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const result = await service.unaryCall({
                    service: "/test.TestProtoService/PostData",
                    request: [grpc_service_1.GrpcType.String],
                    reply: []
                }, content);
            });
        }
        try {
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#signalr-send-parallel").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, async (sw, e, items, calls) => {
        if (testHub.state != signalR.HubConnectionState.Connected) {
            await testHub.start();
        }
        const content = "x".repeat(items);
        const promises = new Array();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const result = await testHub.send("PostData", content);
            });
        }
        try {
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        }
        catch (error) {
            e.innerHTML = error.message;
        }
    });
});
document.querySelector("#grpc-streaming").addEventListener("click", async (e) => {
    await performTest(e.currentTarget, (sw, e, items) => new Promise((resolve, reject) => {
        sw.Start();
        const stream = service.serverStreaming({
            service: "/test.TestProtoService/StreamTest",
            request: [grpc_service_1.GrpcType.Int32],
            reply: [{ id: grpc_service_1.GrpcType.Int32 }, { name: grpc_service_1.GrpcType.String }, { email: grpc_service_1.GrpcType.String }]
        }, items);
        stream
            .on("error", error => {
            e.innerHTML = error.message;
            resolve();
        })
            .on("status", status => { })
            .on("data", data => {
        })
            .on("end", () => {
            sw.Stop();
            e.innerHTML = sw.GetValue();
            resolve();
        });
    }));
});
document.querySelector("#signalr-streaming").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    if (testHub.state != signalR.HubConnectionState.Connected) {
        await testHub.start();
    }
    await performTest(btn, (sw, e, items) => new Promise((resolve, reject) => {
        sw.Start();
        testHub.stream("StreamData", items).subscribe({
            error: error => {
                e.innerHTML = error.message;
                resolve();
            },
            next: item => {
            },
            complete: () => {
                sw.Stop();
                e.innerHTML = sw.GetValue();
                resolve();
            }
        });
    }));
});
