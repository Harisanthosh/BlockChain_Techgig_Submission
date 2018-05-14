 pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;
contract AlloyChain {
    
    address public minter;
    constructor() public {
        minter = msg.sender;
    }
    struct User {
        address walletId;
        string name;
        uint aadharId;
        uint phoneNum;
        uint ethers; // ethers in their account
        uint requirementCount;
        mapping (uint => Requirement) requirements; // requirements posted by the user
        uint proposalCount;
        mapping (uint => Proposal) proposals; // proposals by the user
    }
    struct Requirement {
        address borrowerWalletId;
        uint ethers;
        uint duration; // in milliseconds
        string mortgage;
        uint proposalId; // Accepted proposalId ie Index, only borrower can set this
        uint proposalCount; // Number of proposals received
        mapping (uint => Proposal) proposals;
        uint requirementStatus; //0 - not payed, 1 = payed
    }
    struct Proposal {
        // uint requirementId; // index to requirement in allRequirements
        address lenderWalletId;
        uint startTime;
        uint endTime;
        uint interestEthers; //PM - SI
    }
    function () payable{ //fallback method
        allUsers[users_walletId[msg.sender]].ethers += msg.value; // adds ethers to the user account;
    }
    mapping (uint => User) allUsers;
    uint userCount = 0;
    mapping (address => uint256) users_walletId;
    
    mapping (uint => Requirement) allRequirements;
    uint requirementCount = 0;
    
    /*User related functions - START*/
    
    function newUser(
    string name,
    uint aadharId,
    uint phoneNum
    ) public returns (uint userId) {
        userCount++;
        User u;
        u.walletId = msg.sender;
        u.name = name;
        u.aadharId = aadharId;
        u.phoneNum = phoneNum;
        allUsers[userCount] = u;
        users_walletId[msg.sender] = userCount; // userCount is the index
        return userCount;
    }
    
    function getUserByIndex(uint256 _index) constant returns (address walletId, string name, uint aadharId) {
        return (allUsers[_index].walletId,
                allUsers[_index].name,
                allUsers[_index].aadharId);
    }
    function getUserByWalletId(address _walletId) constant returns (address walletId, string name, uint aadharId) {
        uint256 userIndex = users_walletId[_walletId];
        return (allUsers[userIndex].walletId,
                allUsers[userIndex].name, 
                allUsers[userIndex].aadharId);
    }
    
    function getUsersCount() constant returns (uint UsersCount) {
        return userCount;
    }
    
    /*User related functions - END */
    
    /*Requirement related functions - START*/
    
    function newRequirement(uint ethers, uint duration,string mortgage) returns (uint requirementId){
        Requirement r;
        r.borrowerWalletId = msg.sender;
        r.ethers = ethers;
        r.duration = duration;
        r.mortgage = mortgage;
        
        requirementCount++;
        allRequirements[requirementCount] = r;
        
        allUsers[users_walletId[msg.sender]].requirementCount++;
        allUsers[users_walletId[msg.sender]].requirements[allUsers[users_walletId[msg.sender]].requirementCount] = r;
    }
    
    function getRequirementsCount() constant returns (uint requirementId){// global requirement count 
        return requirementCount;
    }
    function getRequirementsCount(address walletId) constant returns (uint requirementId){ // requirement count for specific user
        return allUsers[users_walletId[walletId]].requirementCount;
    }
    
    // global requirement details
    function getRequirement(uint requirementId) constant returns(address borrowerWalletId, uint ethers, uint duration, string mortgage, uint proposalCount){
        return (
            allRequirements[requirementId].borrowerWalletId,
            allRequirements[requirementId].ethers,
            allRequirements[requirementId].duration,
            allRequirements[requirementId].mortgage,
            allRequirements[requirementId].proposalCount
            );
    }
    
    // Users speific requirement details
    function getRequirement(address walletId, uint requirementId) constant returns(address borrowerWalletId, uint ethers, uint duration, string mortgage, uint proposalCount){
        return (
            allUsers[users_walletId[walletId]].requirements[requirementId].borrowerWalletId,
            allUsers[users_walletId[walletId]].requirements[requirementId].ethers,
            allUsers[users_walletId[walletId]].requirements[requirementId].duration,
            allUsers[users_walletId[walletId]].requirements[requirementId].mortgage,
            allUsers[users_walletId[walletId]].requirements[requirementId].proposalCount
            );
    }
    function getRequirementStatus(uint requirementId) constant returns(uint requirementStatus){
        return (
            allRequirements[requirementId].requirementStatus
            );
    }
    function getRequirementStatus(address walletId, uint requirementId) constant returns(uint requirementStatus){
        return (
            allUsers[users_walletId[walletId]].requirements[requirementId].requirementStatus
            );
    }

    /* Requirement related functions - END */

    /* Proposal related functions - START */

//with global requirement Id
    function newProposal(uint requirementId, uint startTime, uint endTime, uint interestEthers) returns (uint proposalId_user,uint proposalId_requirement){
        Proposal p;
        // p.requirementId = requirementId;
        p.lenderWalletId = msg.sender;
        p.startTime = startTime;
        p.endTime = endTime;
        p.interestEthers = interestEthers;
        
        allUsers[users_walletId[msg.sender]].proposalCount++;
        allUsers[users_walletId[msg.sender]].proposals[allUsers[users_walletId[msg.sender]].proposalCount] = p;
        
        allRequirements[requirementId].proposalCount++;
        allRequirements[requirementId].proposals[allRequirements[requirementId].proposalCount] = p;
    }

//with user specific requirement Id
    function newProposal(address walletId, uint requirementId, uint startTime, uint endTime, uint interestEthers) returns (uint proposalId_user,uint proposalId_requirement){
        Proposal p;
        // p.requirementId = requirementId;
        p.lenderWalletId = msg.sender;
        p.startTime = startTime;
        p.endTime = endTime;
        p.interestEthers = interestEthers;
        
        allUsers[users_walletId[msg.sender]].proposalCount++;
        allUsers[users_walletId[msg.sender]].proposals[allUsers[users_walletId[msg.sender]].proposalCount] = p;
        
        allUsers[users_walletId[walletId]].requirements[requirementId].proposalCount++;
        allUsers[users_walletId[walletId]].requirements[requirementId].proposals[allUsers[users_walletId[walletId]].requirements[requirementId].proposalCount] = p;
    }

    
    function getProposalCount(uint requirementId) constant returns (uint proposalCount){
        return allRequirements[requirementId].proposalCount;
    }
    
    function getProposalCount(address walletId, uint requirementId) constant returns (uint proposalCount){
        return allUsers[users_walletId[walletId]].requirements[requirementId].proposalCount;
    }
    function getProposal(uint requirementId, uint proposalId) constant returns (
        address lenderWalletId,
        uint startTime,
        uint endTime,
        uint interestEthers){
            return (
                allRequirements[requirementId].proposals[proposalId].lenderWalletId,
                allRequirements[requirementId].proposals[proposalId].startTime,
                allRequirements[requirementId].proposals[proposalId].endTime,
                allRequirements[requirementId].proposals[proposalId].interestEthers
            );
        }
    function getProposal(address walletId, uint requirementId, uint proposalId) constant returns (
        address lenderWalletId,
        uint startTime,
        uint endTime,
        uint interestEthers){
            return (
                allUsers[users_walletId[walletId]].requirements[requirementId].proposals[proposalId].lenderWalletId,
                allUsers[users_walletId[walletId]].requirements[requirementId].proposals[proposalId].startTime,
                allUsers[users_walletId[walletId]].requirements[requirementId].proposals[proposalId].endTime,
                allUsers[users_walletId[walletId]].requirements[requirementId].proposals[proposalId].interestEthers
            );
        }
    //send user specific requirementId
    function acceptProposal(uint requirementId, uint proposalId){
        if(allUsers[users_walletId[msg.sender]].requirements[requirementId].borrowerWalletId == msg.sender && proposalId <= allUsers[users_walletId[msg.sender]].requirements[requirementId].proposalCount){
            allUsers[users_walletId[msg.sender]].requirements[requirementId].proposalId = proposalId;
            allUsers[users_walletId[msg.sender]].requirements[requirementId].borrowerWalletId.transfer(allUsers[users_walletId[msg.sender]].requirements[requirementId].ethers);
        }
    }
    // function acceptProposal(uint requirementId, uint proposalId){
    //     if(allRequirements[requirementId].borrowerWalletId == msg.sender && proposalId <= allRequirements[requirementId].proposalCount){
    //         allRequirements[requirementId].proposalId = proposalId;
    //     }
    // }
    
    //send user specific requirementId
    function repay(uint requirementId, uint proposalId){
        // if(){
            allUsers[users_walletId[msg.sender]].requirements[requirementId].proposals[proposalId].lenderWalletId.transfer(msg.value);
            allUsers[users_walletId[msg.sender]].requirements[requirementId].requirementStatus = 1;
        // }
    }
    
    /* Proposal related functions - END */
}



