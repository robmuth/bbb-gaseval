pragma solidity >=0.4.0 <0.5.0;

import "./Verifier.sol";

contract Voting {
	mapping(uint => uint) public votes;

	uint public maximumOptions;

	Verifier verifier;

	function Voting(Verifier _verifier, uint _maximumOptions) public {
		verifier = _verifier;
		maximumOptions = _maximumOptions;
	}

	function vote(	uint _vote, 
					uint[2] a,
					uint[2] a_p,
					uint[2][2] b,
					uint[2] b_p,
					uint[2] c,
					uint[2] c_p,
					uint[2] h,
					uint[2] k,
					uint[1] ageClass) public {
		require(verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, ageClass));
		require(_vote < maximumOptions);

		votes[_vote]++;
	}
}