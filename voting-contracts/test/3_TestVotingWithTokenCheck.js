const VotingWithTokenCheck = artifacts.require("VotingWithTokenCheck");

const MAX_VOTE = 5; // must be >= 2!

contract("VotingWithTokenCheck", (accounts) => {
	var contract;

	before(() => { 
		return VotingWithTokenCheck.new(
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

	it("should fail w/o token", async () => {
		let option = MAX_VOTE;
		
		return contract.vote(option, { from: accounts[0] })
			.then(() => {
				assert.fail("Voting w/o token should fail.")
			})
			.catch((e) => {
				return contract.vote(option, "invalid", { from: accounts[0] });
			})
			.then(() => {
				assert.fail("Voting with invalid token should fail.");
			})
			.catch(async (e) => {
				for(let i = 0; i <= MAX_VOTE; i++) {
					assert.equal(await contract.votes.call(i), 0, "votes[" + i + "] should be 0");
				} 
			});
	});

	let privateToken1;
	it("should vote once", async () => {
		let option = MAX_VOTE;
		let tooHigh = MAX_VOTE + 1;
		
		let NEW_TOKEN = "abc123";

		return contract.generatePrivateToken(NEW_TOKEN, { from: accounts[0] })
			.then((_privateToken) => {
				privateToken1 = _privateToken;
				return contract.generatePublicToken(_privateToken, { from: accounts[0] });
			})
			.then((_publicToken) => {
				return contract.addToken(_publicToken, { from: accounts[0] });
			}).then(() => {
				return contract.vote(tooHigh, privateToken1, { from: accounts[0] });
			}).then(() => {
				assert.fail("Should fail because of too high option.");
			}).catch(() => {
				return contract.vote(option, privateToken1, { from: accounts[0] });
			})
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
		
		return contract.vote(option, privateToken1, { from: accounts[0] })
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
		
		return contract.vote(option, privateToken1, { from: accounts[0] })
			.then(() => {
				assert.fail("It should have trown an expection.");
			}).catch((e) => {
				// NOP
			});
	});
});