import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeSnapshotHash, SNAPSHOT_NORMALIZATION_VERSION } from '../scripts/lib/snapshotHash.mjs';

// 由目标站版本 12 的服务端实现对同一输入计算所得；规则变更时需同步更新。
test('版本 12 商品快照摘要与服务端一致', () => {
  const snapshot = {
    shopName: '校验店铺', canonicalUrl: 'https://example.com/shop/demo', telegram: '',
    shopSellCount: null, salesVisible: false, depositVisible: false, depositMoney: null,
    items: [{ itemKey: 'item-1', rawName: 'Codex 接🐎 美区', shopCategory: '接码', price: 1,
      stockCount: 3, stockStatus: 'normal', itemUrl: 'https://example.com/item/1' }],
  };
  assert.equal(SNAPSHOT_NORMALIZATION_VERSION, 12);
  assert.equal(computeSnapshotHash(snapshot), 'f9a5cbf48c6766f2769467bdaef308aae22082c7d6815d84797378152fc969a7');
});
