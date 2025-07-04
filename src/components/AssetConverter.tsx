import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import CurrencyInput from './CurrencyInput';
import ConversionResult from './ConversionResult';
import { useBitcoinPrice } from '../hooks/useBitcoinPrice';
import { useWbtcMeta } from '../hooks/useErc20Meta';
import { CURRENCY_META, type Currency } from '../types/currency';
import {
  toBigNumber,
  isValidDecimal,
  formatBigNumber,
} from '../utils/bignumber';
import { formatUSD } from '../utils/format';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';

const AssetConverter: React.FC = () => {
  const [mode, setMode] = useState<Currency>('USD');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const {
    price: btcPrice,
    loading,
    error: priceError,
    lastSynced,
    refetch,
  } = useBitcoinPrice();
  const {
    meta: wbtcMeta,
    loading: wbtcLoading,
    error: wbtcError,
  } = useWbtcMeta();
  const meta = CURRENCY_META[mode];
  const other = mode === 'USD' ? 'WBTC' : 'USD';
  const otherMeta = CURRENCY_META[other];

  // Use fetched wBTC symbol/decimals if mode or other is WBTC
  const symbol = mode === 'WBTC' && wbtcMeta ? wbtcMeta.symbol : meta.symbol;
  const decimals =
    mode === 'WBTC' && wbtcMeta ? Number(wbtcMeta.decimals) : meta.decimals;
  const otherSymbol =
    other === 'WBTC' && wbtcMeta ? wbtcMeta.symbol : otherMeta.symbol;
  const otherDecimals =
    other === 'WBTC' && wbtcMeta
      ? Number(wbtcMeta.decimals)
      : otherMeta.decimals;

  const maxDecimals = decimals ?? 2;
  const isInputValid = input === '' || isValidDecimal(input, maxDecimals);

  const handleConvert = () => {
    setError(null);
    setResult('');
    if (!btcPrice) {
      setError('Bitcoin price unavailable.');
      return;
    }
    if (mode === 'WBTC' && (!wbtcMeta || wbtcLoading)) {
      setError('WBTC metadata unavailable.');
      return;
    }
    if (!isInputValid || input === '' || isNaN(Number(input))) {
      setError(`Please enter a valid ${symbol} amount.`);
      return;
    }
    try {
      const inputBN = toBigNumber(input);
      let outputBN;
      if (mode === 'USD') {
        outputBN = inputBN.dividedBy(btcPrice);
        setResult(
          `Amount of ${otherSymbol}: ${formatBigNumber(
            outputBN,
            otherDecimals ?? 8
          )} tokens`
        );
      } else {
        outputBN = inputBN.multipliedBy(btcPrice);
        setResult(
          `Amount of USD: ${formatBigNumber(outputBN, otherDecimals ?? 2)}`
        );
      }
    } catch (e) {
      console.error(e);
      setError('Conversion error. Please check your input.');
    }
  };

  const handleSwitch = () => {
    setInput('');
    setResult('');
    setError(null);
    setMode(other);
  };

  let fetchError: string | null = null;
  if (mode === 'WBTC') {
    if (wbtcError) fetchError = `Failed to load WBTC metadata: ${wbtcError}`;
    else if (wbtcLoading) fetchError = 'Loading WBTC metadata...';
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="60vh"
      px={2}
      w="100%"
    >
      <VStack
        w={{ base: '100%', sm: '400px' }}
        p={6}
        align="center"
        justify="center"
        borderRadius="lg"
        boxShadow="lg"
        bg={{ base: 'gray.50', _dark: 'gray.800' }}
        maxW="100%"
      >
        <HStack justify="center" align="center" mb={4}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            {mode}
          </Text>
          <IconArrowRight />
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            {other}
          </Text>
        </HStack>
        <CurrencyInput
          value={input}
          onChange={(val) => {
            if (val === '' || isValidDecimal(val, maxDecimals)) setInput(val);
          }}
          mode={mode}
          iconUrl={mode === 'WBTC' ? meta.iconUrl : undefined}
          label={`Amount in ${symbol}`}
          isInvalid={!isInputValid && input !== ''}
        />
        <Flex mt={4} justify="space-between" align="center" w="100%">
          <Button
            onClick={handleSwitch}
            variant="outline"
            bg={{ base: 'gray.100', _dark: 'gray.700' }}
            border="none !important"
            _focus={{
              border: 'none !important',
              outline: 'none !important',
            }}
            _hover={{
              boxShadow: 'sm !important',
              outline: 'none !important',
            }}
            size="sm"
            w="48%"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            Switch Currencies
          </Button>
          <Button
            variant="solid"
            color={{ base: 'white', _dark: 'gray.900' }}
            bg={{ base: '#996FF5', _dark: '#b794f4' }}
            border="none !important"
            w="48%"
            _hover={{
              boxShadow: 'sm !important',
              outline: 'none !important',
            }}
            _focus={{
              border: 'none !important',
              outline: 'none !important',
            }}
            _disabled={{
              cursor: 'not-allowed',
              border: 'none !important',
            }}
            onClick={handleConvert}
            loading={loading}
            disabled={loading || !input || !isInputValid}
          >
            Convert to {otherSymbol}
          </Button>
        </Flex>
        {loading ? (
          <Flex justify="center" mt={4}>
            <Spinner color={{ base: '#996FF5', _dark: '#b794f4' }} />
          </Flex>
        ) : null}
        <Box mt={4} w="100%">
          <ConversionResult
            result={result}
            error={error || priceError || fetchError}
          />
        </Box>
        <Box
          mt={4}
          fontSize="sm"
          color={{ base: 'gray.500', _dark: 'gray.400' }}
          textAlign="center"
        >
          {btcPrice && <Text>Current BTC Price: {formatUSD(btcPrice)}</Text>}
          {lastSynced && (
            <HStack justify="center" align="center" w="100%">
              <Text fontSize="xs">
                Last synced: {lastSynced.toLocaleTimeString()}
              </Text>
              <IconButton
                onClick={refetch}
                size="xs"
                variant="ghost"
                disabled={loading}
                aria-label="Refresh BTC price"
                bg={{ base: 'gray.100', _dark: 'gray.900' }}
                // height="auto"
                color={{ base: '#996FF5', _dark: '#b794f4' }}
              >
                <IconRefresh size={4} />
              </IconButton>
            </HStack>
          )}
        </Box>
      </VStack>
    </Flex>
  );
};

export default AssetConverter;
