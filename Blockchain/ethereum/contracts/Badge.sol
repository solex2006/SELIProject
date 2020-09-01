pragma solidity ^0.4.19;

contract BadgeRegistry {
    address[] public registeredBadges;
    event ContractCreated(address contractAddress);
    function createBadge(string _id, string _ownerIdentity,string _badgeClassId,  uint _date) public {
        address newBadge = new Badge(msg.sender, _id,_ownerIdentity, _badgeClassId, _date);
        emit ContractCreated(newBadge);
        registeredBadges.push(newBadge);
    }

    function getDeployedBadges() public view returns (address[]) {
        return registeredBadges;
    }
}

/**
 * @title Badge
 * @dev The Badge contract provides basic storage for student's badges
 */
contract Badge {
 
    // Owner address, gonja be used later in the refactorization of student id's in blockchain
    address public owner;

    /// Badge details
    string public id;
    string public ownerIdentity;
    string public badgeClassId;
    uint public date;

    /**
    * @dev Throws if called by any account other than the owner
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    /**
    * @dev Constructor sets the original `owner` of the contract to the sender account, and
    * commits the Badge details and vows to the blockchain
    */
    function Badge(address _owner, string _id,string _ownerIdentity,string _badgeClassId, uint _date) public {
        // TODO: Assert statements for year, month, day
        owner = _owner;
        id = _id;
        ownerIdentity = _ownerIdentity;
        badgeClassId = _badgeClassId;
        date = _date;
    }
    
    /**
    * @dev returns contract metadata in one function call, rather than separate .call()s
    * Not sure if this works yet
    */
    function getBadgeDetails() public view returns (
        address, string, string,string, uint) {
        return (
            owner,
            id,
            ownerIdentity,
            badgeClassId,
            date
        );
    }
}