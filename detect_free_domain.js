let url = $request.url;
let hostname = $request.hostname;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn,h5.nty.tv189.com";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : free_domain.split(",");

// 添加调试日志
$notification.post("脚本运行 - 检测域名", hostname, url);

// 检测免流域名的函数
function detectFreeFlowDomain(hostname, callback) {
    let isEmbyRelated = url.includes("/emby/");
    callback(isEmbyRelated);
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
