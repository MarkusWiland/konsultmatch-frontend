"use server";


import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/utils/error";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function login(_prevState: any, formData: FormData) {
  const res = await fetch(`http://localhost:3001/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }

  setAuthCoockie(parsedRes);
  redirect("/");
}

const setAuthCoockie = (response: Response) => {
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
        const token = setCookieHeader.split(";")[0].split("=")[1];
        cookies().set({
            name: "Authentication",
            value: token,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(token).exp! * 1000),
        });
    }
    console.log(response.headers.get("set-cookie"));
    
}