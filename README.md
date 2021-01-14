# savvy-cache

## Keyless mode

```typescript
import savvy from "savvy-cache";

// doSomething function does not require a key
const doSomething = () => "did something";

// secondsUntilRefresh will refresh cache between calls to cache.get
const secondsUntilRefresh = 60;

const cache = savvy(doSomething, secondsUntilRefresh);

async function run() {
  const value = await cache.get();
  console.log(`Whoo savvy-cache ${value}!`);
}
```

## Key mode

```typescript
import savvy from "savvy-cache";

// doSomething example with a key
const doSomething = (key) => `did something with ${key}`;

// when secondsUntilRefresh is not provided, cache will never be refreshed
const cache = savvy(doSomething);

async function run() {
  const value = await cache.get("id");
  console.log(`Whoo savvy-cache ${value}!`);
}
```
