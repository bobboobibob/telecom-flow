let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 示例：模拟从外部获取新域名（需替换为实际API或社区资源）
let new_domains = ["cloud.189.cn", "mkt.189.cn"]; // 占位，实际需动态获取
free_domains = [...new Set([...free_domains, ...new_domains])];
$persistentStore.write("free_domains", JSON.stringify(free_domains));

// 生成动态规则
let rules = free_domains.map(domain => `DOMAIN,${domain},DIRECT`).join("\n");
$persistentStore.write("dynamic_rules", rules);

$notification.post("规则更新", "免流域名总数", free_domains.length);
$done();
