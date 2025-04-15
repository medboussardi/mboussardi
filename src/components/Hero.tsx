
import ProfileImage from "@/components/hero/ProfileImage";
import HeroContent from "@/components/hero/HeroContent";

export default function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-20 overflow-hidden" id="hero">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <ProfileImage />
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
