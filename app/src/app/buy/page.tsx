"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { BuyTokenData, buyTokenSchema, useBuyToken } from "@/lib/worldcoin/use-buy-token";
import { useTokens } from "@/lib/worldcoin/use-tokens";

export default function BuyPage() {
  const searchParams = useSearchParams();
  const tokenAddress = searchParams.get("token");

  const form = useForm<BuyTokenData>({
    resolver: zodResolver(buyTokenSchema),
    defaultValues: {
      tokenAddress: tokenAddress ?? "",
      amount: 1,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { data: tokens } = useTokens();
  const { mutate: buyToken, isPending } = useBuyToken();

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
    buyToken(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button size={"icon"} variant={"secondary"} className="rounded-full">
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="font-heading text-3xl font-bold">Buy</h1>
        </div>

        <FormField
          control={form.control}
          name="tokenAddress"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label>Token</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tokens?.map((token) => (
                    <SelectItem key={token.tokenAddress} value={token.tokenAddress}>
                      {token.name} ({token.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-1">
          <Label>Amount</Label>
          <Input type="text" inputMode="numeric" pattern="[0-9]*" {...register("amount")} />
          {errors?.amount && (
            <p className="px-1 text-xs text-destructive">{errors.amount.message}</p>
          )}
        </div>

        <div
          className="mt-auto"
          // className="container absolute bottom-10 left-0 flex"
        >
          <Button className="h-16 w-full text-xl tracking-wide" type="submit" disabled={isPending}>
            {isPending && <Spinner />}
            Buy
          </Button>
        </div>
      </form>
    </Form>
  );
}