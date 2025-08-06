
# HYBRID Blockchain API Reference

## REST API Endpoints

### Blockchain Operations

#### Get Chain Information
```http
GET /api/v1/chain/info
```

Response:
```json
{
  "chain_id": "hybrid-1",
  "block_height": 1234567,
  "consensus": "tendermint",
  "version": "0.1.0"
}
```

#### Get Block by Height
```http
GET /api/v1/blocks/{height}
```

#### Get Transaction
```http
GET /api/v1/transactions/{hash}
```

### Wallet Operations

#### Create Wallet
```http
POST /api/v1/wallet/create
```

Request:
```json
{
  "mnemonic_length": 24,
  "hd_path": "m/44'/60'/0'/0/0"
}
```

#### Get Balance
```http
GET /api/v1/wallet/{address}/balance
```

#### Send Transaction
```http
POST /api/v1/wallet/send
```

Request:
```json
{
  "from": "hybrid1...",
  "to": "hybrid1...",
  "amount": "1000000",
  "denom": "uhybrid",
  "gas": "200000"
}
```

### NFT License Operations

#### Mint Node License
```http
POST /api/v1/license/mint
```

Request:
```json
{
  "type": "storage|validator",
  "owner": "hybrid1...",
  "price": "100000000",
  "metadata": {
    "name": "Storage Node License",
    "description": "Allows operation of storage nodes"
  }
}
```

#### Verify License
```http
GET /api/v1/license/verify/{address}/{nft_id}
```

### Cross-Chain Operations

#### Bridge Tokens
```http
POST /api/v1/bridge/transfer
```

Request:
```json
{
  "from_chain": "hybrid",
  "to_chain": "base",
  "token": "HYBRID",
  "amount": "1000000",
  "recipient": "0x..."
}
```

### HTSX Runtime API

#### Compile HTSX
```http
POST /api/v1/htsx/compile
```

Request:
```json
{
  "source": "<htsx>...</htsx>",
  "target": "javascript|wasm"
}
```

#### Execute HTSX Component
```http
POST /api/v1/htsx/execute
```

### SpiralScript API

#### Compile SpiralScript
```http
POST /api/v1/spiral/compile
```

Request:
```json
{
  "source": "spiral_function test() { return 42; }",
  "target": "javascript|quantum_assembly"
}
```

#### Execute Quantum Operation
```http
POST /api/v1/spiral/quantum/execute
```

Request:
```json
{
  "operation": "hadamard",
  "qubits": [0, 1],
  "circuit": "quantum_circuit_definition"
}
```

### Trust & Canon API

#### Calculate ΔTrust
```http
POST /api/v1/trust/calculate
```

Request:
```json
{
  "entity": "hybrid1...",
  "operation": "transaction",
  "data": {},
  "canon": "XV"
}
```

#### Verify Canon Compliance
```http
POST /api/v1/canon/verify
```

Request:
```json
{
  "operation": "governance_proposal",
  "data": {},
  "canons": ["XV", "XXXIV"]
}
```

## WebSocket API

### Real-time Block Updates
```javascript
const ws = new WebSocket('ws://api.hybrid.blockchain/ws/blocks');
ws.onmessage = (event) => {
  const block = JSON.parse(event.data);
  console.log('New block:', block.height);
};
```

### Transaction Pool Updates
```javascript
const ws = new WebSocket('ws://api.hybrid.blockchain/ws/txpool');
```

### Quantum State Updates
```javascript
const ws = new WebSocket('ws://api.hybrid.blockchain/ws/quantum');
```

## GraphQL API

### Schema Overview
```graphql
type Query {
  block(height: Int!): Block
  transaction(hash: String!): Transaction
  wallet(address: String!): Wallet
  nftLicense(id: String!): NFTLicense
  quantumState(circuit: String!): QuantumState
}

type Mutation {
  sendTransaction(input: SendTransactionInput!): Transaction
  mintNFT(input: MintNFTInput!): NFT
  executeQuantumCircuit(input: QuantumCircuitInput!): QuantumResult
}

type Subscription {
  newBlocks: Block
  transactionUpdates: Transaction
  quantumStateChanges: QuantumState
}
```

### Example Queries
```graphql
query GetLatestBlocks {
  blocks(limit: 10, orderBy: HEIGHT_DESC) {
    height
    hash
    timestamp
    transactions {
      hash
      from
      to
      amount
    }
  }
}

mutation SendHybridTokens {
  sendTransaction(input: {
    from: "hybrid1..."
    to: "hybrid1..."
    amount: "1000000"
    denom: "uhybrid"
  }) {
    hash
    success
    gasUsed
  }
}
```

## SDK Integration

### JavaScript/TypeScript SDK
```typescript
import { HybridSDK } from '@hybrid/sdk';

const sdk = new HybridSDK({
  endpoint: 'https://api.hybrid.blockchain',
  chainId: 'hybrid-1'
});

// Send transaction
const result = await sdk.wallet.send({
  from: 'hybrid1...',
  to: 'hybrid1...',
  amount: '1000000',
  denom: 'uhybrid'
});

// Execute HTSX
const htsx = await sdk.htsx.compile(`
  <wallet-connector chains="hybrid,base">
    <hybrid-coin balance="display" />
  </wallet-connector>
`);

// Quantum operations
const quantumResult = await sdk.quantum.execute({
  circuit: 'hadamard_cnot_circuit',
  qubits: 2
});
```

### Python SDK
```python
from hybrid_sdk import HybridSDK

sdk = HybridSDK(
    endpoint='https://api.hybrid.blockchain',
    chain_id='hybrid-1'
)

# Get balance
balance = sdk.wallet.get_balance('hybrid1...')

# Execute SpiralScript
result = sdk.spiral.execute('''
spiral_function calculate_trust(entity: string) -> ΔTrust {
    return ΔTrust.calculate(entity, Canon.XV)
}
''')
```

## Authentication & Security

### API Key Authentication
```http
Authorization: Bearer your_api_key_here
```

### Wallet Signature Authentication
```http
X-Wallet-Address: hybrid1...
X-Signature: signature_of_request_body
X-Timestamp: unix_timestamp
```

### Rate Limiting
- 1000 requests per hour for read operations
- 100 requests per hour for write operations
- 10 requests per minute for quantum operations

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Account balance too low",
    "details": {
      "required": "1000000",
      "available": "500000"
    }
  }
}
```

### Error Codes
- `INVALID_ADDRESS`: Malformed blockchain address
- `INSUFFICIENT_BALANCE`: Not enough tokens
- `LICENSE_REQUIRED`: NFT license needed for operation
- `CANON_VIOLATION`: Operation violates Spiral Canons
- `QUANTUM_DECOHERENCE`: Quantum state corruption
- `TRUST_INSUFFICIENT`: ΔTrust level too low

---

This API provides comprehensive access to all HYBRID Blockchain features, including traditional blockchain operations, HTSX runtime, SpiralScript execution, and quantum computing capabilities.
