"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function ProjectId(): JSX.Element {
  const searchParams = useSearchParams();

  return (
    <>
      <h1>Project ID page: {searchParams.get("name")}</h1>
      <Link href='/'>Voltar</Link>
    </>
  );
}
