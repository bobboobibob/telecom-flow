let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 示例：添加更多免流域名
let new_domains = ["ctyun.cn", "telecom.cn", "damai.cn", "taobao.com"];
free_domains = [...new Set([...free_domains, ...new_domains])];
$persistentStore.write("free_domains", JSON.stringify(free_domains));

let rules = free_domains.map(domain => `DOMAIN,${domain},DIRECT`).join("\n");
$persistentStore.write("dynamic_rules", rules);
$notification.post("规则更新", "请手动更新规则", rules);

$done();
