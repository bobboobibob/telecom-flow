let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 生成规则
let rules = free_domains.map(domain => `DOMAIN,${domain},DIRECT`).join("\n");
let mitm_hosts = free_domains.map(domain => `*.${domain}`).join(", ");

// 存储规则
$persistentStore.write("dynamic_rules", rules);
$persistentStore.write("dynamic_mitm", mitm_hosts);

// 通知用户
$notification.post("规则更新", "请手动更新规则", `规则:\n${rules}\n\nMitM:\n${mitm_hosts}`);

$done();
