
# HYBRID Node Operator Guide

## Overview
This guide covers operating Storage and Validator nodes on the HYBRID Blockchain, including NFT licensing, Node-as-a-Service (NaaS), and technical requirements.

## Node Types

### Storage Nodes (HNL-STR)
- **License Cost**: 250 HYBRID tokens
- **Purpose**: Store blockchain data and HTSX applications
- **Hardware Requirements**: 
  - 4-core CPU
  - 8GB RAM  
  - 200GB SSD
  - 100 Mbps connection

### Validator Nodes (HNL-VAL)
- **License Cost**: 1,000 HYBRID tokens
- **Purpose**: Validate transactions and produce blocks
- **Hardware Requirements**:
  - 8-core CPU
  - 16GB RAM
  - 500GB SSD
  - 1 Gbps connection

## Getting Started

### 1. Purchase Node License NFT
```bash
# Using HYBRID CLI
hybrid tx nft mint \
  --type "storage" \
  --price "250000000uhybrid" \
  --from your-wallet

# Verify license
hybrid query nft owner your-nft-id
```

### 2. Install Node Software
```bash
# Download and install
wget https://releases.hybrid.blockchain/hybridchaind-v0.1.0
chmod +x hybridchaind
sudo mv hybridchaind /usr/local/bin/

# Initialize node
hybridchaind init your-node-name --chain-id hybrid-1

# Download genesis
curl https://genesis.hybrid.blockchain/genesis.json > ~/.hybridchaind/config/genesis.json
```

### 3. Configure Node
```toml
# ~/.hybridchaind/config/config.toml
[p2p]
persistent_peers = "peer1@node1.hybrid.blockchain:26656,peer2@node2.hybrid.blockchain:26656"

[rpc]
laddr = "tcp://0.0.0.0:26657"

[api]
enable = true
address = "tcp://0.0.0.0:1317"
```

### 4. Start Node
```bash
# Start as systemd service
sudo systemctl start hybridchaind
sudo systemctl enable hybridchaind

# Check status
hybridchaind status
```

## Node-as-a-Service (NaaS)

### For License Owners
Delegate your license to a professional operator:

```bash
# Delegate license
hybrid tx naas delegate \
  --license-id your-nft-id \
  --operator operator-address \
  --revenue-split 70 \
  --from your-wallet
```

### For Operators
Register as a NaaS provider:

```bash
# Register as operator
hybrid tx naas register \
  --moniker "Your NaaS Service" \
  --website "https://yournaas.com" \
  --uptime-guarantee 99.9 \
  --from operator-wallet
```

## Monitoring and Maintenance

### Performance Metrics
- Block sync status
- Transaction throughput
- Storage utilization
- Network connectivity

### Logging
```bash
# View logs
journalctl -u hybridchaind -f

# Enable debug logging
hybridchaind start --log_level debug
```

### Updates
```bash
# Update node software
wget https://releases.hybrid.blockchain/hybridchaind-latest
sudo systemctl stop hybridchaind
sudo mv hybridchaind-latest /usr/local/bin/hybridchaind
sudo systemctl start hybridchaind
```

## Rewards and Economics

### Revenue Streams
- **Block Rewards**: 50% to validators
- **Storage Fees**: 20% to storage nodes
- **Transaction Fees**: Distributed to all nodes
- **HTSX Execution**: Fees for running HTSX applications

### NaaS Revenue Split
- **Default**: 70% to license owner, 30% to operator
- **Customizable**: Can be negotiated between parties

## Troubleshooting

### Common Issues
1. **Sync Issues**: Check peer connectivity
2. **License Errors**: Verify NFT ownership
3. **Performance**: Monitor resource usage
4. **Network**: Check firewall settings

### Support Channels
- Discord: https://discord.gg/hybrid
- Forum: https://forum.hybrid.blockchain
- Documentation: https://docs.hybrid.blockchain
