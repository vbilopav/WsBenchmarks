﻿import { GrpcService, GrpcType } from "./grpc-service";
import * as signalR from "@microsoft/signalr";

const service = new GrpcService();
const testHub = new signalR.HubConnectionBuilder().withUrl("/testHub").build();

class Stopwatch {
    private startTime: number;
    private endTime: number;

    public Start() {
        this.startTime = Date.now();
        this.endTime = null;
    }

    public Stop() {
        this.endTime = Date.now();
    }

    public GetValue() {
        const d = new Date(this.endTime - this.startTime);
        return `${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}:${d.getMilliseconds().toString().padStart(4, "0")}`;
    }
}

const performTest = async (btn: Element, callback: (sw: Stopwatch, e: Element, items: number, calls?: number)=>Promise<void>) => {
    const code = btn.nextElementSibling;
    let items: number;
    let calls: number;
    let e = btn.parentElement.getElementsByClassName("items")[0];
    if (e) {
        items = Number((e as HTMLInputElement).value);
    }
    e = btn.parentElement.getElementsByClassName("calls")[0];
    if (e) {
        calls = Number((e as HTMLInputElement).value);
    }
    const sw = new Stopwatch();
    (btn as any).setAttribute("disabled", "");
    const btnText = btn.innerHTML;
    btn.innerHTML = "working";
    await callback(sw, code, items, calls);
    (btn as any).removeAttribute("disabled");
    btn.innerHTML = btnText;
}

document.querySelector("#rest-get-array").addEventListener("click", async e => {
    await performTest((e.currentTarget as Element), async (sw, e, items) => {
        sw.Start();
        const response = await fetch(`rest-controller/${items}`);
        if (response.ok) {
            const result = await response.json();
            sw.Stop();
            e.innerHTML = sw.GetValue();
        } else {
            e.innerHTML = response.statusText;
        }
    });
});

document.querySelector("#grpc-unary-array").addEventListener("click", async e => {
    await performTest((e.currentTarget as Element), async (sw, e, items) => {
        try {
            sw.Start();
            const result = await service.unaryCall({
                service: "/test.TestProtoService/GetData",
                request: [GrpcType.Int32],
                reply: [{results: [{id: GrpcType.Int32}, {name: GrpcType.String}, {email: GrpcType.String}]}]
            }, items);
            sw.Stop();
            e.innerHTML = sw.GetValue();
        } catch (error) {
            e.innerHTML = error.message;
        } 
    })
});


document.querySelector("#signalr-invoke-array").addEventListener("click", async e => {
    await performTest((e.currentTarget as Element), async (sw, e, items) => {
        if (testHub.state != signalR.HubConnectionState.Connected) {
            await testHub.start();
        }
        try{ 
            sw.Start();
            const result = await testHub.invoke("GetData", items);
            sw.Stop();
            e.innerHTML = sw.GetValue();
        } catch (error) {
            e.innerHTML = error.message;
        } 
    })
});

document.querySelector("#rest-parallel-get").addEventListener("click", async e => {
    await performTest((e.currentTarget as Element), async (sw, e, items, calls) => {
        const promises = new Array<() => Promise<void>>();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const response = await fetch(`rest-controller/${items}`);
                if (response.ok) {
                    const result = await response.json();
                } else {
                    throw response;
                }
            })
        }
        try{ 
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        } catch (error) {
            e.innerHTML = error.message;
        } 
    });
});


document.querySelector("#grpc-parallel-unary").addEventListener("click", async e => {
    await performTest((e.currentTarget as Element), async (sw, e, items, calls) => {
        const promises = new Array<() => Promise<void>>();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const result = await service.unaryCall({
                    service: "/test.TestProtoService/GetData",
                    request: [GrpcType.Int32],
                    reply: [{results: [{id: GrpcType.Int32}, {name: GrpcType.String}, {email: GrpcType.String}]}]
                }, items);
            })
        }
        try{ 
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        } catch (error) {
            e.innerHTML = error.message;
        } 
    });
});


document.querySelector("#signalr-parallel-invoke").addEventListener("click", async e => {
    await performTest((e.currentTarget as Element), async (sw, e, items, calls) => {
        if (testHub.state != signalR.HubConnectionState.Connected) {
            await testHub.start();
        }
        const promises = new Array<() => Promise<void>>();
        for (let i = 0; i < calls; i++) {
            promises.push(async () => {
                const result = await testHub.invoke("GetData", items);
            })
        }
        try{ 
            sw.Start();
            await Promise.all(promises.map(p => p()));
            sw.Stop();
            e.innerHTML = sw.GetValue();
        } catch (error) {
            e.innerHTML = error.message;
        } 
    });
});