# open-ticket
![](./src/images/logo.png)

## NFT Event Ticketing System

[![pages-build-deployment](https://github.com/kprohith/open-ticket/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/kprohith/open-ticket/actions/workflows/pages/pages-build-deployment)

## Get started

1. Clone the repo to you local system

```bash
git clone https://github.com/kprohith/open-ticket.git
```

2. Open the directory

```bash
cd open-ticket
```

3. Install the required node modules

```bash
yarn install
```

4. Set the value of `REACT_APP_CONTRACT_ID`

```env
# .env.development.local

REACT_APP_CONTRACT_ID=0x1234567890
```

5. Start the development server

```bash
yarn start
```
## Functionality implemented until now:

1. Components

1.1 A starter-template homepage that shows a buy button to buy a ticket.

1.2 A Connect/Disconnect button to interface with Metamask wallets.

1.3 Admin-accessible Check In page to verify ownership of user tickets/nfts.

1.4 Admin-accessible Settings page to OPEN/CLOSE sale of tickets.

1.5 Your Tickets page to show the user's tickets/nfts.

2. The process of "buying" a ticket will mint an ERC720 NFT.
3. Metamask has been integrated for users to connect and perform transactions.
4. Once a user connects their Metamask wallet using the connect button, they can proceed to BUY a ticket, pay the transaction fee and secure a ticket which will result in a NFT being minted and written to the blockchain.
5. The user can then go to the Your Tickets page to check their ticket.
6. Only Admin(owner of the smart contract) can open/close sales.
7. In browser toast pop-ups direct to Etherscan to verify transactions on the blockchain.
8. Ownership of NFTs can be verify on OpenSea.
9. Admins can scan the wallet QR code of a user to verify ownership of the ticket and Check in the user.
10. Once checked-in, the metadata of the ticket on the blockchain is updated to show that the user has checked in.
