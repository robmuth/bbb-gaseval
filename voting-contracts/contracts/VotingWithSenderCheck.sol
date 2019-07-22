pragma solidity >=0.4.21 <0.6.0;

contract VotingWithSenderCheck {
	uint public maxOption;
	mapping(uint => uint) public votes;

	mapping(address => bool) voted;

	constructor(uint _maxOption) public {
		require(_maxOption >= 0);
		maxOption = _maxOption;
	}	

	function vote(uint _option) public {
		require(_option <= maxOption);
		assert(votes[_option] < 2**256 - 1);
		require(voted[msg.sender] == false);

		votes[_option]++;
		voted[msg.sender] = true;
	}
}