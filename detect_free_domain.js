let url = $request.url;
let hostname = $request.hostname;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 添加调试日志
$notification.post("脚本运行 - 检测域名", hostname, url);

// 检测免流域名的函数（简化版，假设 Senplayer 相关域名为免流）
function detectFreeFlowDomain(hostname, callback) {
    // Senplayer 相关域名，假设为免流（需测试确认）
    let senplayerDomains = [
        "285286.xyz",
        "byusers.me"
    ];

    let isFreeFlow = senplayerDomains.some(domain => hostname.includes(domain));
    callback(isFreeFlow);
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
