pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract nftTicketing is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentId;

    bool public saleIsActive = false;
    uint256 public totalTickets = 100;
    uint256 public availableTickets = 100;
    uint256 public mintPrice = 40000000000000000;
    uint256 public eventTime;
    mapping(address => bool) public checkIns;
    mapping(address => uint256[]) public ownerTokenIDS;

    constructor() ERC721("OpenTicket", "OPNT") {
        currentId.increment();
        console.log(currentId.current());
        // owner = msg.sender;
    }

    function checkIn(address walletAddress) public {
        checkIns[walletAddress] = true;
        uint256 tokenId = ownerTokenIDS[walletAddress][0];
        string memory walletAddressString = string(
            abi.encodePacked("0x", msg.sender)
        );
        string memory robohash = string(
            abi.encodePacked(
                "https://robohash.org/",
                walletAddressString,
                tokenId
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{ "name": "OPNT #',
                        Strings.toString(tokenId),
                        '", "description": "A NFT-powered ticketing system", ',
                        '"traits": [{ "trait_type": "Checked In", "value": "true" }, { "trait_type": "Purchased", "value": "true" }], ',
                        '"image": "ipfs://Qmdw8JBQJ9VyC5ycANVEAkMzCdR7BoEsSDRPNa3xYKPHQ2/', Strings.toString(tokenId),'" }'
                    )
                )
            )
        );

        string memory tokenURI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        console.log(tokenURI);
        _setTokenURI(currentId.current(), tokenURI);
    }

    function mint() public payable {
        require(
            availableTickets > 0,
            "There are not enough tickets available!"
        );
        require(msg.value >= mintPrice, "Insufficient ETH in wallet!");
        require(saleIsActive, "Currently, there are no tickets on sale.");

        string[5] memory svg;
        svg[
            0
        ] = '<svg viewBox=" 0 0 100 100" xmlns="https://www.w3.org/2000/svg"><text y="50">';
        svg[1] = Strings.toString((currentId.current()));
        svg[2] = "</text></svg>";

        string memory image = string(abi.encodePacked(svg[0], svg[1], svg[2]));

        string memory encodedImage = Base64.encode(bytes(image));
        console.log(encodedImage);
        string memory walletAddressString = string(
            abi.encodePacked("0x", msg.sender)
        );
        string memory robohash = string(
            abi.encodePacked(
                "https://robohash.org/",
                walletAddressString,
                Strings.toString(currentId.current())
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{ "name": "OPNT #',
                        Strings.toString(currentId.current()),
                        '", "description": "A NFT-powered ticketing system", ',
                        '"traits": [{ "trait_type": "Checked In", "value": "false" }, { "trait_type": "Purchased", "value": "true" }], ',
                        '"image": "ipfs://Qmdw8JBQJ9VyC5ycANVEAkMzCdR7BoEsSDRPNa3xYKPHQ2/', Strings.toString(currentId.current()),'" }'
                    )
                )
            )
        );

        string memory tokenURI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        console.log(tokenURI);

        _safeMint(msg.sender, currentId.current());
        _setTokenURI(currentId.current(), tokenURI);

        currentId.increment();
        availableTickets = availableTickets - 1;
    }

    function availableTicketCount() public view returns (uint256) {
        return availableTickets;
    }

    function totalTicketCount() public view returns (uint256) {
        return totalTickets;
    }

    function openSale() public onlyOwner {
        saleIsActive = true;
    }

    function closeSale() public onlyOwner {
        saleIsActive = false;
    }

    function confirmOwnership(address walletAddress)
        public
        view
        returns (bool)
    {
        return ownerTokenIDS[walletAddress].length > 0;
    }

    // uint256 ticketPrice = 1 wei;
    // address owner;
    // mapping(address => uint256) public ticketHolders;

    // function buyTickets(address _user, uint256 _amount) public payable {
    //     require(msg.value >= ticketPrice * _amount, "Value incorrect!");
    //     addTickets(_user, _amount);
    // }

    // function useTickets(address _user, uint256 _amount) public {
    //     subTickets(_user, _amount);
    // }

    // function addTickets(address _user, uint256 _amount) internal {
    //     ticketHolders[_user] = ticketHolders[_user] + _amount;
    // }

    // function subTickets(address _user, uint256 _amount) internal {
    //     require(
    //         ticketHolders[_user] >= _amount,
    //         "You do not have enough tickets!"
    //     );
    //     ticketHolders[_user] = ticketHolders[_user] - _amount;
    // }

    // function withdraw() public {
    //     require(msg.sender == owner, "You are not the owner!");
    //     (bool success, ) = payable(owner).call{value: address(this).balance}(
    //         ""
    //     );
    //     require(success);
    // }

    // receive() external payable {}

    // fallback() external payable {}
}
