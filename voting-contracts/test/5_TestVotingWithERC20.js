const VotingWithERC20Token = artifacts.require("VotingWithERC20Token");

const MAX_VOTE = 5; // must be >= 2!

contract("VotingWithERC20Token", (accounts) => {
	var contract;

	before(() => { 
		return VotingWithERC20Token.new(
				MAX_VOTE, // max. vote
				{ from: accounts[0] }
			)
		.then(function(instance) {
			contract = instance;
		})
		.then(() => {
			return contract.transfer(accounts[1], 50, { from: accounts[0] });
		})
	});


	it("should have no votes", async () => {
		for(let i = 0; i <= MAX_VOTE; i++) {
			assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0 at the beginning");
		} 
	});

	it("should not vote for too high option", async () => {
		let option = MAX_VOTE + 1;

		return contract.vote(option, 1, { from: accounts[1] }).then(() => {
			return contract.votes.call(option);
		})
		.then((voteResult) => {
			assert.fail("Voting should fail.");
		})
		.catch(async () => {
			for(let i = 0; i <= MAX_VOTE; i++) {
				assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0 at the beginning");
			}
		});
	});

	it("should vote once", async () => {
		let option = MAX_VOTE;
		
		return contract.vote(option, 1, { from: accounts[1] })
			.then(() => {
				return contract.votes.call(option);
			})
			.then(async (voteResult) => {
				assert.equal(voteResult, 1, "It should have voted 1 for option " + option);

				for(let i = 0; i < MAX_VOTE; i++) {
					if(i != option)
						assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0");
				}
			});
	});

	it("should fail when voting again with too much weight", async () => {
		let option = MAX_VOTE;
		
		return contract.vote(option, 50, { from: accounts[1] })
			.then(() => {
				assert.fail("It should have trown an expection.");
			})
			.catch((e) => {
				return contract.votes(option)
					.then(async (voteResult) => {
						assert.equal(voteResult, 1, "It should still have voted only once for option " + option);

						for(let i = 0; i < MAX_VOTE; i++) {
							if(i != option)
								assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0");
						}
					});
			});
	});


	it("should vote again, with more weight", async () => {
		let option = MAX_VOTE;
		
		return contract.vote(option, 5, { from: accounts[1] })
			.then(() => {
				return contract.votes.call(option);
			})
			.then(async (voteResult) => {
				assert.equal(voteResult, 6, "It should have voted 6 for option " + option);

				for(let i = 0; i < MAX_VOTE; i++) {
					if(i != option)
						assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0");
				}
			});
	});
});