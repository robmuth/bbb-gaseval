pragma solidity >=0.4.21 <0.6.0;

contract SimpleVoting {
	uint public maxOption;
	mapping(uint => uint) public votes;

	constructor(uint _maxOption) public {
		assert(_maxOption >= 0);
		maxOption = _maxOption;
	}

	function vote(uint _option) public {
		require(_option <= maxOption);
		assert(votes[_option] < 2**256 - 1);

		votes[_option]++;
	}
}