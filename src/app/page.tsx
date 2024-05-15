import { NextUIProvider } from "@nextui-org/react";

export default function page() {
  return (
    <div>
      <NextUIProvider>
        <div>page</div>
      </NextUIProvider>
    </div>
  );
}
