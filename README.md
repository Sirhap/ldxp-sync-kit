# 店铺本地同步工具

从本机采集已收录的店铺商品，将完整快照与目标站比对，仅推送发生变化的店铺。支持请求间隔配置、源站风控停止、固定分片、中断续跑和不可用店铺删除。

需要 Node.js 22 或更高版本。克隆后配置目标地址和密钥：

```bash
git clone https://github.com/Sirhap/ldxp-sync-kit.git
cd ldxp-sync-kit
cp local-sync/config.example.env local-sync/config.env
```

编辑 `local-sync/config.env`，填写 `API_BASE` 和目标服务的 `INGEST_SECRET`。默认每次请求随机间隔 1～2 秒。配置文件不会提交到 Git，请勿公开密钥。

```bash
npm run sync:local -- --shop=King                 # 预览
npm run sync:local -- --shop=King --apply         # 同步
npm run sync:local -- --apply --shard=1/3         # 分片同步
npm run sync:local -- --apply --shard=1/3 --resume # 续跑
```

更多选项、删除行为和安全边界见 [同步说明](local-sync/README.md)。可供兼容 Agent 使用的 Skill 位于 [.agents/skills/ldxp-local-sync](.agents/skills/ldxp-local-sync/SKILL.md)。仓库不包含真实密钥或运行数据。

## 执行前查看数据流

运行 `npm run sync:local -- --explain` 可在不读取密钥、不访问网络的情况下查看实际请求方向、同步与删除条件。店铺状态由**店铺源站**返回，写入和删除请求发送到配置的目标站；目标站不是店铺状态的来源。

`--apply` 默认会删除源站明确报告不存在的店铺；再加 `--delete-unavailable` 会删除源站报告已关闭交易的店铺。删除同时移除目标站的店铺、商品报价和历史快照，判断依赖源站单次响应。如果不希望自动删除，不应运行 `--apply`。运行前请确认目标站、代码版本和备份。定时运行的执行环境需固定代码版本并由使用者管理密钥；本工具不会自动创建定时任务。
