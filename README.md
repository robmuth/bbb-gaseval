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
   > transaction hash:    0x2fdc7a84daa53d5d47c892f872f0a734c07939b8000bb69a2c8e3ef81446328d
   > Blocks: 0            Seconds: 0
   > contract address:    0xb6151F63B84124F12F24884E2C006D57E031F473
   > block number:        3
   > block timestamp:     1683098564
   > account:             0xd06c8bf20d21873027F99e99D51BEAeB27BF03e5
   > balance:             99.9973931012102906
   > gas used:            532637 (0x8209d)
   > gas price:           3.177688086 gwei
   > value sent:          0 ETH
   > total cost:          0.001692554249062782 ETH


   Replacing 'BBB_Usecase_Files_v1'
   --------------------------------
   > transaction hash:    0x63b3f12593c1fb89bc9fdc7dc9202363dceb068347bd6658df5dcdd1d47d552e
   > Blocks: 0            Seconds: 0
   > contract address:    0x7fb04c8c5673a2B9aCd52B5aA0C5D3644549d6bc
   > block number:        4
   > block timestamp:     1683098564
   > account:             0xd06c8bf20d21873027F99e99D51BEAeB27BF03e5
   > balance:             99.991299887927593562
   > gas used:            1961502 (0x1dee1e)
   > gas price:           3.106401769 gwei
   > value sent:          0 ETH
   > total cost:          0.006093213282697038 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.00778576753175982 ETH


3_add_file.js
=============
Estimated Gas: 227727
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

   Replacing 'SimpleVoting'
   ------------------------
   > transaction hash:    0xbc1a4d1771278529bf65a54a3a308d85e59bd590624c423aeba95f385d14aca4
   > Blocks: 0            Seconds: 0
   > contract address:    0x4B3e0479fA324F27Ca3e704f4332bf9ebAaD39AB
   > block number:        3
   > block timestamp:     1683098599
   > account:             0x4e13CeDDe647F1e310095F1739F10de062A56cc2
   > balance:             99.998218485131224974
   > gas used:            224646 (0x36d86)
   > gas price:           3.178981289 gwei
   > value sent:          0 ETH
   > total cost:          0.000714145430648694 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000714145430648694 ETH


3_vote_SimpleVoting.js
======================
Gas per vote: 46252.76
   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


4_deployVotingWithSenderCheck.js
================================

   Replacing 'VotingWithSenderCheck'
   ---------------------------------
   > transaction hash:    0x401ff382b1ef72d19cfa6f0276c86350eed54241891aaa30468878269986cf23
   > Blocks: 0            Seconds: 0
   > contract address:    0xFe43930A62c183c2d06c94cD545d7d865eDC6B22
   > block number:        6
   > block timestamp:     1683098600
   > account:             0x4e13CeDDe647F1e310095F1739F10de062A56cc2
   > balance:             99.99726226830176005
   > gas used:            263341 (0x404ad)
   > gas price:           2.960334112 gwei
   > value sent:          0 ETH
   > total cost:          0.000779577345388192 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000779577345388192 ETH


5_vote_WithSenderCheck.js
=========================
Gas per vote: 68768.76
   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


6_deployVotingWithTokenCheckBulk.js
===================================

   Replacing 'VotingWithTokenCheckBulk'
   ------------------------------------
   > transaction hash:    0x0d4bc263234538bf2bce78bf8d6841039c76dda2b9e551cebef4751fe6bc21ab
   > Blocks: 0            Seconds: 0
   > contract address:    0x4A5Ef1B05E25a231C82178110850d01Ae851F860
   > block number:        9
   > block timestamp:     1683098601
   > account:             0x4e13CeDDe647F1e310095F1739F10de062A56cc2
   > balance:             99.99495684000991773
   > gas used:            760577 (0xb9b01)
   > gas price:           2.812604676 gwei
   > value sent:          0 ETH
   > total cost:          0.002139202426658052 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.002139202426658052 ETH


7_vote_WithTokenCheckBulk.js
============================
Gas per vote: 76520.18
   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


8_deployVotingWithERC20Token.js
===============================

   Replacing 'VotingWithERC20Token'
   --------------------------------
   > transaction hash:    0x7f896a2169dc20e168d98ec72cd1c17d13ada04d5dd09e41ae762da632495dd7
   > Blocks: 0            Seconds: 0
   > contract address:    0xcA91D909dF0f93D776f76cB3d877496CD010d195
   > block number:        13
   > block timestamp:     1683098602
   > account:             0x4e13CeDDe647F1e310095F1739F10de062A56cc2
   > balance:             99.987933010255124741
   > gas used:            1320023 (0x142457)
   > gas price:           2.699317673 gwei
   > value sent:          0 ETH
   > total cost:          0.003563161412666479 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.003563161412666479 ETH


9_vote_WithERC20Token.js
========================
Gas per vote: 95485
   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH
```

### Truffle Tests
Test cases for the different voting implementations are available and can be executed with ```truffle test```. 

```
  Contract: SimpleVoting
    ✔ should have no votes
    ✔ should not vote for too high option (89ms)
    ✔ should vote once
    ✔ should vote again, a second time
    ✔ should vote for another option

  Contract: VotingWithSenderCheck
    ✔ should have no votes
    ✔ should not vote for too high option
    ✔ should vote once
    ✔ should fail when voting again, a second time
    ✔ should not vote for another option

  Contract: VotingWithTokenCheck
    ✔ should have no votes
    ✔ should fail w/o token (44ms)
    ✔ should vote once
    ✔ should fail when voting again, a second time
    ✔ should not vote for another option

  Contract: VotingWithTokenCheckBulk
    ✔ should have no votes
    ✔ should fail w/o token
    ✔ should vote once
    ✔ should fail when voting again, a second time
    ✔ should not vote for another option
    ✔ should not vote 10 times (213ms)

  Contract: VotingWithERC20Token
    ✔ should have no votes
    ✔ should not vote for too high option
    ✔ should vote once
    ✔ should fail when voting again with too much weight
    ✔ should vote again, with more weight
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

|order|type                         |deployCost|votingCost             |
|-----|-----------------------------|----------|-----------------------|
|0    |vote-SimpleVoting            |224646    |46252                  |
|1    |vote-WithSenderCheck         |263341    |68768                  |
|2    |vote-WithTokenCheckBulk      |760577    |76520                  |
|3    |vote-WithERC20Token          |1320023   |95485                  |
|4    |manual-zokrates              |1697484   |1760551                |


## Licenses
- BBBlockchain Smart Contracts: MIT
- SafeMath.sol: MIT
- Truffle: MIT
- ZoKrates: GNU Lesser General Public License v3.0

