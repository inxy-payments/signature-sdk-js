# @inxy/signature-sdk-js

A JavaScript package for creating digital signatures using RSA encryption and PEM encoding.

## Installation

You can install `@inxy/signature-sdk-js` via npm or yarn:

```bash
npm install @inxy/signature-sdk-js
```

```bash
yarn add @inxy/signature-sdk-js
```

## Usage

To use `@inxy/signature-sdk-js`, follow these steps:

1. Import the package:

```javascript
import { createSignature } from "@inxy/signature-sdk-js";
```

2. Call the `createSignature` function with the appropriate parameters:

```javascript
const data = "Your data to be signed";
const privateKeyString = "Your private key in PEM format";
const dateNow = new Date(); // Current date and time

try {
  const result = createSignature(data, privateKeyString, dateNow);
  console.log("Signature:", result.signature);
  console.log("Timestamp:", result.timestamp);
} catch (error) {
  console.error("Error:", error.message);
}
```

### Parameters:

- `data`: A non-empty string representing the data to be signed.
- `privateKeyString`: A non-empty string containing the private key in PEM format.
- `dateNow`: A valid `Date` object representing the current date and time.

### Returns:

An object containing the following properties:

- `signature`: The generated signature encoded in Base64 format.
- `timestamp`: The timestamp of when the signature was created (in seconds).

### Example:

```javascript
const data = "Hello, world!";
const privateKeyString = "-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----";
const dateNow = new Date();

try {
  const result = createSignature(data, privateKeyString, dateNow);
  console.log("Signature:", result.signature);
  console.log("Timestamp:", result.timestamp);
} catch (error) {
  console.error("Error:", error.message);
}
```
