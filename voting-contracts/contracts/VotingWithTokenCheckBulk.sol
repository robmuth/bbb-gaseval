pragma solidity >=0.4.21 <0.6.0;

import "./VotingWithTokenCheck.sol";

contract VotingWithTokenCheckBulk is VotingWithTokenCheck {
	constructor(uint _maxOption) public VotingWithTokenCheck(_maxOption) {
		// NOP than super constructor call
	}

	function addTokens(bytes32[] memory _publicTokens) public {
		require(msg.sender == owner);

		for(uint i = 0; i < _publicTokens.length; i++) {
			bytes32 _publicToken = _publicTokens[i];
			
			if(tokens[_publicToken] != TokenStatus.INVALID) 
				revert();

			tokens[_publicToken] = TokenStatus.VALID;
		}
	}
}