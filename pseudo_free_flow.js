let headers = $response.headers;
let args = $argument;

// 跳过视频请求的伪装头修改
if ($request.url.includes("/emby/Videos")) {
    $done({ headers });
}

// 添加调试日志
$notification.post("伪装脚本运行", "修改响应", "X-Telecom-Service: FreeFlow");

// 仅添加轻量伪装头
headers["X-Telecom-Service"] = "FreeFlow";
headers["X-Telecom-Flow"] = "Exempt";

// 检查 body 是否存在
let body = $response.body;
if (body) {
    body = body.replace(/ads=true/g, "ads=false");
    $done({ body, headers });
} else {
    $done({ headers });
}
