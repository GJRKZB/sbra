import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useAuth } from "@/app/hooks/useAuth";
import { logout } from "@/app/service/authService";

export default function NavbarComponent() {
  const { isAuthenticated } = useAuth();
  return (
    <Navbar shouldHideOnScroll maxWidth="full">
      <NavbarItem>
        <Link href="/" className="text-base font-mono text-black">
          Homepage
        </Link>
      </NavbarItem>
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem className="lg:flex">
              <Button
                as={Link}
                color="default"
                radius="full"
                href="/"
                className="text-base text-white font-mono bg-black"
                onClick={() => logout()}
              >
                Uitloggen
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="lg:flex">
              <Link
                href="/auth/login"
                className="text-base font-mono text-black"
              >
                Inloggen
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="default"
                radius="full"
                href="/auth/register"
                className="text-base text-white font-mono bg-black"
              >
                Registreer
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
