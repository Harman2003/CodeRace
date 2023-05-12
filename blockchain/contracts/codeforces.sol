// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import {Array} from "https://github.com/ClementWalter/eth-projects-monorepo/blob/main/packages/eth-projects-contracts/contracts/lib/utils/Array.sol";


contract Codeforces is ChainlinkClient, AutomationCompatibleInterface{
    using EnumerableSet for EnumerableSet.UintSet;
    using Chainlink for Chainlink.Request;
    using Array for string[];
    using Strings for uint256;

    string constant jobId1 = "b25b7d28184a4f4d8dd33009bbeda4e1";
    string constant jobId1 = "a56c23c069b446a5bfd3b5fc91383991";

    uint public contestCount;              // contest Id creator
    uint public upkeepCounter;             // no. of times upkeep happen
    uint public immutable interval;        // interval of checkupkeep
    uint public lastUpkeepTime;            // last upkeep time
    uint private constant ORACLE_FEE=0;    // Job Fee in LINK
    string[] public waitingPlayersList;     // winners waitingList
    uint[] public prizeDistributionList;     // prizes waitingList
    uint public waitingContestId;          // contest successfully completed
    string public _winnersUrl;             // adapter URL for players rank list 
    string public _distUrl;                // prize Distribution URL 
    
    struct Contest{
        address owner;                           //Contest Creator
        bool created;                            //useful to check if contest is present in contestMapping
        uint contestId;                          //CF contestId
        uint startTime;                          //UNIX time in seconds 
        uint duration;                           //duration in seconds
        uint errorCount;                         //incase contest has been removed from CF (we'll check it 2 times, then remove)
        bool global;                             //Contest - Private or Global
        string[] allowedColleges;                //Colleges allowed to participate - only if Private contest
        uint prizeValue;                         //prize money in Eth
        string prizeDistribution;                //prize distribution stringified object
        uint fee;                                //amount to pay to enter contest
        string[] blacklist;                      //not allowed CF accounts 
        uint playerCount;                        //player count
        string[] userKeys;                       //CF usernames to help delete the mapping participants, when needed
        mapping (string=>address) participants;  // players list
    }

    mapping(uint => Contest) public contestMapping;
    EnumerableSet.UintSet private contestSet;

    constructor(uint updateInterval) {
          // ethereum-sepolia
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0x2362A262148518Ce69600Cc5a6032aC8391233f5);
        contestCount=0;
        upkeepCounter=0;
        interval= updateInterval;
        lastUpkeepTime= block.timestamp;
        _winnersUrl= "https://chainlink-adapter-git-main-harman2003.vercel.app";
        _distUrl= "https://chainlink-adapter-git-main-harman2003.vercel.app/prizes";
    }

    function getParticipants(uint id, string calldata handle) public view returns(address){
       return contestMapping[id].participants[handle];
    }
    function getAllowedColleges(uint id) public view returns(string[] memory){
       return contestMapping[id].allowedColleges;
    }
    function getBlackList(uint id) public view returns(string[] memory){
       return contestMapping[id].blacklist;
    }

    function createContest(uint contestId, uint startTime, uint duration, bool global, string[] memory allowedColleges, string[] memory blacklist, string calldata prizeDistribution, uint fee) public payable returns(uint){
        require(startTime>block.timestamp , "The Contest has been already started");

        Contest storage newContest= contestMapping[contestCount];
        contestSet.add(contestCount);

            newContest.owner=msg.sender;
            newContest.contestId= contestId;
            newContest.startTime= startTime;
            newContest.duration= duration;
            newContest.global= global;
            newContest.allowedColleges= allowedColleges;
            newContest.blacklist= blacklist;
            newContest.prizeValue= msg.value;
            newContest.prizeDistribution= prizeDistribution;
            newContest.fee= fee;
            newContest.created= true;

        contestCount= contestCount+1;
        return contestCount-1;
    }

    function editContest(uint uniqueId, string calldata newPrizeDist, string[] calldata blacklistIds) public payable onlyCreator(uniqueId) notStartedYet(uniqueId){
        Contest storage competition= contestMapping[uniqueId];
        competition.prizeValue= competition.prizeValue+ msg.value;
        mapping(string=>address) storage participants= competition.participants;
        if(bytes(newPrizeDist).length > 0){
        competition.prizeDistribution= newPrizeDist;
        }
        for(uint i=0; i<blacklistIds.length; i++){
            string calldata blacklistId= blacklistIds[i];
            if(participants[blacklistId]!= address(0)){
                competition.blacklist.push(blacklistId);
                address payable player= payable(participants[blacklistId]);
                player.transfer(competition.fee); // check if transfer fails and how much gas is actually needed to send to external account. Also see if looping to transfer eth is ok or not . because one wrong can lead to all stop
                competition.playerCount= competition.playerCount-1;
                delete participants[blacklistId];
            }
        }
    }

    function deleteContest(uint uniqueId) public onlyCreator(uniqueId) notStartedYet(uniqueId){
        Contest storage competition= contestMapping[uniqueId];
        require(competition.created==true, "This contest does not exists");
        require(block.timestamp<competition.startTime || competition.playerCount==0, "The contest has already started");

        // delete the mapping inside our Contest using userKeys
        string[] storage userKeys= competition.userKeys;
        mapping (string=> address) storage participants= competition.participants;

        for(uint i=0; i<userKeys.length; i++){
            address payable player= payable(participants[userKeys[i]]);
            player.transfer(competition.fee);
            delete participants[userKeys[i]];
        }

        payable(competition.owner).transfer(competition.prizeValue);

        contestSet.remove(uniqueId);
        delete contestMapping[uniqueId];
    }

    function joinContest(string calldata handle, string calldata college, uint contestCountId) public payable notStartedYet(contestCountId) {

        //contest to join
        Contest storage competition= contestMapping[contestCountId];
        string[] storage allowedColleges= competition.allowedColleges;
        string[] storage blacklist= competition.blacklist;
        mapping (string => address) storage participants= competition.participants;
        bool isAllowedParticipant= false;

        // sent enough ether to join
        require(competition.fee==msg.value);
        //check if already participated
        require(participants[handle]==address(0), "You are already registered");

       // it might be costly
        for(uint i=0; i<allowedColleges.length; i++){
            if(compare(allowedColleges[i], college)){
                isAllowedParticipant=true;
                break;
            }
        }

        require((isAllowedParticipant || competition.global), "You don't fulfill the criteria to join this contest");
        isAllowedParticipant=true;

        for(uint i=0; i<blacklist.length; i++){
            if(compare(blacklist[i], handle)){
                isAllowedParticipant=false;
                break;
            }
        }
       
       //check all conditions met to join
       require(isAllowedParticipant, "You are banned from this contest");

       competition.userKeys.push(handle);
       participants[handle]= msg.sender;
       competition.playerCount= competition.playerCount+1;
    }

    function declineContest(string calldata handle, uint contestCountId) public notStartedYet(contestCountId) {
        Contest storage contest= contestMapping[contestCountId];
        mapping (string => address) storage participants= contest.participants;

        require(participants[handle]==msg.sender, "You are not present in the participant list");

        address payable player= payable(participants[handle]);
         player.transfer(contest.fee);
         contest.playerCount= contest.playerCount-1;
        delete participants[handle];     
    }

     //  function checkUpkeep(
    //     bytes calldata /* checkData */
    // )
    //     external
    //     view
    //     override
    //     returns (bool upkeepNeeded, bytes memory Id)
    // {
    //     bool isTime= (block.timestamp - lastUpkeepTime) > interval;

    //     // check if any contest completed 
    //     bool hasCompleted;
    //     for(uint i=0; i<contestSet.length(); i++){
    //         Contest contest= contestMapping[contestSet[i]];
    //         uint endTime= contest.startTime+contest.duration;
    //         if(endTime < block.timestamp){
    //             hasCompleted=true;
    //             Id= bytes.concat(bytes32(contestSet[i]));
    //             break;
    //         }
    //     }

    //     upkeepNeeded= (isTime && hasCompleted);
    // }

    //  function performUpkeep(bytes calldata Id) external override {
    //     bool upkeepNeeded= (block.timestamp - lastUpkeepTime) > interval;
    //     require(upkeepNeeded, "Time interval not met");
    //     lastUpkeepTime = block.timestamp;
    //     upkeepCounter = upkeepCounter + 1;

    // }

    function requestPlayersList() public {
        Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(abi.encodePacked(jobId1)),
            address(this),
            this.fulfillPlayersList.selector
        );
        req.add("get", winnersUrlConcat());
        req.add("path", "data");
        sendOperatorRequest(req, ORACLE_FEE);
    }

    function fulfillPlayersList(
        bytes32 requestId,
        bytes[] memory _arrayOfPlayers
    ) public recordChainlinkFulfillment(requestId) {
        // clear waitingList
        delete waitingPlayersList;
        for(uint i=0; i<_arrayOfPlayers.length; i++){
            waitingPlayersList.push(string(_arrayOfPlayers[i]));
        }
        requestPrizeDist();
    }

    function requestPrizeDist() public {
        Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(abi.encodePacked(jobId2)),
            address(this),
            this.fulfillPrizeDist.selector
        );
        req.add("get", prizeUrlConcat());
        req.add("path", "data");
        sendOperatorRequest(req, ORACLE_FEE);
    }

    function fulfillPrizeDist(
        bytes32 requestId,
        uint256[] memory prizeDistribution
    ) public recordChainlinkFulfillment(requestId) {
      prizeDistributionList= prizeDistribution;
    }

     function prizeUrlConcat() private view returns(string memory){
        Contest storage contest= contestMapping[waitingContestId];
        return string.concat(_distUrl, "?id=", waitingContestId.toString(), "&playerCount=", (contest.playerCount).toString(), "&dist=", contest.prizeDistribution);
     }

     function winnersUrlConcat() private returns(string memory){
        Contest storage contest= contestMapping[waitingContestId];
        string[] memory userKeys= contest.userKeys;

        // array of all handle names
        for(uint i=0; i<userKeys.length; i++){
            string memory handle= userKeys[i];
            if(!compare(handle, "")){
                waitingPlayersList.push(handle);
            }
        }

        return string.concat(_winnersUrl, "?contestId=",waitingContestId.toString(), "&handles=", waitingPlayersList.join(";"));
     }
    
     function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    
    modifier onlyCreator(uint contestId) {
        Contest storage competition = contestMapping[contestId];
        require(msg.sender==competition.owner, "This operation is forbidden");
        _;
    }
    
    modifier notStartedYet(uint contestId){
        Contest storage competition = contestMapping[contestId];
        require(competition.created==true, "This contest does not exists");
        require(block.timestamp<competition.startTime, "The contest has already started");
        _;
    }

}
