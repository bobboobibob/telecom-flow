let body = $response.body;
let headers = $response.headers;
let args = $argument;
let user_agent = args.user_agent || "ChinaTelecomApp/5.0";

// 增强伪装，添加更多电信标识
headers["X-Telecom-Service"] = "FreeFlow";
headers["User-Agent"] = user_agent;
headers["X-CT-Client"] = "CTClient/6.0";
headers["X-Telecom-Token"] = "FreeFlowToken"; // 模拟电信服务标记

// 示例：修改响应内容
body = body.replace(/ads=true/g, "ads=false");

$done({ body, headers });
