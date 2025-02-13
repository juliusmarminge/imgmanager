import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import ImageUploadButton from "./_components/upload-button";
import { getImagesForUser } from "@/db/queries";
import { MagicImageRender } from "./_components/magic-image";

async function Images() {
  const data = await getImagesForUser();
  if (data.length === 0)
    return <div className="text-2xl">Upload something</div>;

  return (
    <div className="grid w-full grid-cols-fluid justify-items-center">
      {data.map((rn) => (
        <div key={rn.id} className="flex justify-between">
          <MagicImageRender image={rn} />
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <ImageUploadButton />
        <Images />
      </SignedIn>
    </div>
  );
}
