import React from 'react';
import { Input, InputGroup, Text } from '@chakra-ui/react';
import { CURRENCY_META, type Currency } from '../types/currency';

interface CurrencyInputProps {
  value: string;
  onChange: (val: string) => void;
  mode: Currency;
  iconUrl?: string;
  label?: string;
  isInvalid?: boolean;
  placeholder?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  mode,
  iconUrl,
  label,
  isInvalid,
  placeholder,
}) => {
  const endElement = iconUrl ? (
    <img src={iconUrl} alt="token icon" style={{ width: 24, height: 24 }} />
  ) : undefined;

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <Text
          fontSize="sm"
          fontWeight="medium"
          mb={2}
          color={{ base: 'gray.900', _dark: 'white' }}
        >
          {label}
        </Text>
      )}
      <InputGroup endElement={endElement}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            placeholder || `Enter amount in ${CURRENCY_META[mode].symbol}`
          }
          inputMode="decimal"
          autoComplete="off"
          maxLength={24}
          color={{ base: 'gray.900', _dark: 'white' }}
          _placeholder={{ color: { base: 'gray.500', _dark: 'gray.400' } }}
          style={isInvalid ? { borderColor: 'red' } : {}}
          border="1px solid"
          borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
          borderRadius="md"
        />
      </InputGroup>
    </div>
  );
};

export default CurrencyInput;
