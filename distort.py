import json
import random
import sys

# JSONを読み込む
data = json.load(sys.stdin)
nodes = data["nodes"]
edges = data["edges"]

# 1. 弱い関係を削除
edges = [e for e in edges if e["strength"] > 0.3]

# 2. 矛盾を強調
for e in edges:
    if e["type"] == "contradiction":
        e["strength"] *= 2

# 3. 無関係ノードを強制接続
if len(nodes) >= 2:
    a, b = random.sample(nodes, 2)
    edges.append({
        "from": a["id"],
        "to": b["id"],
        "type": "forced_link",
        "strength": 0.4
    })

# 出力
print("=== DISTORTED RELATIONS ===\n")
for e in edges:
    print(f'{e["from"]} -> {e["to"]} | {e["type"]} | {round(e["strength"],2)}')
  
