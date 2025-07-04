import AssetConverter from './components/AssetConverter';
import {
  Flex,
  Box,
  Portal,
  Select,
  createListCollection,
  createOverlay,
  Dialog,
  Text,
  Button,
} from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';
import { useState } from 'react';

const NETWORKS = [
  { label: 'Ethereum', value: 'ethereum' },
  { label: 'Arbitrum', value: 'arbitrum' },
  { label: 'Polygon', value: 'polygon' },
];

interface NetworkModalProps {
  network: string;
}

const NETWORK_LABELS: Record<string, string> = {
  arbitrum: 'Arbitrum',
  polygon: 'Polygon',
  ethereum: 'Ethereum',
};

const networkCollection = createListCollection({ items: NETWORKS });

const dialog = createOverlay<NetworkModalProps>((props) => {
  const { network, ...rest } = props;
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Unsupported Network</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              <Dialog.Description>
                <Text mb={4}>
                  The selected network{' '}
                  <b>{NETWORK_LABELS[network] || network}</b> is not supported
                  for WBTC conversion.
                  <br />
                  Please switch to <b>Ethereum</b> to use the converter.
                </Text>
              </Dialog.Description>
              <Button
                color="blue"
                onClick={() => dialog.close('network-modal')}
              >
                Close
              </Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

function App() {
  const [network, setNetwork] = useState('ethereum');

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
      <Box position="absolute" top={4} right={16} zIndex={10}>
        <Select.Root
          value={[network]}
          onValueChange={(details) => {
            const selected = details.items[0]?.value || 'ethereum';
            setNetwork(selected);
            // Only open modal if not ethereum
            dialog.open('network-modal', {
              network: selected,
            });
          }}
          size="sm"
          collection={networkCollection}
          width="130px"
        >
          <Select.HiddenSelect />
          <Select.Control color="black">
            <Select.Trigger>
              <Select.ValueText placeholder="Select network" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content
                color="black"
                bg={{ base: 'gray.100', _dark: 'white' }}
              >
                {NETWORKS.map((n) => (
                  <Select.Item item={n} key={n.value}>
                    {n.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
      <ColorModeButton
        style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
        color="black"
      />
      {network === 'ethereum' ? <AssetConverter /> : <dialog.Viewport />}
    </Flex>
  );
}

export default App;
