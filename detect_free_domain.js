let url = $request.url;
let hostname = $request.hostname;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 匹配潜在免流域名
if (
    hostname.includes("189.cn") ||
    hostname.includes("telecom") ||
    hostname.includes("iqiyi.com") ||
    hostname.includes("youku.com") ||
    url.includes("freeflow") ||
    url.includes("telecom")
) {
    if (!free_domains.includes(hostname)) {
        free_domains.push(hostname);
        $persistentStore.write("free_domains", JSON.stringify(free_domains));
        $notification.post("免流域名更新", "新增域名", hostname);
    }
}

$done();
