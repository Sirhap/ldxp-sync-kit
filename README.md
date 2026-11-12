# 店铺本地同步工具

从本机采集已收录的店铺商品，将完整快照与目标站比对，仅推送发生变化的店铺。支持请求间隔配置、源站风控停止、固定分片、中断续跑和不可用店铺删除。

需要 Node.js 22 或更高版本。克隆后配置目标地址和密钥：

```bash
git clone https://github.com/Sirhap/ldxp-sync-kit.git
cd ldxp-sync-kit
cp local-sync/config.example.env local-sync/config.env
```

编辑 `local-sync/config.env`，填写 `API_BASE` 和目标服务的 `INGEST_SECRET`。默认每次请求随机间隔 3～5 秒。配置文件不会提交到 Git，请勿公开密钥。

```bash
npm run sync:local -- --shop=King                 # 预览
npm run sync:local -- --shop=King --apply         # 同步
npm run sync:local -- --apply --shard=1/3         # 分片同步
npm run sync:local -- --apply --shard=1/3 --resume # 续跑
```

更多选项、删除行为和安全边界见 [同步说明](local-sync/README.md)。可供兼容 Agent 使用的 Skill 位于 [.agents/skills/ldxp-local-sync](.agents/skills/ldxp-local-sync/SKILL.md)。仓库不包含真实密钥或运行数据。
