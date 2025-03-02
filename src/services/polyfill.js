/**
 * Polyfills for Mistral API compatibility with React Native
 * 
 * Mistral requires several web APIs that are not natively available in React Native:
 * - ReadableStream for streaming responses
 * - URL and URLSearchParams for API endpoints
 * - TextEncoder/TextDecoder for handling different encodings
 * - fetch with all required features
 */

// Basic polyfills for Mistral API
import 'react-native-polyfill-globals/auto';
import 'react-native-url-polyfill/auto';

// Ensure TextEncoder and TextDecoder are available
import { TextEncoder, TextDecoder } from 'text-encoding';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Ensure the ReadableStream API is properly polyfilled
if (typeof global.ReadableStream === 'undefined') {
  console.warn('ReadableStream is not defined, streaming may not work correctly');
}

// Log polyfill status to help with debugging
console.log('Polyfills initialized:', {
  hasReadableStream: typeof global.ReadableStream !== 'undefined',
  hasTextEncoder: typeof global.TextEncoder !== 'undefined',
  hasTextDecoder: typeof global.TextDecoder !== 'undefined',
  hasURL: typeof global.URL !== 'undefined',
  hasURLSearchParams: typeof global.URLSearchParams !== 'undefined'
}); 