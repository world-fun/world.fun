import Link from "next/link";

import { TokenAvatar } from "@/components/token-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Token } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  token: Token & { price: string };
  className?: string;
  isMostPopular?: boolean;
}

export function TokenCard({ token, className, isMostPopular }: TokenCardProps) {
  return (
    <Link href={`/token?token=${token.tokenAddress}`}>
      <Card
        style={{
          background: isMostPopular
            ? "linear-gradient(in hsl longer hue 45deg, rgb(255 0 0 / 0.2) 0 0)"
            : undefined,
        }}
        className={cn(
          "rounded-lg border-0 bg-background p-3 text-card-foreground shadow-none hover:bg-secondary",
          className,
        )}
      >
        <CardContent className="flex justify-between gap-4 p-0">
          <div className="flex items-center gap-4">
            <TokenAvatar token={token} />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold leading-none tracking-tight">{token.name}</h3>
              <p className="text-balance text-lg font-semibold leading-none text-muted-foreground">
                {token.symbol}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold leading-none tracking-tight">
              $<span>{token.price}</span>
            </div>
            <Button size="sm" className="hidden">
              Buy
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
