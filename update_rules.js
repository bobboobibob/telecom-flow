let args = $argument;
let free_domain = args.free_domain || "vod.189.cn";
let free_domains = $persistentStore.read("free_domains") ? JSON.parse($persistentStore.read("free_domains")) : [free_domain];

// 仅保留 Senplayer 相关域名
let senplayerDomains = free_domains.filter(domain => domain.includes("285286.xyz") || domain.includes("byusers.me"));

// 生成规则
let rules = senplayerDomains.map(domain => `DOMAIN,${domain},DIRECT`).join("\n");
let mitm_hosts = senplayerDomains.map(domain => `*.${domain}`).join(", ");

// 存储规则
$persistentStore.write("dynamic_rules", rules);
$persistentStore.write("dynamic_mitm", mitm_hosts);

// 通知用户
$notification.post("规则更新", "请手动更新配置文件", `添加以下规则到 [rule]:\n${rules}\n\n添加以下域名到 [mitm]:\n${mitm_hosts}`);

$done();
