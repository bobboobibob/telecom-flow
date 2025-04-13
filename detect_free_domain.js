let url = $request.url;
let hostname = $request.hostname;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 扩展免流域名列表
let telecomPatterns = [
    "189.cn",
    "telecom",
    "iqiyi.com",
    "youku.com",
    "tencent.com",
    "cloud.189.cn",
    "mkt.189.cn",
    "damai.cn",
    "dangbei.com",
    "dangbei.net",
    "ctyun.cn",
    "telecom.cn",
    "taobao.com",
    "alipay.com"
];

// 添加调试日志
$notification.post("脚本运行", "检测域名", hostname);

// 检查是否匹配免流域名
let isFreeFlow = telecomPatterns.some(pattern => hostname.includes(pattern) || url.includes(pattern));
if (isFreeFlow && !free_domains.includes(hostname)) {
    free_domains.push(hostname);
    $persistentStore.write("free_domains", JSON.stringify(free_domains));
    $notification.post("免流域名更新", "新增域名", hostname);
}

$done();let url = $request.url;
let hostname = $request.hostname;
let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 扩展免流域名列表
let telecomPatterns = [
    "189.cn",
    "telecom",
    "iqiyi.com",
    "youku.com",
    "tencent.com",
    "cloud.189.cn",
    "mkt.189.cn",
    "damai.cn",
    "dangbei.com",
    "dangbei.net",
    "ctyun.cn",
    "telecom.cn",
    "taobao.com",
    "alipay.com"
];

// 添加调试日志
$notification.post("脚本运行", "检测域名", hostname);

// 检查是否匹配免流域名
let isFreeFlow = telecomPatterns.some(pattern => hostname.includes(pattern) || url.includes(pattern));
if (isFreeFlow && !free_domains.includes(hostname)) {
    free_domains.push(hostname);
    $persistentStore.write("free_domains", JSON.stringify(free_domains));
    $notification.post("免流域名更新", "新增域名", hostname);
}

$done();
