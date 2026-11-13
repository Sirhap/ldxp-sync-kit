import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeSnapshotHash, SNAPSHOT_NORMALIZATION_VERSION } from '../scripts/lib/snapshotHash.mjs';

// 由目标站版本 11 的服务端实现对同一输入计算所得；规则变更时需同步更新。
test('版本 11 商品快照摘要与服务端一致', () => {
  const snapshot = {
    shopName: '校验店铺', canonicalUrl: 'https://example.com/shop/demo', telegram: '',
    shopSellCount: null, salesVisible: false, depositVisible: false, depositMoney: null,
    items: [{ itemKey: 'item-1', rawName: 'Codex 接🐎 美区', shopCategory: '接码', price: 1,
      stockCount: 3, stockStatus: 'normal', itemUrl: 'https://example.com/item/1' }],
  };
  assert.equal(SNAPSHOT_NORMALIZATION_VERSION, 11);
  assert.equal(computeSnapshotHash(snapshot), '9d5493605cf29fb1e91820518615d1d8865e917da878ef261a3a45b280464b40');
});
