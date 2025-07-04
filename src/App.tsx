import AssetConverter from './components/AssetConverter';
import { Flex } from '@chakra-ui/react';

function App() {
  return (
    <Flex minH="100vh" w="100vw" align="center" justify="center" px={2}>
      <AssetConverter />
    </Flex>
  );
}

export default App;
