let url = $request.url;
let hostname = $request.hostname;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 检测免流域名的函数
function detectFreeFlowDomain(hostname) {
    return new Promise((resolve) => {
        // 发送 HEAD 请求，检测流量是否被计费
        $httpClient.head(`https://${hostname}`, (error, response) => {
            if (error) {
                $notification.post("免流检测失败", hostname, error);
                resolve(false);
            } else {
                // 假设响应头中包含运营商标识，或者通过流量统计判断
                // 这里简化为检测响应是否正常（实际需结合运营商流量统计）
                let isFreeFlow = response.status === 200; // 简化逻辑，实际需更复杂判断
                resolve(isFreeFlow);
            }
        });
    });
}

// 异步检测免流域名
(async () => {
    // 避免重复检测
    if (free_domains.includes(hostname)) {
        $done();
        return;
    }

    // 添加调试日志
    $notification.post("脚本运行 - 检测域名", hostname, url);

    // 检测是否为免流域名
    let isFreeFlow = await detectFreeFlowDomain(hostname);
    if (isFreeFlow) {
        free_domains.push(hostname);
        $persistentStore.write("free_domains", JSON.stringify(free_domains));
        $notification.post("免流域名更新", "新增域名", hostname);
    }

    $done();
})();
