BBBlockchain Gas Evaluation
==============================

This repository contains all source codes for the BBBlockchain whitepaper gas evaluation. The gas costs may vary depending on which compiler version is used and on the compiler's optimizer. For this readme we executed the calculations with a newer compiler version than for the whitepaper. The original BBBlockchain smart contracts are available on etherscan.io assigned to the deployed contracts.

## Timestamping
For timestamping we extracted the use case smart contract (```BBB_Usecase_Files_v1.sol```) directly out of the main BBBlockchain smart contracts. To ensure that the gas costs correspond as far as possible only to those of the use case itself all other BBBlockchain related source codes were removed. 

For calculating the estimated gas costs the truffle project can be migrated to Ganache with ```truffle migrate```. The gas cost for adding a sample file are then shown:

```
2_deploy_timestamping.js
========================

   Replacing 'StringUtils'
   -----------------------
   > transaction hash:    0x1dff129f947b33d31e571f045fa4f01c3c5f0567d91c456d82eb2ead736554af
   > Blocks: 0            Seconds: 0
   > contract address:    0xEb20716beDC6C2f611E9591C3A17c8FC4D986068
   > block number:        3
   > block timestamp:     1563785062
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.98109926
   > gas used:            641621
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01283242 ETH


   Replacing 'BBB_Usecase_Files_v1'
   --------------------------------
   > transaction hash:    0x8104fbe4101d1f1ce202412514a25f2f8f80c493b7bb27b9c4abd02c301786fb
   > Blocks: 0            Seconds: 0
   > contract address:    0xb5176c317C2f285b283cFb9A050756c3e3710aC6
   > block number:        4
   > block timestamp:     1563785062
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.93301332
   > gas used:            2404297
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04808594 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.06091836 ETH
   
3_add_file.js
=============
Estimated Gas: 214703
```

## Voting Contracts
For the BBBlockchain whitepaper different implementations for voting were evaluated.

- ```SimpleVoting``` (Minimal): allows unlimited voting without any control mechanisms.
- ```VotingWithSenderCheck``` (Address Check): saves the sender's address after voting and validates before voting, so one can only vote once per sender address.
- ```VotingWithTokenCheck``` (Token Check): requiring a secret token for voting, so deployment is more expensive because of expensive hashing function.
- ```WithTokenCheckBulk```: The same as ```VotingWithTokenCheck``` but Allows adding multiple tokens at once for saving gas costs.
- ```VotingWithERC20Token``` (ERC-20): allows to set a weight to a vote and transfer voting rights to another persons, leading to a more much more complex smart contract.

For calculating the estimated gas costs the truffle project can be migrated to Ganache with ```truffle migrate```. The gas cost for adding a sample file are then shown:

```
2_deploy_SimpleVoting.js
========================

   Deploying 'SimpleVoting'
   ------------------------
   > transaction hash:    0xf5897981e0bfb300417543818bd92382631036fc1aecbb9ce5604f5188422c9b
   > Blocks: 0            Seconds: 0
   > contract address:    0x1A05eAf609a4C5241bD5CE9F07aA4979BBD5894F
   > block number:        32
   > block timestamp:     1563788884
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.80449592
   > gas used:            184577
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00369154 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00369154 ETH


3_vote_SimpleVoting.js
======================
Gas per vote: 42510.72

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


4_deployVotingWithSenderCheck.js
================================

   Deploying 'VotingWithSenderCheck'
   ---------------------------------
   > transaction hash:    0x17d26757f47e19f024ca602f3b9bd9e3343cbdd79e2e04dd68d687ef8d8f5f9d
   > Blocks: 0            Seconds: 0
   > contract address:    0x3DBDe27403AB0aA00e1f3F730f8B1C5cf556e79a
   > block number:        35
   > block timestamp:     1563788886
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.79876386
   > gas used:            232557
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00465114 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00465114 ETH


5_vote_WithSenderCheck.js
=========================
Gas per vote: 63226.72

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


6_deployVotingWithTokenCheckBulk.js
===================================

   Deploying 'VotingWithTokenCheckBulk'
   ------------------------------------
   > transaction hash:    0xefe156b5dac76c2b12068312c67e1e95aa069bab5606d048353a0c02cd2aae44
   > Blocks: 0            Seconds: 0
   > contract address:    0x5935Fd9D96020640438B5BF61f7a113C35EC3160
   > block number:        38
   > block timestamp:     1563788888
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.78612318
   > gas used:            577988
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01155976 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01155976 ETH


7_vote_WithTokenCheckBulk.js
============================
Gas per vote: 72734.78

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


8_deployVotingWithERC20Token.js
===============================

   Deploying 'VotingWithERC20Token'
   --------------------------------
   > transaction hash:    0xb449f723f44aaa2c73ffd1cdd6a583431b1a2674ce4d2212a4a230c918a6736c
   > Blocks: 0            Seconds: 0
   > contract address:    0x5918054136a98C9802AAfb51F183Be123966da26
   > block number:        42
   > block timestamp:     1563788892
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.73063216
   > gas used:            1545712
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03091424 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03091424 ETH


9_vote_WithERC20Token.js
========================
Gas per vote: 92626

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH
```

### Truffle Tests
Test cases for the different voting implementations are available and can be executed with ```truffle test```. 

```
  Contract: SimpleVoting
    ✓ should have no votes (226ms)
    ✓ should not vote for too high option (355ms)
    ✓ should vote once (356ms)
    ✓ should vote again, a second time (320ms)
    ✓ should vote for another option (176ms)

  Contract: VotingWithSenderCheck
    ✓ should have no votes (320ms)
    ✓ should not vote for too high option (331ms)
    ✓ should vote once (336ms)
    ✓ should fail when voting again, a second time (366ms)
    ✓ should not vote for another option

  Contract: VotingWithTokenCheck
    ✓ should have no votes (284ms)
    ✓ should fail w/o token (134ms)
    ✓ should vote once (922ms)
    ✓ should fail when voting again, a second time (387ms)
    ✓ should not vote for another option (100ms)

  Contract: VotingWithTokenCheckBulk
    ✓ should have no votes (289ms)
    ✓ should fail w/o token (97ms)
    ✓ should vote once (919ms)
    ✓ should fail when voting again, a second time (343ms)
    ✓ should not vote for another option (41ms)
    ✓ should not vote 10 times (5354ms)

  Contract: VotingWithERC20Token
    ✓ should have no votes (313ms)
    ✓ should not vote for too high option (333ms)
    ✓ should vote once (341ms)
    ✓ should fail when voting again with too much weight (373ms)
    ✓ should vote again, with more weight (331ms)
```

## Voting with Zokrates
As with the voting implementations above for the gas cost evaluation with ZoKrates can be executed with ```truffle migrate```. The gas cost for submitting a single vote is returned by the migration ```4_vote.js```:

```
2_verifier.sol.js
=================

   Deploying 'Verifier'
   --------------------
   > transaction hash:    0xe6a9116730121ee5923fb29907d32da1e391bfabfeaa899f659de65c332fa3a6
   > Blocks: 0            Seconds: 0
   > contract address:    0xe1348881F06B3271B06191502d9Efc850c63Ea6E
   > block number:        48
   > block timestamp:     1563789071
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.68834088
   > gas used:            1697484
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03394968 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03394968 ETH


3_voting.js
===========

   Deploying 'Voting'
   ------------------
   > transaction hash:    0x040751101a3507ce3b6640bb799f04f0817643103a294e0af17907125de251ee
   > Blocks: 0            Seconds: 0
   > contract address:    0x967C07Edb6928B130b24ab00a99d025FcE0eA88f
   > block number:        50
   > block timestamp:     1563789072
   > account:             0xFFd929C7d765336277F20eFBfdD223A153424045
   > balance:             99.67800556
   > gas used:            489785
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0097957 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0097957 ETH


4_vote.js
=========
Gas: 1760551

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH
```


## Results
The following gas costs were evaluated for the BBBlockchain whitepaper:

|order|type                         |deployCost|votingCost                                   |
|-----|-----------------------------|----------|---------------------------------------------|
|0    |vote-SimpleVoting            |0.191841  |0.04252772                                   |
|1    |vote-WithSenderCheck         |0.240421  |0.06324972                                   |
|2    |vote-WithTokenCheckBulk      |0.589482  |0.072776                                     |
|3    |vote-WithERC20Token          |1.505117  |0.092656                                     |
|4    |manual-zokrates              |2.187205  |1.760551                                     |


## Licenses
- BBBlockchain Smart Contracts: MIT
- SafeMath.sol: MIT
- Truffle: MIT
- ZoKrates: GNU Lesser General Public License v3.0

