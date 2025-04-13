let body = $response.body;
let headers = $response.headers;
let args = $argument;
let user_agent = args.user_agent || "ChinaTelecomApp/5.0";

// 添加调试日志
$notification.post("伪装脚本运行", "修改响应", "User-Agent: " + user_agent);

headers["X-Telecom-Service"] = "FreeFlow";
headers["User-Agent"] = user_agent;
headers["X-CT-Client"] = "CTClient/6.0";
headers["X-Telecom-Token"] = "FreeFlowToken";

body = body.replace(/ads=true/g, "ads=false");

$done({ body, headers });
