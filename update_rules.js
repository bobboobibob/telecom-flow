let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 示例：添加更多免流域名（可替换为实际API）
let new_domains = ["ctyun.cn", "telecom.cn"];
free_domains = [...new Set([...free_domains, ...new_domains])];
$persistentStore.write("free_domains", JSON.stringify(free_domains));

// 生成规则供用户手动更新
let rules = free_domains.map(domain => `DOMAIN,${domain},DIRECT`).join("\n");
$persistentStore.write("dynamic_rules", rules);

// 通过通知提醒用户
$notification.post("规则更新", "请手动更新规则", rules);

$done();
