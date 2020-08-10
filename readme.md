# Performance tests between REST, gRPC-Web and SignalR from browser

## 1. Test fetching simple structure from server

Services are returning object with following signature: 

```javascript
{
    results: [
        {
            id: number, 
            name: string, 
            email: string
            }, 
            ...
        }
    ]
```

Test calls are turning results array with 100.000 items.

Results:

|#|REST|gRPC-Web|SignalR|
|---|---|---|---|
| 1 | 00:00.0195 | 00:00.0708 | 00:00.0159 |
| 2 | 00:00.0178 | 00:00.0648 | 00:00.0185 |
| 3 | 00:00.0161 | 00:00.0610 | 00:00.0170 |
| 4 | 00:00.0144 | 00:00.0624 | 00:00.0173 |
| 5 | 00:00.0154 | 00:00.0586 | 00:00.0215 |
| 6 | 00:00.0144 | 00:00.0600 | 00:00.0178 |
| 7 | 00:00.0149 | 00:00.0602 | 00:00.0173 |
| 8 | 00:00.0161 | 00:00.0606 | 00:00.0177 |
| 9 | 00:00.0153 | 00:00.0573 | 00:00.0162 |
| 10 | 00:00.0139 | 00:00.0624 | 00:00.0160 |
| AVG | **00:00.01578** | **00:00.06181** | **00:00.01752** |

Winner is REST.

## 2. Parallel data fetching

Services are returning same structure as in previous test, but only with 10 items in array in 1000 parallel calls.

|#|REST|gRPC-Web|SignalR|
|---|---|---|---|
| 1 | 00:01.0123 | 00:01.0114 | 00:00.0067 |
| 2 | 00:01.0178 | 00:01.0127 | 00:00.0069 |
| 3 | 00:01.0151 | 00:01.0116 | 00:00.0075 |
| 4 | 00:01.0367 | 00:01.0200 | 00:00.0067 |
| 5 | 00:01.0200 | 00:01.0205 | 00:00.0095 |
| 6 | 00:01.0231 | 00:01.0243 | 00:00.0078 |
| 7 | 00:01.0191 | 00:01.0070 | 00:00.0106 |
| 8 | 00:01.0166 | 00:01.0110 | 00:00.0081 |
| 9 | 00:01.0195 | 00:01.0280 | 00:00.0073 |
| 10 | 00:01.0163 | 00:01.0175 | 00:00.0079 |
| AVG | **00:01.01965** | **00:01.0164** | **00:00.0079** |

Absolute winner is SignalR.

gRPC-Web is slightly faster then the REST. With more parallel calls gRPC-Web should be more faster.

## 3. Sending a big string content to service

In this tests, browser is sending string with length of 4194299 characters to the services. 4194299 characters is the configured upper limit for the gRPC-Web.

|#|REST|gRPC-Web|SignalR|
|---|---|---|---|
| 1 | 00:00.0083 | 00:00.0693 | 00:00.0042 |
| 2 | 00:00.0057 | 00:00.0605 | 00:00.0040 |
| 3 | 00:00.0062 | 00:00.0664 | 00:00.0046 |
| 4 | 00:00.0056 | 00:00.0607 | 00:00.0054 |
| 5 | 00:00.0077 | 00:00.0588 | 00:00.0053 |
| 6 | 00:00.0052 | 00:00.0660 | 00:00.0046 |
| 7 | 00:00.0053 | 00:00.0618 | 00:00.0051 |
| 8 | 00:00.0065 | 00:00.0609 | 00:00.0037 |
| 9 | 00:00.0059 | 00:00.0535 | 00:00.0042 |
| 10 | 00:00.0047 | 00:00.0732 | 00:00.0040 |
| AVG | **00:00.00611** | **00:00.06311** | **00:00.004444** |

gRPC-Web clearly is not suitable for these type of requests.

Again, SignalR is the fastest option, but, probably because SignalR `send` method does not wait for service method to completely finish, it resolves on method invocation.

If that doesn't fit the requirements, REST might be the best option.

## 4. Sending a big string content to a service in parallel

This test will send 10000 characters string to a server in 1000 parallel calls.

|#|REST|gRPC-Web|SignalR|
|---|---|---|---|
| 1 | 00:01.0021 | 00:01.0811 | 00:00.0073 |
| 2 | 00:01.0033 | 00:01.0551 | 00:00.0087 |
| 3 | 00:01.0058 | 00:01.0514 | 00:00.0084 |
| 4 | 00:01.0013 | 00:01.0597 | 00:00.0089 |
| 5 | 00:01.0039 | 00:01.0602 | 00:00.0087 |
| 6 | 00:01.0112 | 00:01.0513 | 00:00.0070 |
| 7 | 00:01.0005 | 00:01.0486 | 00:00.0085 |
| 8 | 00:01.0061 | 00:01.0690 | 00:00.0116 |
| 9 | 00:01.0019 | 00:01.0531 | 00:00.0079 |
| 10 | 00:01.0054 | 00:01.0420 | 00:00.0080 |
| AVG | **00:01.00415** | **00:01.05715** | **00:00.0085** |

Again, SignalR is the fastest probably due the fact SignalR `send` method resolves on method invocation invocation.

gRPC-Web and REST are similar because gRPC-Web is generally faster when the is more parallel calls, and single REST call is faster then gRPC-Web.

If service that resolves on method invocation invocation fits the requirements, SignalR would be best choice, otherwise, I'd go with the REST, but that depends on server traffic load.

## 5. Data streaming

Streaming 100000 data items (same structure from test 1.). REST is unavailable because streaming is unsupported.

|#|gRPC-Web|SignalR|
|---|---|---|
| 1 | 00:00.0805 | 00:08.0545 |
| 2 | 00:00.0752 | 00:07.0793 |
| 3 | 00:00.0816 | 00:08.0195 |
| 4 | 00:00.0798 | 00:07.0386 |
| 5 | 00:00.0786 | 00:09.0335 |
| 6 | 00:00.0814 | 00:09.0530 |
| 7 | 00:00.0758 | 00:09.0634 |
| 8 | 00:00.0786 | 00:08.0612 |
| 9 | 00:00.0820 | 00:09.0157 |
| 10 | 00:00.0791 | 00:10.0480 |
| AVG | **00:00.07926** | **00:08.44667** |

gRPC-Web streaming absolutely knocked out of the park, it's a firehose from server, up to 10 times faster then SignalR.

For streaming from server to browser, gRPC-Web should be first choice.