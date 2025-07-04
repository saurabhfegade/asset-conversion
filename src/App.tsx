import AssetConverter from './components/AssetConverter';
import { Flex } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';

function App() {
  return (
    <Flex
      minH="100vh"
      w="100vw"
      align="center"
      justify="center"
      px={2}
      bg={{ base: 'white', _dark: 'gray.900' }}
      color={{ base: 'gray.900', _dark: 'white' }}
      position="relative"
    >
      <ColorModeButton
        style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
        color={{ base: 'gray.900', _dark: 'black' }}
      />
      <AssetConverter />
    </Flex>
  );
}

export default App;
