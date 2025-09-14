"use client";
import React from "react";
import {
  BellIcon,
  BriefcaseIcon,
  Home,
  Package,
  PanelLeft,
  Settings,
  ShoppingCartIcon,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface NavItemProps {
  href: string;
  label: string;
  children: React.ReactNode;
  showBadge?: boolean;
}

const NavItems: Omit<NavItemProps, "showBadge">[] = [
  {
    href: "/",
    label: "Home",
    children: <Home className="h-5 w-5" />,
  },
  {
    href: "/comparison",
    label: "Comparison",
    children: <BriefcaseIcon className="h-5 w-5" />,
  },
  {
    href: "/dashboard/products",
    label: "Products",
    children: <Package className="h-5 w-5" />,
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    children: <ShoppingCartIcon className="h-5 w-5" />,
  },
  {
    href: "/dashboard/organization",
    label: "Organization",
    children: <Users className="h-5 w-5" />,
  },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    children: <BellIcon className="h-5 w-5" />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    children: <Settings className="h-5 w-5" />,
  },
];

export const MobileNav: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <nav className="grid gap-6 text-lg font-medium">
          {NavItems.map((item) => (
            <div onClick={() => setOpen(false)} key={item.href}>
              <NavItemMobile href={item.href} label={item.label}>
                {item.children}
              </NavItemMobile>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const NavItemMobile: React.FC<NavItemProps> = ({
  href,
  label,
  children,
  showBadge,
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx("flex items-center gap-4 px-2.5 relative", {
        "text-muted-foreground hover:text-foreground":
          href === "/dashboard"
            ? pathname !== href
            : !pathname.startsWith(href),
        "text-foreground":
          href === "/dashboard" ? pathname === href : pathname.startsWith(href),
      })}
    >
      <div className="relative flex items-center">
        {children}
        {showBadge && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
            {/* number will be injected where used */}
          </span>
        )}
      </div>
      <span>{label}</span>
    </Link>
  );
};

export const DesktopNav: React.FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 xl:w-40 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {NavItems.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label}>
            {item.children}
          </NavItem>
        ))}
      </nav>
    </aside>
  );
};

const NavItem: React.FC<
  NavItemProps & { showBadge?: boolean; pendingCount?: number }
> = ({ href, label, children, showBadge, pendingCount }) => {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 xl:w-32 xl:justify-start xl:pl-2 space-x-2 relative",
            {
              "bg-accent text-black":
                href === "/dashboard"
                  ? pathname === href
                  : pathname.startsWith(href),
            }
          )}
        >
          <div className="relative">
            {children}
            {showBadge && pendingCount !== undefined && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {pendingCount}
              </span>
            )}
          </div>
          <span className="sr-only">{label}</span>
          <span className="hidden xl:block">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
};
