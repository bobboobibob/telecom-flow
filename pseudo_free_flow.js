let headers = $response.headers;
let args = $argument;
let user_agent = args.user_agent || "ChinaTelecomApp/5.0";

// 添加调试日志
$notification.post("伪装脚本运行", "修改响应", "User-Agent: " + user_agent);

// 增强伪装
headers["X-Telecom-Service"] = "FreeFlow";
headers["X-Telecom-Flow"] = "Exempt"; // 增加电信免流标识
headers["User-Agent"] = user_agent;
headers["X-CT-Client"] = "CTClient/6.0";
headers["X-Telecom-Token"] = "FreeFlowToken";

// 检查 body 是否存在
let body = $response.body;
if (body) {
    body = body.replace(/ads=true/g, "ads=false");
    $done({ body, headers });
} else {
    $done({ headers });
}
