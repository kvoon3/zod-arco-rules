<template>
  <div mxa mt4 rounded container space-y-4>
    <header my10 block text-center text-2xl font-semibold font-mono>
      Zod Arco Rules Playground
    </header>
    <TheNav mxa w-150 />
    <main mxa w-150 border rounded p10>
      <RouterView />
    </main>
  </div>
</template>
