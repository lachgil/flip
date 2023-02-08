pragma solidity ^0.8.0;
contract FlyFlip {
    // Enum to represent the state of a bet
    enum State { BETTING, SETTLED }
    // Struct to represent a bet
    struct Bet {
        address payable player1;
        address payable player2;
        uint256 betAmount;
        uint8 player1Choice;
        uint8 player2Choice;
        uint8 coinTossResult;
        State state;
    }
    // Mapping from bet id to bet
    mapping(uint256 => Bet) public bets;
    uint256 public betCount = 0;
    // Add a new bet
    function addBet(uint256 _betId, uint256 _betAmount, uint8 _player1Choice) public payable {
        // Make sure the player has enough funds
        require(msg.value == _betAmount, "The bet amount does not match the value sent with the transaction");
        // Make sure the betting is still open for this bet id
        require(bets[_betId].state == State.BETTING, "Betting is closed for this bet id");
        // Add the bet
        bets[_betId].player1 = payable(msg.sender);
        bets[_betId].betAmount = _betAmount;
        bets[_betId].player1Choice = _player1Choice;
        bets[_betId].state = State.SETTLED;
        betCount += 1;
    }
    // Place a bet
    function placeBet(uint256 _betId, uint256 _betAmount, uint8 _player2Choice) public payable {
        // Make sure the player has enough funds
        require(msg.value == _betAmount, "The bet amount does not match the value sent with the transaction");
        // Make sure the betting is still open for this bet id
        require(bets[_betId].state == State.SETTLED, "Betting is closed for this bet id");
        // Add the bet
        bets[_betId].player2 = payable(msg.sender);
        bets[_betId].betAmount = _betAmount;
        bets[_betId].player2Choice = _player2Choice;
        // Toss a coin to determine the outcome
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, _betId)));
        bets[_betId].coinTossResult = randomNumber % 2 == 0 ? 0 : 1;
        // Settle the bet
        uint8 winner = bets[_betId].coinTossResult == bets[_betId].player1Choice ? 1 : 2;
        if (winner == 1) {
            bets[_betId].player1.transfer(bets[_betId].betAmount * 2);
        } else {
            bets[_betId].player2.transfer(bets[_betId].betAmount * 2);
        }
    }
    function getAllBets() public view returns (Bet[] memory) {
        Bet[] memory result = new Bet[](betCount);
        uint256 i = 0;
        for (uint256 betId = 0; betId < betCount; betId++) {
            if (bets[betId].state == State.BETTING) {
                result[i] = bets[betId];
                i++;
            }
        }
        return result;
    }
}