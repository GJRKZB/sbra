import { NextUIProvider } from "@nextui-org/react";

export default async function page() {
  return (
    <div>
      <NextUIProvider>
        <div>Main</div>
      </NextUIProvider>
    </div>
  );
}
