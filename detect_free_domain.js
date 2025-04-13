let url = $request.url;
let hostname = $request.hostname;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 添加调试日志
$notification.post("脚本运行 - 检测域名", hostname, url);

// 检测免流域名的函数（简化版，假设通过响应状态判断）
function detectFreeFlowDomain(hostname, callback) {
    $httpClient.head(`https://${hostname}`, (error, response) => {
        if (error) {
            $notification.post("免流检测失败", hostname, error);
            callback(false);
        } else {
            // 简化逻辑：假设响应状态为 200 表示免流（实际需结合运营商流量统计）
            let isFreeFlow = response.status === 200;
            callback(isFreeFlow);
        }
    });
}

// 检测是否为免流域名
if (!free_domains.includes(hostname)) {
    detectFreeFlowDomain(hostname, (isFreeFlow) => {
        if (isFreeFlow) {
            free_domains.push(hostname);
            $persistentStore.write("free_domains", JSON.stringify(free_domains));
            $notification.post("免流域名更新", "新增域名", hostname);
        }
        $done();
    });
} else {
    $done();
}
