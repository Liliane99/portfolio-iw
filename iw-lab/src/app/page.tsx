import Image from "next/image";
import Nav from "@/components/navbar";
import iw from "../../public/iw.jpg";

export default function Home() {
  return (
    <div>
      <Nav />
      <Image
        src={iw}
        alt="IW Lab"
        width={1500}
        height={600}
        priority 
      />
    </div>
  );
}
