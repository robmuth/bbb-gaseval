const VotingWithSenderCheck = artifacts.require("VotingWithSenderCheck");

const MAX_VOTE = 5; // must be >= 2!

contract("VotingWithSenderCheck", (accounts) => {
	var contract;

	before(() => { 
		return VotingWithSenderCheck.new(
				MAX_VOTE, // max. vote
			)
			.then(function(instance) {
				contract = instance;
			});
		
	});


	it("should have no votes", async () => {
		for(let i = 0; i <= MAX_VOTE; i++) {
			assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0 at the beginning");
		} 
	});

	it("should not vote for too high option", async () => {
		let option = MAX_VOTE + 1;
		return contract.vote(option, { from: accounts[0] }).then(() => {
			return contract.votes(option);
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
		
		return contract.vote(option, { from: accounts[0] })
			.then(() => {
				return contract.votes(option);
			})
			.then(async (voteResult) => {
				assert.equal(voteResult, 1, "It should have voted 1 for option " + option);

				for(let i = 0; i < MAX_VOTE; i++) {
					if(i != option)
						assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0");
				}
			});
	});

	it("should fail when voting again, a second time", async () => {
		let option = MAX_VOTE;
		
		return contract.vote(option, { from: accounts[0] })
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

	it("should not vote for another option", async () => {
		let option = MAX_VOTE - 1;
		
		return contract.vote(option, { from: accounts[0] })
			.then(() => {
				assert.fail("It should have trown an expection.");
			}).catch((e) => {
				// NOP
			});
	});

});