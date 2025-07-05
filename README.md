# Asset Conversion App (USD <-> wBTC)

A modern, responsive React + TypeScript app for converting between USD and Wrapped Bitcoin (wBTC) using live price data and on-chain token metadata. Built with Chakra UI v3, ethers.js, and Vite.

## Additional Notes

- Switching network from top right from Ethereum to Arbitrum or Polygon will show a modal with a message that the network is not supported for WBTC conversion.
- Uncomment the throw error in `fetchErc20Meta` in `src/utils/erc20.ts` to see how the app handles errors.
- There is functionality to also show last synced time for the BTC price, and refresh it.
- Supports Light and Dark mode.

## Features

- **Live USD <-> wBTC conversion** using Coingecko API and on-chain wBTC contract data
- **Dark mode** with a theme switcher (Chakra UI v3 color mode system)
- **Responsive, accessible UI** with Chakra UI components
- **Robust error handling** for API and network issues
- **Web3 awareness**: placeholder for wallet/network detection
- **Precision handling**: 2 decimals for USD, 8 for wBTC
- **Refreshable BTC price** with last synced time

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Run the development server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### 3. Build for production

```sh
npm run build
```

### 4. Lint the code

```sh
npm run lint
```

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast dev/build
- [Chakra UI v3](https://chakra-ui.com/) for UI and theming
- [ethers.js](https://docs.ethers.org/) for on-chain wBTC metadata
- [Coingecko API](https://www.coingecko.com/en/api) for live BTC price

## Project Structure

- `src/components/` - UI components (converter, input, result, etc.)
- `src/hooks/` - Custom React hooks (BTC price, wBTC metadata)
- `src/utils/` - Utility functions (API, formatting, math)
- `src/types/` - TypeScript types
