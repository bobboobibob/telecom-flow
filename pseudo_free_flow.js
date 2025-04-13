let body = $response.body;
let headers = $response.headers;
let args = $argument;
let user_agent = args.user_agent || "ChinaTelecomApp/5.0";

// 伪装为电信免流服务（参考 sooyaaabo/Loon 的伪装逻辑）
headers["X-Telecom-Service"] = "FreeFlow";
headers["User-Agent"] = user_agent;
headers["X-CT-Client"] = "CTClient/6.0"; // 增加电信客户端标记

// 示例：修改响应内容
body = body.replace(/ads=true/g, "ads=false");

$done({ body, headers });
