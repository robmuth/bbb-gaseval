pragma solidity >=0.5.0 <0.6.0;

/* MIT Licence:

Copyright (c) 2018-2019 TU Berlin, DSI https://www.dsi.tu-berlin.de

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

contract BBB_Owned {
    address payable internal dsi;
    address payable internal urd;

    address internal crawler;

    address[] authorities;
    uint256 authoritiesSize = 0;

    bool public suspended = false;

    constructor(address payable _dsi, address payable _urd) internal { 
        dsi = _dsi;
        urd = _urd;
    }

    function changeOwner(address payable _dsi, address payable _urd) public ownerOnly {
        dsi = _dsi;
        urd = _urd;
    }

    function isOwner(address payable _sender) view internal returns (bool) {
        return _sender == dsi || _sender == urd;
    }

    modifier ownerOnly() { 
        require(isOwner(msg.sender), "Owner only"); 
        _;
    }

    function destroy() public ownerOnly {
        assert(msg.sender == dsi || msg.sender == urd); // Just to be save 
        selfdestruct(msg.sender);
    }

    // Suspension
    modifier altering() { 
        require(!suspended); 
        _;
    }

    event Suspension (
        bool indexed suspended
    );
    
    function suspend() public authorityOnly {
        suspended = true;
        emit Suspension(true);
    }

    function unsuspend() public ownerOnly {
        suspended = false;
        emit Suspension(false);
    }

    // Crawler Modifier
    function setCrawler(address _crawler) public ownerOnly altering { crawler = _crawler; }
    function isCrawler(address _sender) internal view returns (bool) { return crawler != address(0) && _sender == crawler; }

    // Authorities
    function addAuthority(address _authority) public ownerOnly altering {
        assert(authoritiesSize < 2**256 - 1);

        // Check for uniques
        for(uint i = 0; i < authoritiesSize; i++) {
            if(authorities[i] == _authority)
                revert();
        }   

        authorities.push(_authority);
        authoritiesSize++;
    }

    function removeAllAuthorities() public ownerOnly altering {
        for(uint i = authoritiesSize - 1; i >= 0; i--) {
            delete authorities[i];
        }

        authoritiesSize = 0;
        authorities.length = 0;
    }

    function removeAuthority(address _authority) public altering {
        // Check for owner or the athority itself
        require(isOwner(msg.sender) || (_authority == msg.sender && isAuthority(msg.sender)));
        require(authoritiesSize > 0);
        
        // Note: only removes 1 item -- even if the authority is contained multiple times

        uint foundIndex = 0;
        bool found = false;
        for(uint i = 0; i < authoritiesSize - 1; i++) {
            if(!found && authorities[i] == _authority) {
                foundIndex = i;
                found = true;
            }

            if(found) {
                authorities[i] = authorities[i + 1];
            }
        }

        if(!(found || authorities[authoritiesSize - 1] == _authority)) { 
            revert();
        } else {
            delete authorities[authorities.length - 1];
            authorities.length--;
            authoritiesSize--;
        }
    }

    function isAuthority(address _authority) public view returns (bool) {
        for(uint i = 0; i < authoritiesSize; i++) {
            if(authorities[i] == _authority)
                return true;
        }

        return false;
    }

    modifier crawlerOnly() {
        require(isCrawler(msg.sender) || isOwner(msg.sender)); 
        _;
    }

    modifier authorityOnly() {
        require(isAuthority(msg.sender) || isOwner(msg.sender)); 
        _;
    }

    modifier authorityOrCrawlerOnly() {
        require(isAuthority(msg.sender) || isCrawler(msg.sender) || isOwner(msg.sender)); 
        _;
    }
}