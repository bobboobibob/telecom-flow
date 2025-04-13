let body = $response.body;
let headers = $response.headers;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let user_agent = args.user_agent || "ChinaTelecomApp/5.0";

// 添加伪装标记
headers["X-Telecom-Service"] = "FreeFlow";
headers["User-Agent"] = user_agent;

// 示例：修改响应内容（可根据实际需求扩展）
body = body.replace(/ads=true/g, "ads=false");

$done({ body, headers });
