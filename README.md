# savvy-cache

```typescript
import savvy from 'savvy-cache';

const doSomething = () => 'did something';
const secondsUntilRefresh = 60;

const cache = savvy(doSomething, secondsUntilRefresh);

async function run() {
    const value = await cache.get();
    console.log(`Whoo savvy-cache ${value}!`);
}

```