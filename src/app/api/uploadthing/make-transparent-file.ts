import "./polyfill";
import { blob } from "node:stream/consumers";
import { Readable } from "stream";
import { DANGEROUS__uploadFiles } from "uploadthing/client";

export const uploadTransparent = async (url: string) => {
  // if (!process.env.REMOVEBG_KEY) throw new Error("No removebg key");

  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_url", url);

  // const { body } = await fetch("https://api.remove.bg/v1.0/removebg", {
  //   method: "POST",
  //   body: formData,
  //   headers: {
  //     "X-Api-Key": process.env.REMOVEBG_KEY,
  //   },
  //   next: {
  //     revalidate: 0,
  //   },
  // });

  // Use this in dev when debugging

  const { body } = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });

  const r = Readable.fromWeb(body as any);

  console.log("body?", body);

  const fileBlob = await blob(r);
  const f = new File([fileBlob as any], "transparent.png", {
    type: "image/png",
  });

  const baseUrl = process.env.VERCEL_URL ?? "http://localhost:3000";
  const uploadedFiles = await DANGEROUS__uploadFiles(
    [f],
    "transparentUploader",
    { url: baseUrl + "/api/uploadthing" }
  );
  return uploadedFiles[0];
};
