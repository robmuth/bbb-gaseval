pragma solidity >=0.4.21 <0.6.0;

contract VotingWithTokenCheck {
	uint public maxOption;
	mapping(uint => uint) public votes;

	enum TokenStatus { INVALID, VALID, VALIDATED }
	mapping(bytes32 => TokenStatus) internal tokens;

	address owner;

	constructor(uint _maxOption) public {
		require(_maxOption >= 0);
		maxOption = _maxOption;
		owner = msg.sender;
	}

	function vote(uint _option, bytes32 _privateToken) public {
		require(_option <= maxOption);
		assert(votes[_option] < 2**256 - 1);
		
		bytes32 _publicToken = keccak256(abi.encodePacked(_privateToken));
		require(tokens[_publicToken] == TokenStatus.VALID);

		votes[_option]++;

		tokens[_publicToken] = TokenStatus.VALIDATED;
	}

	function addToken(bytes32 _publicToken) public {
		require(msg.sender == owner);
		require(tokens[_publicToken] == TokenStatus.INVALID);

		tokens[_publicToken] = TokenStatus.VALID;
	}

	function generatePrivateToken(string memory _privateToken) public pure returns (bytes32 privateToken) {
		bytes memory bs = abi.encodePacked(_privateToken);
		assembly {
			privateToken := mload(add(bs, 32))
		}
	}

	function generatePublicToken(bytes32 _privateToken) public pure returns (bytes32) {
		return keccak256(abi.encodePacked(_privateToken));
	}
}