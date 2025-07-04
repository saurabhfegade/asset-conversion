import React from 'react';
import { Text } from '@chakra-ui/react';

interface ConversionResultProps {
  result: string;
  error?: string | null;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  result,
  error,
}) => {
  return error ? (
    <Text color="red.500" fontSize="md" role="alert" textAlign="center">
      {error}
    </Text>
  ) : result ? (
    <Text color="green.600" fontWeight="bold" fontSize="lg" textAlign="center">
      {result}
    </Text>
  ) : null;
};

export default ConversionResult;
